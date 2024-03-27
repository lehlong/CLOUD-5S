using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblWorkingShiftDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Tên ca")]
        public string Name { get; set; }

        [Description("Mô tả")]
        public string Description { get; set; }

        public TimeSpan FromHour { get; set; }

        public TimeSpan ToHour { get; set; }

        [Description("Từ giờ")]
        [JsonIgnore]
        public string StrFromHour { get; set; }

        [Description("Đến giờ")]
        [JsonIgnore]
        public string StrToHour { get; set; }

        [JsonIgnore]
        public DateTime FromDate { get; set; }

        [JsonIgnore]
        public DateTime ToDate { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdWorkingShift, tblWorkingShiftDto>().ReverseMap();
        }
    }
}
