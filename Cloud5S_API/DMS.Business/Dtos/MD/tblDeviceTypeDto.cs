using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDeviceTypeDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }
        [Key]
        [Description("Mã loại thiết bị")]
        public string Code { get; set; }

        [Description("Tên loại thiết bị")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceType, tblDeviceTypeDto>().ReverseMap();
        }
    }

    public class tblDeviceTypeLiteDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceType, tblDeviceTypeLiteDto>().ReverseMap();
        }
    }
}
