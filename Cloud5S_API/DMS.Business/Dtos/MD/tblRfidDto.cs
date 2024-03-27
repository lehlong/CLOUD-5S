using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblRfidDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã thẻ")]
        public string Code { get; set; }

        [Description("Biển số xe")]
        public string VehicleCode { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        [JsonIgnore]
        public virtual tblVehicleDto Vehicle { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdRfid, tblRfidDto>().ReverseMap();
        }
    }

    public class tblRfidCreateUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string VehicleCode { get; set; }

        public bool? IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdRfid, tblRfidCreateUpdateDto>().ReverseMap();
        }
    }
}
