using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountRightDto : IMapFrom, IDto
    {
        public string UserName { get; set; }

        public string RightId { get; set; }

        public bool? IsAdded { get; set; }

        public bool? IsRemoved { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public virtual tblRightDto Right { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountRight, tblAccountRightDto>().ReverseMap();
        }
    }

    public class tblAccountRightCreateDto : IMapFrom, IDto
    {
        [Key]
        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountRight, tblAccountRightCreateDto>().ReverseMap();
        }
    }

    public class tblAccountRightUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAccountRightDto, tblAccountRightUpdateDto>().ReverseMap();
        }
    }
}
