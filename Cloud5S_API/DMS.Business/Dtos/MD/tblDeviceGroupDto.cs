using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDeviceGroupDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }
        [Key]
        [Description("Mã nhóm thiết bị")]
        public string Code { get; set; }

        [Description("Tên nhóm thiết bị")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceGroup, tblDeviceGroupDto>().ReverseMap();
        }
    }

    public class tblDeviceGroupLiteDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceGroup, tblDeviceGroupLiteDto>().ReverseMap();
        }
    }
}
