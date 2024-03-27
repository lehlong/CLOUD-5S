using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class tblOrderScaleDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string ScaleTypeCode { get; set; }

        public string PartnerCode { get; set; }

        public string VehicleCode { get; set; }

        public string DriverName { get; set; }

        public string ItemCode { get; set; }

        public string CompanyCode { get; set; }

        public string Note { get; set; }

        public double? Weight1 { get; set; }

        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        public double? Weight { get; set; }

        public string SyncCode { get; set; }

        public Guid? ReferenceId { get; set; }

        public byte[] Image { get; set; }

        public string UnitCode { get; set; }

        public string BillNumber { get; set; }

        public string InvoiceNumber { get; set; }

        public string InvoiceTemplate { get; set; }

        public string InvoiceSymbol { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual List<tblScaleImageDto> Images { get; set; }

        public tblCompanyDto Company { get; set; }

        public tblAreaDto Area { get; set; }

        public bool? IsCanceled { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoScale, tblOrderScaleDto>().ReverseMap();
        }
    }

    public class tblOrderScaleLiteDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string ScaleTypeCode { get; set; }

        public string PartnerCode { get; set; }

        public string VehicleCode { get; set; }

        public string DriverName { get; set; }

        public string ItemCode { get; set; }

        public string CompanyCode { get; set; }

        public string Note { get; set; }

        public double? Weight1 { get; set; }

        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        public double? Weight { get; set; }

        public string SyncCode { get; set; }

        public Guid? ReferenceId { get; set; }

        public byte[] Image { get; set; }

        public string UnitCode { get; set; }

        public string BillNumber { get; set; }

        public string InvoiceNumber { get; set; }

        public string InvoiceTemplate { get; set; }

        public string InvoiceSymbol { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual List<tblScaleImageDto> Images { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoScale, tblOrderScaleLiteDto>().ReverseMap();
        }
    }
}
