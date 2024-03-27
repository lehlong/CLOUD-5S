using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.MD;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblStockExportDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ExportCode { get; set; }

        public string ItemCode { get; set; }

        public double? Amount { get; set; }

        [JsonIgnore]
        public virtual tblStockExportDto Export { get; set; }

        public virtual tblItemDto Item { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuStockExportDetail, tblStockExportDetailDto>().ReverseMap();
        }
    }
}
