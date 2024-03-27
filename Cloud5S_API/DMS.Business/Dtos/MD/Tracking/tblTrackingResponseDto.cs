using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.CORE.Entities.BU;
using DMS.BUSINESS.Dtos.SO.Order;

namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class tblTrackingResponseDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public DateTime SentTime { get; set; }

        public List<TrackingData> TrackingDatas { get; set; }

        public virtual tblOrderDto Order { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuTracking, tblTrackingDto>().ReverseMap();
        }
    }
}
