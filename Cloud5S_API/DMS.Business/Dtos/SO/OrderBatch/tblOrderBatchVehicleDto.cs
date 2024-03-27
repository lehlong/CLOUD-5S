using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderBatch
{
    public class tblOrderBatchVehicleDto : BaseDto, IMapFrom,IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderBatchCode { get; set; }

        public string VehicleCode { get; set; }

        public int DeliveryNumber { get; set; }

        public virtual tblOrderBatchDto OrderBatch { get; set; }

        public virtual tblVehicleDto Vehicle { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchVehicle, tblOrderBatchVehicleDto>().ReverseMap();
        }
    }

    public class tblOrderBatchVehicleCreateDto : IMapFrom, IDto
    {
        public string VehicleCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchVehicle, tblOrderBatchVehicleCreateDto>().ReverseMap();
        }
    }
}
