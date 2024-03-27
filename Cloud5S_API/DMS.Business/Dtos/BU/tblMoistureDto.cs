using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.BUSINESS.Dtos.SO.Order;
using System.Text.Json.Serialization;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblMoistureDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ProcessBy { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? TrayWeight { get; set; }

        public double? TrayWetWeight { get; set; }

        public double? WetWeight { get; set; }

        public double? TrayDryWeight { get; set; }

        public double? DryWeight { get; set; }

        public double? Moisture { get; set; }

        public string Remark { get; set; }

        public string Note { get; set; }

        [JsonIgnore]
        public virtual tblOrderDto Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuMoisture, tblMoistureDto>().ReverseMap();
        }
    }

    public class tblMoistureLiteDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ProcessBy { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? TrayWeight { get; set; }

        public double? TrayWetWeight { get; set; }

        public double? WetWeight { get; set; }

        public double? TrayDryWeight { get; set; }

        public double? DryWeight { get; set; }

        public double? Moisture { get; set; }

        public string Remark { get; set; }

        public string Note { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuMoisture, tblMoistureLiteDto>().ReverseMap();
        }
    }

    public class tblMoistureCreateUpdateDto : IMapFrom, IDto
    {
        [Key]
        public Guid? Id { get; set; }

        public string OrderCode { get; set; }

        public string ProcessBy { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? TrayWeight { get; set; }

        public double? TrayWetWeight { get; set; }

        public double? WetWeight { get; set; }

        public double? TrayDryWeight { get; set; }

        public double? DryWeight { get; set; }

        public double? Moisture { get; set; }

        public string Remark { get; set; }

        public string Note { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuMoisture, tblMoistureCreateUpdateDto>().ReverseMap();
        }
    }

    public class MoistureExcelDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Mã đơn hàng")]
        public string OrderCode { get; set; }

        [Description("Người thực hiện")]
        public string ProcessBy { get; set; }

        [Description("Trọng lượng khay")]
        public double? TrayWeight { get; set; }

        [Description("Trọng lượng khay và gỗ tươi")]
        public double? TrayWetWeight { get; set; }

        [Description("Trọng lượng gỗ tươi")]
        public double? WetWeight { get; set; }

        [Description("Trọng lượng khay và gỗ khô")]
        public double? TrayDryWeight { get; set; }

        [Description("Trọng lượng gỗ khô")]
        public double? DryWeight { get; set; }

        [Description("độ ẩm")]
        public double? Moisture { get; set; }

        [Description("đánh giá")]
        public string Remark { get; set; }

        [Description("Ghi chú")]
        public string Note { get; set; }
    }
}
