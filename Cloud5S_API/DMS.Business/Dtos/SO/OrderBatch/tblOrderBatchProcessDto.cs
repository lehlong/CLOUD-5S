using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderBatch
{
    public class tblOrderBatchProcessDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderBatchCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        [JsonIgnore]
        public virtual tblOrderBatchDto OrderBatch { get; set; }

        public virtual tblAccountDto Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderBatchProcess, tblOrderBatchProcessDto>().ReverseMap();
        }
    }
}
