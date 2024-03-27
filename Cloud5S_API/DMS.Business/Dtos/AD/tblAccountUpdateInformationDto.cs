using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountUpdateInformationDto : IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string VehicleCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountUpdateInformationDto>().ReverseMap();
        }
    }
}
