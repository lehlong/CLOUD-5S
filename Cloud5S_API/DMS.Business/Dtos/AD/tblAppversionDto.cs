using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAppVersionDto : IMapFrom, IDto
    {
        public int VersionCode { get; set; }

        public string VersionName { get; set; }

        public bool IsRequiredUpdate { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAppVersion, tblAppVersionDto>().ReverseMap();
        }
    }
}
