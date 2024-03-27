
using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class tblNotificationCreateDto : IMapFrom,IDto
    {
        public string Subtitle { get; set; }

        public string Contents { get; set; }

        public string Url { get; set; }

        public virtual List<tblNotificationDetailCreateDto> Details { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotification, tblNotificationCreateDto>().ReverseMap();
        }
    }

    public class tblNotificationDetailCreateDto : IMapFrom
    {
        public string ReceiverName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotificationDetail, tblNotificationDetailCreateDto>().ReverseMap();
        }
    }
}
