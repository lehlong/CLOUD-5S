using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblRightDto : IMapFrom, IDto
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int? OrderNumber { get; set; }

        public bool IsChecked { get; set; }

        public List<tblRightDto> Children { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdRight, tblRightDto>().ReverseMap();
        }
    }

    public class RightViewModel
    {
        public Guid GroupId { get; set; }

        public List<tblRightDto> ListRight { get; set; }

        public RightViewModel()
        {
            ListRight = new List<tblRightDto>();
        }
    }
}
