using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.BU;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblContractDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public string Type { get; set; }

        public string PartnerCode { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Note { get; set; }

        public double TotalMoney { get => Details.Sum(x => x.SumMoney ?? 0); }

        public string Content { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual List<tblContractDetailDto> Details { get; set; }

        public Guid? ReferenceId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContract, tblContractDto>().ReverseMap();
        }
    }

    public class tblContractCreateDto : IMapFrom, IDto
    {
        public string Type { get; set; }

        public string PartnerCode { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Note { get; set; }

        public string Content { get; set; }

        public Guid? ReferenceId { get; set; }

        public virtual List<tblContractDetailCreateDto> Details { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContract, tblContractCreateDto>().ReverseMap();
        }
    }

    public class tblContractUpdateStateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContract, tblContractUpdateStateDto>().ReverseMap();
        }
    }

    public class tblContractUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Type { get; set; }

        public string PartnerCode { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Note { get; set; }

        public string Content { get; set; }

        public virtual List<tblContractDetailUpdateDto> Details { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContract, tblContractUpdateDto>().ReverseMap();
        }
    }

    public class tblContractExportDto : IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Mã hợp đồng")]
        public string Code { get; set; }

        [Description("Loại hợp đồng")]
        public string Type { get; set; }

        [Description("Khách hàng")]
        public string PartnerName { get; set; }

        [Description("ListObject")]
        public virtual List<tblContractDetailExportDto> Details { get; set; }

        [Description("Giá trị hợp đồng")]
        public double TotalMoney { get; set; }

        [Description("Ngày bắt đầu")]
        public DateTime? StartDate { get; set; }

        [Description("Ngày kết thúc")]
        public DateTime? EndDate { get; set; }

        [Description("Nội dung")]
        public string Content { get; set; }

        [Description("Trạng thái")]
        public string State { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuContract, tblContractDto>().ReverseMap();
        }
    }
}
