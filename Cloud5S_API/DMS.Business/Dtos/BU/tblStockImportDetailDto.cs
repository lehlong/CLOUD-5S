using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockImportDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ImportCode { get; set; }

        public string ItemCode { get; set; }

        public string StockCode { get; set; }

        public double? Amount { get; set; }

        public string Note { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        public DateTime? ImportDate { get; set; }

        public DateTime? CreateDate { get; set; }

        public string CreateBy { get; set; }

        public virtual tblStockImportDto Import { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblStockDto Stock { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockImportDetail, tblStockImportDetailDto>().ReverseMap();
        }
    }
}
