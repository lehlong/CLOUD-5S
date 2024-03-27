using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class CreatorDto : IMapFrom, IDto
    {
        public string FullName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, CreatorDto>().ReverseMap();
        }
    }
}
