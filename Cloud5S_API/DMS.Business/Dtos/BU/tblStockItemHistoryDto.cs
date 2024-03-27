using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;
using DocumentFormat.OpenXml.Wordprocessing;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockItemHistoryDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }
        public string ItemCode { get; set; }
        public string StockCode { get; set; }
        public double Amount { get; set; }
        public double ImportAmount { get; set; }
        public double ExportAmount { get; set; }
        public DateTime ProcessDate { get; set; }
        public virtual tblItemDto Item { get; set; }
        public virtual tblStockDto Stock { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockItemHistory, tblStockItemHistoryDto>().ReverseMap();
        }
    }

    public class tblStockItemHistoryExportDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        public string StockCode { get; set;}

        [Description("Kho hàng")]
        public string StockName { get; set; }

        [Description("Mã sản phẩm")]
        public string ItemCode { get; set; }

        [Description("Tên sản phẩm")]
        public string ItemName { get; set; }

        [Description("Số lượng tồn đầu")]
        public double? FirstAmount { get; set; }

        [Description("Số lượng nhập")]
        public double? ImportAmount { get; set; }

        [Description("Số lượng xuất")]
        public double? ExportAmount { get; set; }

        [Description("Số lượng tồn cuối")]
        public double? LastAmount { get; set; }
    }
}
