using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.SO.OrderProcess
{
    public class tblOrderProcessDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        public DateTime? ProcessDate { get; set; }

        public string CreateBy { get; set; }

        [JsonIgnore]
        public virtual tblSoOrder Order { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderProcess, tblOrderProcessDto>().ReverseMap();
        }
    }
}