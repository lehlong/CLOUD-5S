using AutoMapper;
using DMS.BUSINESS.Common.AppCode.Logger;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public class NotificationManager
    {
        public bool IsConnected = false;
        private string AppId;
        private IModel _channel;
        private AppDbContext _dbContext;
        private IMapper _mapper;
        private string ClientCode;
        public NotificationManager(IConnection connection, AppDbContext dbContext, IMapper mapper, IConfiguration configuration)
        {
            try
            {
                _channel = connection.CreateModel();
                _dbContext = dbContext;
                _mapper = mapper;
                AppId = configuration.GetSection("OneSignal:AppId").Value ?? string.Empty;
                ClientCode = configuration.GetSection("RabbitMQ:ClientCode").Value ?? string.Empty;
                IsConnected = true;
            }
            catch (Exception)
            {
                IsConnected = false;
            }
        }

        /// <summary>
        /// Bắt buộc sử dụng trong transaction
        /// </summary>
        /// <param name="sendDto"></param>
        /// <param name="Receiver"></param>
        /// <param name="notificationType"></param>
        /// <returns></returns>
        public async Task SendBySystem(SendNotificationInputDto sendDto, string SenderName, tblAccountDto Receiver, NotificationType notificationType)
        {
            string templateCode = notificationType.ToString();

            var template = await GetTemplate(templateCode);
            if (template == null) return;

            var SendNotificationObj = new NotificationDto(template, sendDto);

            if (SendNotificationObj == null)
            {
                return;
            }
            try
            {
                var notificationObj = new tblNotificationCreateDto()
                {
                    Contents = SendNotificationObj.Content ?? string.Empty,
                    Subtitle = SendNotificationObj.SubTitle ?? string.Empty,
                    Details = new List<tblNotificationDetailCreateDto>() { new tblNotificationDetailCreateDto() {
                        ReceiverName = Receiver.UserName,
                    } }
                };

                var pushNotificationIdReturns = await AddPushNotification(notificationObj, SenderName, template.Headings);

                _channel.QueueDeclare(queue: "notification_queue",
                                     durable: true,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                foreach (var item in pushNotificationIdReturns)
                {
                    SendNotificationObj.Data.NotificationData.Id = item;
                    SendNotificationObj.Data.NotificationData.Type = (int)notificationType;

                    var notification = new NotificationMessage()
                    {
                        Notification = new NotificationOneSignalDto
                        {
                            app_id = AppId,
                            headings = new Dictionary<string, string>() { { "en", SendNotificationObj.Headings } },
                            subtitle = new Dictionary<string, string>() { { "en", SendNotificationObj.SubTitle ?? string.Empty } },
                            contents = new Dictionary<string, string>() { { "en", SendNotificationObj.Content ?? string.Empty } },
                            data = SendNotificationObj.Data
                        },
                        PushNotificationId = item,
                        UserNames = new() { Receiver.UserName },
                        ClientCode = ClientCode
                    };

                    string message = JsonConvert.SerializeObject(notification);
                    var body = Encoding.UTF8.GetBytes(message);

                    var properties = _channel.CreateBasicProperties();
                    properties.Persistent = true;

                    var exchange = Guid.NewGuid().ToString();
                    _channel.ExchangeDeclare(exchange, ExchangeType.Direct);
                    _channel.QueueBind("notification_queue", exchange, "notification_queue");

                    _channel.BasicPublish(exchange: exchange,
                                         routingKey: "notification_queue",
                                         basicProperties: properties,
                                         body: body);

                    LoggerService.LogInfo("Sent notification to sever: " + message);
                }
            }
            catch (Exception)
            {
                return;
            }
        }

        public void SendByUser(tblNotificationDto model)
        {
            try
            {
                _channel.QueueDeclare(queue: "notification_queue",
                                    durable: true,
                                    exclusive: false,
                                    autoDelete: false,
                                    arguments: null);

                model.Contents = Utils.ConvertToPlainText(model.Contents);

                if (model.Contents.Length > 150)
                    model.Contents = model.Contents[..150];

                foreach (var item in model.Details)
                {
                    var notification = new NotificationMessage()
                    {
                        Notification = new NotificationOneSignalDto
                        {
                            app_id = AppId,
                            headings = new Dictionary<string, string>() { { "en", model.Headings } },
                            subtitle = new Dictionary<string, string>() { { "en", model.Subtitle ?? string.Empty } },
                            contents = new Dictionary<string, string>() { { "en", model.Contents ?? string.Empty } },
                            data = new NotificationDataDto()
                            {
                                NotificationData = new tblNotificationSearchDto()
                                {
                                    Contents = item.Notification.Contents,
                                    Subtitle = item.Notification.Subtitle,
                                    Headings = item.Notification.Headings,
                                    CreateBy = item.Notification.CreateBy,
                                    CreateDate = item.Notification.CreateDate,
                                    Id = item.Id,
                                    IsDeleted = item.Notification.IsDeleted,
                                    Type = item.Notification.Type,
                                    UpdateBy = item.Notification.UpdateBy,
                                    UpdateDate = item.Notification.UpdateDate,
                                    Url = item.Notification.Url,
                                    IsSeen = item.IsSeen,
                                    IsSent = item.IsSent,
                                }
                            }
                        },
                        PushNotificationId = item.Id,
                        UserNames = new() { item.ReceiverName },
                        ClientCode = ClientCode
                    };

                    string message = JsonConvert.SerializeObject(notification);
                    var body = Encoding.UTF8.GetBytes(message);

                    var properties = _channel.CreateBasicProperties();
                    properties.Persistent = true;

                    var exchange = Guid.NewGuid().ToString();
                    _channel.ExchangeDeclare(exchange, ExchangeType.Direct);
                    _channel.QueueBind("notification_queue", exchange, "notification_queue");

                    _channel.BasicPublish(exchange: exchange,
                                         routingKey: "notification_queue",
                                         basicProperties: properties,
                                         body: body);
                }
            }
            catch (Exception ex)
            {
                LoggerService.LogError(ex.Message);
                LoggerService.LogError(ex.StackTrace);
            }
        }

        public async Task<NotificationDto> GetTemplate(string templateCode)
        {
            var data = await _dbContext.tblMdNotificationTemplate.FirstOrDefaultAsync(x => x.TemplateCode == templateCode);
            if (data == null) return null;

            return new NotificationDto(data.Title ?? string.Empty, data.SubTitle ?? string.Empty, data.Message ?? string.Empty);
        }

        private async Task<List<int>> AddPushNotification(tblNotificationCreateDto model, string SenderName, string Headings)
        {
            var obj = _mapper.Map<tblBuNotification>(model);
            obj.SenderName = SenderName;
            obj.Headings = Headings;
            await _dbContext.AddAsync(obj);
            await _dbContext.SaveChangesAsync();
            return obj.Details.Select(x => x.Id).ToList();
        }
    }
}
