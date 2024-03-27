using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblMenuDto : IMapFrom, IDto
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int OrderNumber { get; set; }

        public string RightId { get; set; }

        public string Url { get; set; }

        public string Icon { get; set; }

        public List<tblMenuDto> Children { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdMenu, tblMenuDto>().ReverseMap();
        }
    }
}
