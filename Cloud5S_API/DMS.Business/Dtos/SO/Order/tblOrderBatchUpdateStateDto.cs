using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderBatchUpdateStateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatch, tblOrderBatchUpdateStateDto>().ReverseMap();
        }
    }
}
