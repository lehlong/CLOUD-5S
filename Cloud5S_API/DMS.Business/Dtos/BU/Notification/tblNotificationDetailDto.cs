
using AutoMapper;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class tblNotificationDetailDto : SoftDeleteEntity, IMapFrom
    {
        [Key]
        public int Id { get; set; }

        public int NotificationId { get; set; }

        public string ReceiverName { get; set; }

        public bool? IsSeen { get; set; }

        public bool? IsSent { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public tblNotificationDto Notification { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotificationDetail, tblNotificationDetailDto>().ReverseMap();
        }
    }
}
