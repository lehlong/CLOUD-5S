using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.MD.Tracking;
using DMS.BUSINESS.Dtos.SO.OrderBatch;
using DMS.BUSINESS.Dtos.SO.OrderDetail;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public string PartnerCode { get; set; }

        public string OrderBatchCode { get; set; }

        public string PurchasingMethod { get; set; }

        public DateTime? OrderDate { get; set; }

        public string Type { get; set; }

        public string AreaCode { get; set; }

        public bool? IsPaid { get; set; }

        public string CompanyCode { get; set; }

        public string VehicleCode { get; set; }

        public string DriverName { get; set; }

        public string Note { get; set; }

        public string CreateBy { get; set; }

        public string UpdateBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string ScaleCode { get; set; }

        public string WorkingShiftCode { get; set; }

        public int? CargoCompartmentNumber { get; set; }

        public DateTime? GetOffTime { get; set; }

        public virtual tblWorkingShiftDto WorkingShift { get; set; }

        public virtual CreatorDto Creator { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual tblOrderBatchLiteDto OrderBatch { get; set; }

        public virtual tblCompanyDto Company { get; set; }

        public virtual tblVehicleDto Vehicle { get; set; }

        public virtual tblAreaDto Area { get; set; }

        public virtual List<tblOrderDetailDto> OrderDetails { get; set; }

        public virtual List<tblOrderProcessDto> OrderProcesses { get; set; }

        public virtual tblOrderScaleLiteDto Scale { get; set; }

        public virtual tblShipDto Ship { get; set; }

        public virtual tblBerthDto Berth { get; set; }

        public virtual tblMoistureLiteDto Moisture { get; set; }

        public virtual List<tblManufactureDto> Manufactures { get; set; }

        public virtual LocationStationDto StartLocation
        {
            get => new LocationStationDto()
            {
                Address = Partner?.Address,
                Code = Partner?.Code,
                Latitude = Partner?.Latitude,
                Longitude = Partner?.Longitude,
                Name = Partner?.Name,
            };
        }

        public virtual LocationStationDto EndLocation { get; set; }

        public string LatchState { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderDto>().ReverseMap();
        }
    }

    public class tblOrderUpdateStateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderUpdateStateDto>().ReverseMap();
        }
    }

    public class tblOrderUpdateBerthDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string BerthCode { get; set; }

        public string ShipCode { get; set; }

        public int? CargoCompartmentNumber { get; set; }

        public string State { get; private set; } = OrderState.DO_HANG.ToString();

        public DateTime? GetOffTime { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderUpdateBerthDto>().ReverseMap();
        }
    }

    public class tblOrderCheckOutDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; private set; } = OrderState.RA_CONG.ToString();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderCheckOutDto>().ReverseMap();
        }
    }

    public class tblOrderTrackingOffDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; private set; } = OrderState.DEN_CANG.ToString();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderTrackingOffDto>().ReverseMap();
        }
    }

    public class tblOrderTrackingDto : IMapFrom, IDto
    {
        public string Code { get; set; }
        public string VehicleCode { get; set; }
        public double Weight { get; set; }
        public string State { get; set; }

        public bool HaveTrackingData { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderTrackingDto>().ReverseMap();
        }
    }
}
