using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblShipDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        [JsonIgnore]
        public int OrdinalNumber { get; set; }

        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Description("Tên tàu")]
        public string Name { get; set; }

        [Description("Trọng lượng")]
        public double? Tonage { get; set; }

        [Description("Trạng thái")]
        [JsonIgnore]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdShip, tblShipDto>().ReverseMap();
        }
    }
}
