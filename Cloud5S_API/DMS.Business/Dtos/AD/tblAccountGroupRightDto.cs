using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountGroupRightDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public Guid GroupId { get; set; }

        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroupRight, tblAccountGroupRightDto>().ReverseMap();
        }
    }

    public class tblAccountGroupRightCreateDto : IMapFrom, IDto
    {
        public string RightId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroupRight, tblAccountGroupRightCreateDto>().ReverseMap();
        }
    }
}
