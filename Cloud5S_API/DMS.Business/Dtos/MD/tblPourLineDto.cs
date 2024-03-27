using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblPourLineDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        [JsonIgnore]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã dãy đổ hàng")]
        public string Code { get; set; }

        [Description("Mã khu đổ hàng")]
        public string SectionCode { get; set; }

        [Description("Tên dãy đổ hàng")]
        public string Name { get; set; }

        public virtual tblPourSectionDto PourSection { get; set; }

        [Description("Trạng thái")]
        [JsonIgnore]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourLine, tblPourLineDto>().ReverseMap();
        }
    }

    public class tblPourLineCreateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string SectionCode { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourLine, tblPourLineCreateDto>().ReverseMap();
        }
    }

    public class tblPourLineUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string SectionCode { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourLine, tblPourLineUpdateDto>().ReverseMap();
        }
    }

    public class tblOrderPourLineDto : BaseMdDto, IMapFrom, IDto
    {
        public string Code { get; set; }

        public string SectionCode { get; set; }

        public string Name { get; set; }

        public double StockNumber { get; set; }

        public int TotalOrder { get; set; }

        public DateTime? PourDateEarliest { get; set; }

        public DateTime? PourDateLastest { get; set; }

        public bool Expand { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourLine, tblPourLineDto>().ReverseMap();
        }
    }
}
