using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockItemDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ItemCode { get; set; }

        public string StockCode { get; set; }

        public string CompanyCode { get; set; }

        public double Amount { get; set; }

        public string Note { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblStockDto Stock { get; set; }

        public tblCompanyDto Company { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockItem, tblStockItemDto>().ReverseMap();
        }
    }

    public class tblStockItemExportDto 
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Kho")]
        public string StockName { get; set; }

        [Description("Nhóm sản phẩm")]
        public string ItemType { get; set; }

        [Description("Mã sản phẩm")]
        public string ItemCode { get; set; }

        [Description("Tên sản phẩm")]
        public string ItemName { get; set; }

        [Description("Lượng tồn kho")]
        public double Amount { get; set; }

        [Description("Đơn vị tính")]
        public string Unit { get; set; }
    }
}
