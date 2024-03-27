using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblTrackingLogDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public string DriverUserName { get; set; }

        public string OrderCode { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string Reason { get; set; }

        public DateTime? LogTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuTrackingLog, tblTrackingLogDto>().ReverseMap();
        }
    }

    public class tblTrackingLogCreateDto : IMapFrom, IDto
    {
        public string DriverUserName { get; set; }

        public string OrderCode { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string Reason { get; set; }

        public DateTime? LogTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuTrackingLog, tblTrackingLogCreateDto>().ReverseMap();
        }
    }
}
