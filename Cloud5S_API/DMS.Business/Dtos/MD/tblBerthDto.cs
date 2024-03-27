using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblBerthDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Mã cầu")]
        public string Code { get; set; }

        [Description("Tên cầu")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdBerth, tblBerthDto>().ReverseMap();
        }
    }

    public class tblBerthCreateUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdBerth, tblBerthCreateUpdateDto>().ReverseMap();
        }
    }
}
