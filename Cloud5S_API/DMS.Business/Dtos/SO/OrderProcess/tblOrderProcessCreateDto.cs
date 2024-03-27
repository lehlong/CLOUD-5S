using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;

namespace DMS.BUSINESS.Dtos.SO.OrderProcess
{
    public class tblOrderProcessCreateDto : IMapFrom, IDto
    {
        public string OrderCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        public DateTime? ProcessDate { get; set; } = DateTime.Now;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderProcess, tblOrderProcessCreateDto>().ReverseMap();
        }
    }
}
