using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.BU;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblManufactureDto : BaseDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ProcessType { get; set; }

        public string PickUpMethod { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? Amount { get; set; }

        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public string AreaCode { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        public virtual tblPourLineDto PourLine { get; set; }

        public virtual tblPourSectionDto PourSection { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblAreaDto Area { get; set; }

        public string ProcessWorkingShiftCode { get; set; }

        [JsonIgnore]
        public virtual tblOrderDto Order { get; set; }

        public virtual tblWorkingShiftDto ProcessWorkingShift { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureDto>().ReverseMap();
        }
    }

    public class tblManufactureShiftDto
    {
        public DateTime? ProcessDate { get; set; }

        public virtual tblWorkingShiftDto WorkingShift { get; set; }

        public double? OrderNumber { get; set; }

        public int OrderQuantity { get; set; }

        public double? PourNumber { get; set; }

        public string LatchState { get; set; }

        public string Note { get; set; }
    }

    public class tblManufactureBatchUpdateDto : IMapFrom, IDto
    {
        public string OrderCode { get; set; }

        public List<tblManufactureBatchUpdatePourDto> Pours { get; set; }

        public double? ChoppingNumber { get; set; }

        public string PickUpMethod { get; set; }

        [JsonIgnore]
        public double? PourNumber { get => Pours?.Sum(x => x?.Amount); }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureDto>().ReverseMap();
        }
    }

    public class tblManufactureBatchUpdatePourDto : IMapFrom, IDto
    {
        public string PourSectionCode { get; set; }

        public string PourLineCode { get; set; }

        public string OrderCode { get; set; }

        public double Amount { get; set; }

        public string ItemCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public double? PrevAmount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureBatchUpdatePourDto>().ReverseMap();
        }
    }

    public class tblManufactureBatchUpdateShiftPourDto : IMapFrom, IDto
    {
        public string PourSectionCode { get; set; }

        public string PourLineCode { get; set; }

        public List<tblManufactureBatchUpdateShiftOrderDto> Orders { get; set; }

        public string ItemCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureBatchUpdateShiftPourDto>().ReverseMap();
        }
    }

    public class tblManufactureBatchUpdateShiftOrderDto
    {
        public double Amount { get; set; }
        public string OrderCode { get; set; }
        public double? PrevAmount { get; set; }
    }

    public class tblManufactureBatchUpdateTempDto : IMapFrom, IDto
    {
        public string OrderCode { get; set; }

        public DateTime? ProcessDate { get; set; }

        public string ProcessWorkingShiftCode { get; set; }

        public double? Amount { get; set; }

        public string PickUpMethod { get; set; }

        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public string AreaCode { get; set; }

        public string CompanyCode { get; set; }

        public string ProcessType { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        public string OrderCodeFromStock { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureBatchUpdateTempDto>().ReverseMap();
        }
    }

    public class tblManufactureBatchUpdateShiftDto : IMapFrom, IDto
    {
        public DateTime? ProcessDate { get; set; }

        public string ProcessWorkingShiftCode { get; set; }

        public string Note { get; set; }

        public List<tblManufactureBatchUpdateShiftPourDto> Pours { get; set; }

        public List<tblManufactureChipperBatchUpdateDto> Chippers { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuManufacture, tblManufactureBatchUpdateShiftDto>().ReverseMap();
        }
    }

    public class tblManufactureChipperBatchUpdateDto
    {
        public string ChipperCode { get; set; }

        public double Amount { get; set; }
    }

    public class tblManufactureByShiftDto
    {
        public List<ManufactureChoppingDto> Choppings { get; set; }
        public List<ManufactureLandZoneDto> LandZone { get; set; }
        public List<tblManufactureChipperByShiftDto> Chippers { get; set; }
        public List<ManufacturePourDto> Pours
        {
            get => PourDatas.Concat(PourStocks).GroupBy(x => new { x.PourSectionName, x.PourSectionCode })
                             .Select(x => new ManufacturePourDto()
                             {
                                 PourSectionName = x.Key.PourSectionName,
                                 PourSectionCode = x.Key.PourSectionCode,
                                 PourLines = x.SelectMany(y => y.PourLines).GroupBy(y => new { y.PourLineCode, y.PourLineName }).Select(y => new ManufactureLineDto()
                                 {
                                     PourLineName = y.Key.PourLineName,
                                     PourLineCode = y.Key.PourLineCode,
                                     Items = y.SelectMany(z => z.Items).GroupBy(z => new
                                     {
                                         AreaName = z.AreaName,
                                         UnitName = z.UnitName,
                                         ItemName = z.ItemName,
                                         ItemCode = z.ItemCode,
                                         AreaCode = z.AreaCode,
                                         UnitCode = z.UnitCode,
                                         IsShow = z.IsShow
                                     }).Select(z => new ManufactureItemDto()
                                     {
                                         AreaName = z.Key.AreaName,
                                         UnitName = z.Key.UnitName,
                                         ItemName = z.Key.ItemName,
                                         ItemCode = z.Key.ItemCode,
                                         AreaCode = z.Key.AreaCode,
                                         UnitCode = z.Key.UnitCode,
                                         IsShow = z.Key.IsShow,
                                         Orders = z.SelectMany(k => k.Orders).ToList(),
                                     }).OrderBy(x => x.ItemName).ToList()
                                 }).OrderBy(x => x.PourLineName).ToList()
                             }).OrderBy(x => x.PourSectionName).ToList();
        }

        [JsonIgnore]
        public List<ManufacturePourDto> PourDatas { get; set; }

        [JsonIgnore]
        public List<ManufacturePourDto> PourStocks { get; set; }

        public double? TotalNumber { get => Choppings?.Sum(x => x.ChoppingNumber) + Pours?.SelectMany(x => x.PourLines)?.SelectMany(x => x.Items)?.Where(x=>x.IsShow == true)?.Sum(x => x.Amount); }

        public double? PourNumber { get; set; }

        public string LatchState { get; set; }

        public string Note { get; set; }

        public bool CanReverse { get; set; }
    }

    public class tblManufactureChipperByShiftDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public double Amount { get; set; }
    }

    public class ManufactureChoppingDto
    {
        public string OrderCode { get; set; }

        public DateTime OrderDate { get; set; }

        public string OrderShift { get; set; }

        public string VehicleCode { get; set; }

        public string PartnerName { get; set; }

        public string ItemName { get; set; }

        public string AreaName { get; set; }

        public string State { get; set; }

        public double OrderNumber { get; set; }

        public double ChoppingNumber { get; set; }

        public double PourNumber { get; set; }

        public string UnitName { get; set; }
    }
    public class ManufactureLandZoneDto
    {
        public string OrderCode { get; set; }

        public DateTime OrderDate { get; set; }

        public string OrderShift { get; set; }

        public string VehicleCode { get; set; }

        public string PartnerName { get; set; }

        public string ItemName { get; set; }

        public string AreaName { get; set; }

        public string State { get; set; }

        public double OrderNumber { get; set; }

        public double ChoppingNumber { get; set; }

        public double PourNumber { get; set; }

        public string UnitName { get; set; }

        public string PourLineCode { get; set; }

        public string PourLineName { get; set; }

        public string PourSectionCode { get; set; }

        public string PourSectionName { get; set; }

        public List<tblPourLineDto> PourLine { get; set; }

        public List<tblPourSectionDto> PourSection { get; set; }
    }

    public class ManufacturePourDto
    {
        public string PourSectionCode { get; set; }
        public string PourSectionName { get; set; }

        public List<ManufactureLineDto> PourLines { get; set; }
    }

    public class ManufactureLineDto
    {
        public string PourLineCode { get; set; }
        public string PourLineName { get; set; }

        public List<ManufactureItemDto> Items { get; set; }
    }
    public class ManufactureItemDto
    {
        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public string AreaCode { get; set; }

        public string AreaName { get; set; }

        public double PrevAmount { get => Orders.Sum(z => z.PrevAmount); }
        public double Amount { get => Orders.Sum(x => x.Amount); }

        public string UnitCode { get; set; }

        public string UnitName { get; set; }

        public List<ManufactureOrderDto> Orders { get; set; }

        public bool IsShow { get; set; }
    }

    public class ManufactureOrderDto
    {
        public string OrderCode { get; set; }

        public string VehicleCode { get; set; }

        public DateTime? OrderDate { get; set; }

        public string ShiftCode { get; set; }

        public string ShiftName { get; set; }

        public double Amount { get; set; }

        public double PrevAmount { get; set; }
    }

    public class ManufactureExportDto
    {
        public DateTime? ImportDate { get; set; }

        [Description("Ngày nhập")]
        public string ImportDateStr { get => ImportDate?.ToString("dd/MM/yyyy"); }

        public string PartnerCode { get; set; }

        [Description("Nhà CC")]
        public string PartnerName { get; set; }

        [Description("Số xe")]
        public string VehicleCode { get; set; }

        [Description("Khối lượng")]
        public double? Amount { get; set; }

        public string ImportShiftCode { get; set; }

        [Description("Ca nhập")]
        public string ImportShiftName { get; set; }

        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public string AreaCode { get; set; }

        public string AreaName { get; set; }

        [Description("Chủng loại")]
        public string ItemWithArea { get => $"{ItemName} {AreaName}"; }

        public string PoutSectionCode { get; set; }

        [Description("Khu")]
        public string PoutSectionName { get;set;}

        public string PourLineCode { get; set; }

        [Description("Dãy")]
        public string PourLineName { get; set; }

        public DateTime? ExportDate { get; set; }

        [Description("Ngày xuất")]
        public string ExportDateStr { get => ExportDate?.ToString("dd/MM/yyyy"); }

        public string ExportShiftCode { get; set; }

        [Description("Ca xuất")]
        public string ExportShiftName { get; set; }

        public string ChipperCode { get; set; }

        [Description("Máy băm")]
        public string ChipperName { get; set; }

        [Description("Ghi chú")]
        public string Note { get; set; }

        [Description("Cách gắp")]
        public string PickUpMethod { get; set; }
    }
}
