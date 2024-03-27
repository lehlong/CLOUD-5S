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
    public class tblPourSectionDto : BaseMdDto, IMapFrom, IDto
    {
        [JsonIgnore]
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        public string Code { get; set; }

        [Description("Tên khu đổ hàng")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        [JsonIgnore]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public virtual List<tblPourLineDto> PourLines { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourSection, tblPourSectionDto>().ReverseMap();
        }
    }

    public class tblOrderPourSectionDto : BaseMdDto, IMapFrom, IDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public double StockNumber { get => this.PourLines.Sum(x=>x.StockNumber); }

        public int TotalOrder { get => this.PourLines.Sum(x => x.TotalOrder); }

        public DateTime? PourDateEarliest { get => this.PourLines.Min(x => x.PourDateEarliest); }

        public DateTime? PourDateLastest { get => this.PourLines.Min(x => x.PourDateLastest); }

        public bool Expand { get; set; }

        public virtual List<tblOrderPourLineDto> PourLines { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPourSection, tblPourSectionDto>().ReverseMap();
        }
    }
}
