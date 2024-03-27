using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.BU;
using DMS.CORE.Entities.SO;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class tblOrderScaleSyncDto : IMapFrom, IDto
    {
        public string Code { get; set; }

        public string ScaleTypeCode { get; set; }

        public string PartnerCode { get; set; }

        public string VehicleCode { get; set; }

        public string DriverName { get; set; }

        public string ItemCode { get; set; }

        public string Note { get; set; }

        public double? Weight1 { get; set; }

        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        public string CompanyCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public string RfId { get; set; }

        public string BillNumber { get; set; }

        public string InvoiceNumber { get; set; }

        public string InvoiceTemplate { get; set; }

        public string InvoiceSymbol { get; set; }

        public bool? IsCanceled { get; set; }

        public void Mapping(Profile profile)
        {
            profile
                .CreateMap<tblOrderScaleSyncDto,tblSoScale >()
                .ForMember(dest => dest.SyncCode, x => x.MapFrom(y => y.Code))
                .ForMember(dest => dest.Code, x=> x.Ignore())
                .ReverseMap();
        }
    }

    public class SyncScaleResponseDto
    {
        public List<SyncScaleResponseBaseDto> Success { get; set; } = new();

        public List<SyncScaleResponseBaseDto> Fails { get; set; } = new();
    }

    public class SyncScaleOrderState
    {
        public string OldState { get; set; }

        public OrderState State { get; set; }

        public DateTime ProcessDate { get; set; }
    }

    public class SyncScaleResponseBaseDto
    {
        public string Code { get; set; }

        public bool Status { get; set; }

        public MessageObject MessageObject { get; set; }
        public Exception Exception { get; set; }
    }
    public class SyncScaleRequestDto
    {
        public FileRequestDto Files { get; set; }
        public string ModuleType { get; set; }
        public string ScaleCode { get; set; }
        public string SyncCode { get; set; }
    }

}
