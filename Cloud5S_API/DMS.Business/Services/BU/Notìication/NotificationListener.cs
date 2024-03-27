using DMS.BUSINESS.Common.AppCode.Logger;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.CORE;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NLog;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public class NotificationListener : BackgroundService
    {
        private readonly IModel _channel;
        private readonly IConfiguration _configuration;
        private static Logger _logger = LogManager.GetLogger("NotificationListener");
        private bool IsConnected;
        private string ClientCode;

        public NotificationListener(IConnection connection, IConfiguration config)
        {
            try
            {
                if (connection != null)
                {
                    _channel = connection.CreateModel();
                    _configuration = config;
                    IsConnected = true;
                    ClientCode = config.GetSection("RabbitMQ:ClientCode")?.Value ?? string.Empty;
                }
                else
                {
                    IsConnected = false;
                }
            }
            catch (Exception ex)
            {
                IsConnected = false;
                _logger.Error(ex.Message);
                _logger.Error(ex.StackTrace);
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (IsConnected)
            {
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += async (model, ea) =>
                {
                    try
                    {
                        var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                        _logger.Info("Đã nhận message: {0}", message);

                        // Xử lý message
                        var notification = JsonConvert.DeserializeObject<NotificationDirectDto>(message);

                        if (notification == null)
                        {
                            _logger.Info("Message không có dữ liệu", message);
                            _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                            return;
                        }

                        using var context = new AppDbContext(GetContextOption(), null);
                        var currentMessage = await context.tblBuNotificationDetail.FirstOrDefaultAsync(x => x.Id == notification.PushNotificationId);
                        if (currentMessage == null)
                        {
                            _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                            return;
                        }
                        currentMessage.IsSent = true;
                        context.Entry(currentMessage).State = EntityState.Modified;
                        await context.SaveChangesAsync();

                        _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                        _logger.Info("Đã xử lý và lưu kết quả cho message: {0}", message);
                    }
                    catch (Exception ex)
                    {
                        LoggerService.LogError(ex.Message);
                        LoggerService.LogError(ex.StackTrace);
                        _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                        return;
                    }
                };
                _channel.QueueDeclare(queue: $"notification_queue_{ClientCode}",
                                 durable: true,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

                _channel.BasicConsume(queue: $"notification_queue_{ClientCode}", autoAck: false, consumer: consumer);
                await Task.CompletedTask;
            }
        }

        private DbContextOptions<AppDbContext> GetContextOption()
        {
            var connectionString = _configuration.GetConnectionString("Connection");
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(connectionString)
                .Options;
            return options;
        }
    }

}
