using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.CORE.Entities.BU;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class tblTrackingDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderReleaseCode { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public double? Heading { get; set; }

        public double? Speed { get; set; }

        public DateTime TimeStamp { get; set; }

        public DateTime SentTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuTracking, tblTrackingDto>().ReverseMap();
        }
    }

    public class LocationStationDto
    {
        [JsonIgnore]
        public int Ordinal { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public string Address { get; set; }

        public int GeofenceRadius { get => 30; }
    }
}
