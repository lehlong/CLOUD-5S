using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderDetail
{
    public class tblOrderDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ItemCode { get; set; }

        public double OrderNumber { get; set; }

        public string UnitCode { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblItemLiteDto Item { get; set; }

        [JsonIgnore]
        public virtual tblOrderDto Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailDto>().ReverseMap();
        }
    }

    public class tblOrderDetailCreateDto : IMapFrom
    {
        public string ItemCode { get; set; }
        public string UnitCode { get; set; }

        public double OrderNumber { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailCreateDto>().ReverseMap();
        }
    }

    public class tblOrderDetailUpdateDto : IMapFrom, IDto
    {
        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public double OrderNumber { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailUpdateDto>().ReverseMap();
        }
    }
}
