using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Common;

using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.BUSINESS.Dtos.SO.Order;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockItemDetailDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public int OrdinalNumber { get; set; }

        public string CompanyCode { get; set; }

        public string AreaCode { get; set; }

        public string StockCode { get; set; }

        public string PourSectionCode { get; set; }

        public string PourLineCode { get; set; }

        public string ItemCode { get; set; }

        public double Amount { get; set; }

        public string UnitCode { get; set; }

        public string OrderCode { get; set; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblStockDto Stock { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblAreaDto Area { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public tblPourLineDto PourLine { get; set; }

        public tblPourSectionDto PourSection { get; set; }

        public tblCompanyDto Company { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockItemDetail, tblStockItemDetailDto>().ReverseMap();
        }
    }

    public class tblStockItemDetailTransferDto
    {
        public string CompanyCode { get; set; }

        public string AreaCode { get; set; }

        public string PourSectionCode { get; set; }

        public string PourLineCode { get; set; }

        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public string OrderCode { get; set; }

        public double TrasferAmount { get => ToStocks.Sum(x => x.Amount); }

        public List<tblStockItemDetailTransferToDto> ToStocks { get; set; }
    }

    public class tblStockItemDetailTransferToDto
    {
        public string PourSectionCode { get; set; }

        public string PourLineCode { get; set; }

        public double Amount { get; set; }
    }

    public class StockItemDetailPourDto
    {
        public string PourSectionCode { get; set; }

        public string PourSectionName { get; set; }

        public string CompanyCode { get; set; }

        public string CompanyName { get; set; }

        public List<StockItemDetailLineDto> PourLines { get; set; }
    }

    public class StockItemDetailLineDto
    {
        public string PourLineCode { get; set; }
        public string PourLineName { get; set; }

        public List<StockItemDetailItemDto> Items { get; set; }
    }
    public class StockItemDetailItemDto
    {
        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public string AreaCode { get; set; }

        public string AreaName { get; set; }

        public double Amount { get => Orders.Sum(x => x.Amount); }

        public string UnitCode { get; set; }

        public string UnitName { get; set; }

        public List<StockItemDetailOrderDto> Orders { get; set; }

    }

    public class StockItemDetailOrderDto
    {
        public string OrderCode { get; set; }

        public string VehicleCode { get; set; }

        public DateTime? OrderDate { get; set; }

        public string ShiftCode { get; set; }

        public string ShiftName { get; set; }

        public double Amount { get; set; }
    }
}
