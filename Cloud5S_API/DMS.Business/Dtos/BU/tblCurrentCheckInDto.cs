using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCurrentCheckInDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string VehicleCode { get; set; }

        public DateTime CheckInTime { get; set; }

        public string CheckInConfirm { get; set; }

        public string CheckInNote { get; set; }

        public byte[] Image { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCurrentCheckIn, tblCurrentCheckInDto>().ReverseMap();
        }
    }
}
