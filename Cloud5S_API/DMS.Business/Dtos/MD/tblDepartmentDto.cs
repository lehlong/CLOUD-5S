using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDepartmentDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã")]
        public string Code { get; set; }

        [Description("Tên phòng")]
        public string Name { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public string CompanyCode { get; set; }

        public virtual tblCompanyDto Company { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDepartment, tblDepartmentDto>().ReverseMap();
        }
    }
}
