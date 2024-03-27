using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblCompanyInfoDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdCompanyInfo, tblCompanyInfoDto>().ReverseMap();
        }
    }
}
