using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblChipperDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã máy băm")]
        public string Code { get; set; }

        [Description("Tên máy băm")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdChipper, tblChipperDto>().ReverseMap();
        }
    }
}
