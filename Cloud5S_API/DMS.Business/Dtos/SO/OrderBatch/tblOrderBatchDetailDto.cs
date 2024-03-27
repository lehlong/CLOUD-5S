using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderBatch
{
    public class tblOrderBatchDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderBatchCode { get; set; }

        public string ItemCode { get; set; }

        public double OrderNumber { get; set; }

        public double? ReleaseNumber { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        public string UnitCode { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        [JsonIgnore]
        public virtual tblOrderBatchDto OrderBatch { get; set; }

        public virtual tblItemDto Item { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchDetail, tblOrderBatchDetailDto>().ReverseMap();
        }
    }

    public class tblOrderBatchDetailCreateDto : IMapFrom, IDto
    {
        public double OrderNumber { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchDetail, tblOrderBatchDetailCreateDto>().ReverseMap();
        }
    }

    public class tblOrderBatchDetailUpdateDto : IMapFrom, IDto
    {
        public double OrderNumber { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchDetail, tblOrderBatchDetailUpdateDto>().ReverseMap();
        }
    }
}
