using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;

using DMS.BUSINESS.Common;



using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockItemDetailExportDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Công ty")]

        public string CompanyName { get; set; }

        [Description("Khu vực")]
        public string AreaName { get; set; }
        [Description("Kho hàng")]
        public string StockName { get; set; }
        [Description("Lô hàng")]

        public string PourSectionName { get; set; }
        [Description("Dãy hàng")]
        public string PourLineName { get; set; }
        [Description("Sản phẩm")]

        public string ItemName { get; set; }
        [Description("Số lượng")]

        public double Amount { get; set; }

        [Description("Đơn vị tính")]
        public string UnitName { get; set; }


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
}
