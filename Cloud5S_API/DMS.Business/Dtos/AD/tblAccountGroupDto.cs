using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Notes { get; set; }

        public string RoleCode { get; set; }

        public Roles Role
        {
            get
            {
                if (Enum.TryParse(RoleCode, out Roles r))
                {
                    return r;
                }
                return Roles.KHONG_XAC_DINH;
            }
        }
        public List<tblAccount_AccountGroupLiteAccountDto> Account_AccountGroups { get; set; }

        public List<tblAccountGroupRightDto> ListAccountGroupRight { get; set; }

        public tblRightDto TreeRight { get; set; }

        public tblAccountGroupDto()
        {
            Account_AccountGroups = new List<tblAccount_AccountGroupLiteAccountDto>();
            ListAccountGroupRight = new List<tblAccountGroupRightDto>();
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }

    public class tblAccountGroupUpdateDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Notes { get; set; }

        public string RoleCode { get; set; }

        public List<tblAccountGroupRightCreateDto> ListAccountGroupRight { get; set; }

        public List<tblAccount_AccountGroupCreateAccountDto> Account_AccountGroups { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupUpdateDto>().ReverseMap();
        }
    }

    public class tblAccountGroupExportDto : BaseAdDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Tên nhóm")]
        public string Name { get; set; }

        [Description("Ghi chú")]
        public string Notes { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }
    }

    public class tblAdAccountGroupLiteDto :BaseAdDto, IMapFrom, IDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string RoleCode { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAdAccountGroupLiteDto>().ReverseMap();
        }
    }
}
