using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.SO
{
    public class OrderScaleFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string PartnerCode { get; set; }
        public string ItemCode { get; set; }
        public string VehicleCode { get; set; }
        public string Type { get; set; }
        public string CompanyCode { get; set; }
        public string AreaCode { get; set; }
        public bool Weight1 { get; set; } = false;
        public bool Weight2 { get; set; } = false;

        public bool? IsCanceled { get; set; }
    }
}
