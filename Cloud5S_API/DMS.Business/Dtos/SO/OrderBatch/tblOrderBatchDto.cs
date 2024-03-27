using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using DocumentFormat.OpenXml.Wordprocessing;

namespace DMS.BUSINESS.Dtos.SO.OrderBatch
{
    public class tblOrderBatchDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string PartnerCode { get; set; }

        public string PurchasingMethod { get; set; }

        public string Type { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string ShipCode { get; set; }

        public double ExpectNumber { get; set; }

        public double ReleaseNumber { get; set; }

        public double CompleteNumber { get; set; }

        public int DeliveryNumber { get; set; }

        public int CompleteDeliveryNumber { get; set; }

        public string CustomsDeclaration { get; set; } //To khai hai quan

        public string State { get; set; }

        public string Note { get; set; }

        public int DeliveringNumber { get; set; }

        public int TotalVehicle { get => Vehicles.Select(x => x.VehicleCode).Distinct().Count(); }

        public Guid? ReferenceId { get; set; }

        public DateTime? CreateDate { get; set; }

        public virtual CreatorDto Creator { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual List<tblOrderBatchDetailDto> OrderBatchDetails { get; set; }

        public virtual List<tblOrderBatchVehicleDto> Vehicles { get; set; }

        public virtual List<tblOrderDto> Orders { get; set; }

        public tblShipDto Ship { get; set; }

        public virtual List<tblOrderBatchProcessDto> Processes { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatch, tblOrderBatchDto>().ReverseMap();
        }
    }

    public class tblOrderBatchCreateDto : IMapFrom, IDto
    {
        public string PartnerCode { get; set; }

        public string CompanyCode { get; set; }

        public string PurchasingMethod { get; set; }

        public string Type { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string ShipCode { get; set; }

        public double ExpectNumber { get; set; }

        public string CustomsDeclaration { get; set; } //To khai hai quan

        public string Note { get; set; }

        public virtual List<tblOrderBatchDetailCreateDto> OrderBatchDetails { get; set; }

        public virtual List<tblOrderBatchVehicleCreateDto> Vehicles { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatch, tblOrderBatchCreateDto>().ReverseMap();
        }
    }

    public class tblOrderBatchUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string PartnerCode { get; set; }

        public string CompanyCode { get; set; }

        public string PurchasingMethod { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string ShipCode { get; set; }

        public double ExpectNumber { get; set; }

        public string CustomsDeclaration { get; set; } //To khai hai quan

        public string Note { get; set; }

        public virtual List<tblOrderBatchDetailUpdateDto> OrderBatchDetails { get; set; }

        public virtual List<tblOrderBatchVehicleCreateDto> Vehicles { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblOrderBatchUpdateDto, tblSoOrderBatch>()
                .ForMember(x => x.OrderBatchDetails, y => y.Ignore())
                .ForMember(x => x.Vehicles, y => y.Ignore());
        }
    }

    public class tblOrderBatchLiteDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string PartnerCode { get; set; }

        public string PurchasingMethod { get; set; }

        public string Type { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string ShipCode { get; set; }

        public double ExpectNumber { get; set; }

        public double ReleaseNumber { get; set; }

        public double CompleteNumber { get; set; }

        public int DeliveryNumber { get; set; }

        public int CompleteDeliveryNumber { get; set; }

        public string CustomsDeclaration { get; set; } //To khai hai quan

        public string State { get; set; }

        public string Note { get; set; }

        public int DeliveringNumber { get; set; }

        public int TotalVehicle { get => Vehicles.Select(x => x.VehicleCode).Distinct().Count(); }

        public DateTime? CreateDate { get; set; }

        public virtual CreatorDto Creator { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual List<tblOrderBatchDetailDto> OrderBatchDetails { get; set; }

        public virtual List<tblOrderBatchVehicleDto> Vehicles { get; set; }

        public tblShipDto Ship { get; set; }

        public virtual List<tblOrderBatchProcessDto> Processes { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatch, tblOrderBatchLiteDto>().ReverseMap();
        }
    }

    public class ExportExcelOrderBatchDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Mã đợt")]
        public string Code { get; set; }

        [Description("Từ ngày")]
        public string StartDate { get; set; }

        [Description("Đến ngày")]
        public string EndDate { get; set; }

        [Description("Hàng hóa")]
        public string ItemName { get; set; }

        [Description("Tàu xuất hàng")]
        public string ShipCode { get; set; }

        [Description("Số lượng phương tiện")]
        public int TotalVehicle { get; set; }

        [Description("Khối lượng dự kiến")]
        public double ExpectNumber { get; set; }

        [Description("Khối lượng đã xuất")]
        public double ReleaseNumber { get; set; }

        [Description("Số chuyến đã xuất")]
        public double DeliveryNumber { get; set; }

        [Description("Đơn vị tính")]
        public string UnitName { get; set; }

        [Description("Trạng thái")]
        public string State { get; set; }
    }

}
