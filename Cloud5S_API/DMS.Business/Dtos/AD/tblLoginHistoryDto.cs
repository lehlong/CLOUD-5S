using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblLoginHistoryDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public bool IsSuccess { get; set; }

        public string UserAgent { get; set; }

        public string IPAddress { get; set; }

        public tblAdAccount Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdLoginHistory, tblLoginHistoryDto>().ReverseMap();
        }
    }
}
