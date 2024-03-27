using AutoMapper.Extensions.ExpressionMapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DMS.CORE;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Services.AD;
using RabbitMQ.Client;
using System.Reflection;
using DMS.BUSINESS.Services.BU.Notìication;
using DMS.BUSINESS.Common.AppCode.Logger;

namespace DMS.BUSINESS
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(cfg => { cfg.AddExpressionMapping(); }, typeof(MappingProfile).Assembly);
            // Add Entity Framework
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Connection")));

            //Add all service
            var allProviderTypes = Assembly.GetAssembly(typeof(IAccountService))
             .GetTypes().Where(t => t.Namespace != null).ToList();
            foreach (var intfc in allProviderTypes.Where(t => t.IsInterface))
            {
                var impl = allProviderTypes.FirstOrDefault(c => c.IsClass && !c.IsAbstract && intfc.Name.Substring(1) == c.Name);
                if (impl != null) services.AddScoped(intfc, impl);
            }

            //Notification config
            services.AddSingleton<IConnection>(sp =>
            {
                try
                {
                    var factory = new ConnectionFactory()
                    {
                        HostName = configuration["RabbitMQ:HostName"],
                        UserName = configuration["RabbitMQ:UserName"],
                        Password = configuration["RabbitMQ:Password"],
                        Port = Convert.ToInt32(configuration["RabbitMQ:Port"])
                    };
                    var result = factory.CreateConnection();
                    return result;
                }
                catch (Exception ex)
                {
                    LoggerService.LogError(ex.Message);
                    LoggerService.LogError(ex.StackTrace);
                    return null;
                }
            });
            services.AddHostedService<NotificationListener>();
            return services;
        }
    }
}
