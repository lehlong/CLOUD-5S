using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.AD
{
    public class ActionLogDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string ActionName { get; set; }

        public string Body { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdActionLog, ActionLogDto>().ReverseMap();
        }
    }

    public class ActionLogCreateDto : IDto
    {
        public string UserName { get; set; }

        public string ActionName { get; set; }

        public string Body { get; set; }
    }
}
