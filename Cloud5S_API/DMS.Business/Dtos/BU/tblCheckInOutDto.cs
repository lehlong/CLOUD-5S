using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCheckInOutDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string VehicleCode { get; set; }

        public DateTime CheckInTime { get; set; }

        public DateTime? CheckOutTime { get; set; }

        public string RfId { get; set; }

        public Guid? ReferenceId { get; set; }

        public string OrderCode { get; set; }

        public tblOrderDto Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOut, tblCheckInOutDto>().ReverseMap();
        }
    }

    public class tblCheckInOutCreateDto : IMapFrom, IDto
    {
        public DateTime? CheckTime { get; set; }

        public string RfId { get; set; }

        public List<FileRequestDto> Files { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOut, tblCheckInOutCreateDto>().ReverseMap();
        }
    }

    public class tblCheckInOutCreateVehicleDto : IMapFrom
    {
        public DateTime? CheckTime { get; set; }

        public string RfId { get; set; }

        public string VehicleCode { get; set; }

        public List<FileRequestDto> Files { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOut, tblCheckInOutCreateDto>().ReverseMap();
        }
    }
}
