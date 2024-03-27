
using AutoMapper;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class tblNotificationDto : SoftDeleteBaseDto, IMapFrom
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã")]
        public int Id { get; set; }

        [Description("Ngày thông báo")]
        public string CreateTime { get => base.CreateDate.ToString(); }

        public string SenderName { get; set; }

        public string Headings { get; set; }

        [Description("Tiêu đề")]
        public string Subtitle { get; set; }

        public string Contents { get; set; }

        public string Url { get; set; }

        public int? Type { get; set; }

        public int SentSuccess { get; set; }

        public int SentFail { get; set; }

        [Description("Gửi đến")]
        public int TotalSent { get => Seen + NotSeen; }

        [Description("Đã đọc")]
        public int Seen { get; set; }

        [Description("Chưa đọc")]
        public int NotSeen { get; set; }

        public List<tblNotificationDetailDto> Details { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotification, tblNotificationDto>().ReverseMap();
        }
    }

    public class NotificationQuantity
    {
        public int Seen { get; set; }
        public int UnSeen { get; set; }
    }
}
