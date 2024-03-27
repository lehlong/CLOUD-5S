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
    public class tblCompanyDto : BaseMdDto, IMapFrom, IDto
    {
        [JsonIgnore]
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        public string Code { get; set; }

        [Description("Tên trạm")]
        public string Name { get; set; }

        public Guid? Id { get; set; }

        [Description("Loại trạm")]
        public string Type { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public virtual List<tblDepartmentDto> Departments { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdCompany, tblCompanyDto>().ReverseMap();
        }
    }

    public class tblCompanyCreateDto : IMapFrom, IDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public bool IsActive { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdCompany, tblCompanyDto>().ReverseMap();
        }
    }
}
