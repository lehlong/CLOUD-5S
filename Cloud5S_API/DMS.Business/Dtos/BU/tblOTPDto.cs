using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblOTPDto : IMapFrom, IDto
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public string Code { get; set; }

        public bool? IsEmailOTP { get; set; }

        public bool? IsPhoneNumberOTP { get; set; }

        public string Reception { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuOtp, tblOTPDto>().ReverseMap();
        }
    }
}
