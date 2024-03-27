using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblBuStockItemTransferLogDto : BaseDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public double? Amount { get; set; }

        public string CompanyCode { get; set; }

        public string FromPourLineCode { get; set; }

        public string FromPourSectionCode { get; set; }

        public string ToPourLineCode { get; set; }

        public string ToPourSectionCode { get; set; }

        public string ItemCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public string StockCode { get; set; }

        public string OrderCode { get; set; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblMdPourLine FromPourLine { get; set; }

        public virtual tblMdPourSection FromPourSection { get; set; }

        public virtual tblMdPourLine ToPourLine { get; set; }

        public virtual tblMdPourSection ToPourSection { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblAreaDto Area { get; set; }

        public virtual tblStockDto Stock { get; set; }
            
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockItemTransferLog, tblBuStockItemTransferLogDto>().ReverseMap();
        }
    }
}
