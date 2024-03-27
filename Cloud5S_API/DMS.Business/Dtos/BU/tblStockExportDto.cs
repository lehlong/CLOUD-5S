using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Dtos.MD;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockExportDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string OrderCode { get; set; }

        public DateTime? ExportDate { get; set; }

        public string StockCode { get; set; }

        public string CompanyCode { get; set; }

        public string ShiftCode { get; set; }

        public virtual tblWorkingShiftDto WorkingShift { get; set; }

        public virtual List<tblStockExportDetailDto> ExportDetails { get; set; }

        public virtual tblAccountDto Creator { get; set; }

        public virtual tblAccountDto Updater { get; set; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblStockDto Stock { get; set; }

        public virtual tblCompanyDto Company { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockExport, tblStockExportDto>().ReverseMap();
        }
    }
}
