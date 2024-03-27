using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccount_AccountGroupDto : IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        [Key]
        public Guid GroupId { get; set; }

        public virtual tblAccountDto Account { get; set; }

        [JsonIgnore]
        public virtual tblAccountGroupDto AccountGroup { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount_AccountGroup, tblAccount_AccountGroupDto>().ReverseMap();
        }
    }

    public class tblAccount_AccountGroupCreateGroupDto : IMapFrom, IDto
    {
        public Guid GroupId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount_AccountGroup, tblAccount_AccountGroupCreateGroupDto>().ReverseMap();
        }
    }

    public class tblAccount_AccountGroupUpdateGroupDto : IMapFrom, IDto
    {
        public Guid GroupId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAccount_AccountGroupDto, tblAccount_AccountGroupUpdateGroupDto>().ReverseMap();
        }
    }

    public class tblAccount_AccountGroupCreateAccountDto : IMapFrom, IDto
    {
        public string UserName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount_AccountGroup, tblAccount_AccountGroupCreateAccountDto>().ReverseMap();
        }
    }

    public class tblAccount_AccountGroupLiteAccountDto : IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        [Key]
        public Guid GroupId { get; set; }

        public virtual tblAccountLiteDto Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount_AccountGroup, tblAccount_AccountGroupLiteAccountDto>().ReverseMap();
        }
    }

    public class tblAccount_AccountGroupLiteGroupDto : IMapFrom, IDto
    {
        [Key]
        public Guid GroupId { get; set; }

        public virtual tblAdAccountGroupLiteDto AccountGroup { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount_AccountGroup, tblAccount_AccountGroupLiteGroupDto>().ReverseMap();
        }
    }
}
