using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.BU;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblContractDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ContractCode { get; set; }

        public string ItemCode { get; set; }

        public double? OrderNumber { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        public virtual tblItemDto Item { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContractDetail, tblContractDetailDto>().ReverseMap();
        }
    }

    public class tblContractDetailCreateDto : IMapFrom, IDto
    {
        public string ItemCode { get; set; }

        public double? OrderNumber { get; set; }

        public double? Price { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContractDetail, tblContractDetailCreateDto>().ReverseMap();
        }
    }
    public class tblContractDetailUpdateDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ContractCode { get; set; }

        public string ItemCode { get; set; }

        public double? OrderNumber { get; set; }

        public double? Price { get; set; }

        public virtual tblItemDto Item { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContractDetail, tblContractDetailUpdateDto>().ReverseMap();
        }
    }

    public class tblContractDetailExportDto : IMapFrom, IDto
    {
        [Description("Hàng hóa")]
        public string ItemName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContractDetail, tblContractDetailDto>().ReverseMap();
        }
    }
}
