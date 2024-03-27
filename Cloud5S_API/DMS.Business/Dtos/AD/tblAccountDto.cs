using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;
using DMS.BUSINESS.Dtos.MD;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public virtual tblCompanyDto Company { get; set; }

        public virtual tblPositionDto Position { get; set; }

        public virtual tblDepartmentDto Department { get; set; }

        public virtual List<tblAccount_AccountGroupDto> Account_AccountGroups { get; set; }

        public virtual List<tblAccountRightDto> AccountRights { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountDto>().ReverseMap();
        }
    }

    public class tblAccountLoginDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public virtual tblCompanyDto Company { get; set; }

        public virtual tblPositionDto Position { get; set; }

        public virtual tblDepartmentDto Department { get; set; }

        public virtual List<tblAccount_AccountGroupDto> Account_AccountGroups { get; set; }

        public virtual List<tblAccountGroupDto> AccountGroups { get => Account_AccountGroups.Select(x => x.AccountGroup).ToList(); }

        public virtual List<tblAccountRightDto> AccountRights { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountLoginDto>().ReverseMap();
        }
    }

    public class tblAccountCreateDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public string VehicleCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountCreateDto>().ReverseMap();
        }
    }

    public class tblAccountExportDto : BaseAdDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Tên tài khoản")]
        public string UserName { get; set; }

        [Description("Tên đầy đủ")]
        public string FullName { get; set; }

        [Description("Địa chỉ")]
        public string Address { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }
    }

    public class tblAccountLiteDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public virtual List<tblAccount_AccountGroupDto> Account_AccountGroups { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountLiteDto>().ReverseMap();
            profile.CreateMap<tblAccountDto, tblAccountLiteDto>().ReverseMap();
        }
    }

    public class tblAccountUpdateDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public string VehicleCode { get; set; }

        public virtual List<tblAccount_AccountGroupUpdateGroupDto> Account_AccountGroups { get; set; }

        public virtual List<tblAccountRightUpdateDto> AccountRights { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAccountUpdateDto, tblAccountDto>().ReverseMap();
        }
    }

    public class tblAccountTreeRightDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get; set; }

        public string Address { get; set; }

        public string VehicleCode { get; set; }

        public virtual List<tblAccount_AccountGroupLiteGroupDto> Account_AccountGroups { get; set; }
        public tblRightDto TreeRight { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountTreeRightDto>().ReverseMap();
        }
    }
}
