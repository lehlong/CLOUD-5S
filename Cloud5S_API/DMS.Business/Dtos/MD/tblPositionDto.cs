using AutoMapper;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblPositionDto : BaseMdDto, IMapFrom,IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã")]
        public string Code { get; set; }

        [Description("Tên chức vụ")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPosition, tblPositionDto>().ReverseMap();
        }
    }

    public class tblPositionCreateDto : IMapFrom, IDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public bool? IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPosition, tblPositionCreateDto>().ReverseMap();
        }
    }
}
