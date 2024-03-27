using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblMessageDto : IMapFrom, IDto
    {

        [Key]
   
        public string Code { get; set; }

        public string Lang { get; set; }

        public string Value { get; set; }
      

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdMessage, tblMessageDto>().ReverseMap();
        }
    }
}
