using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class MoistureFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string VehicleCode { get; set; }

        public string PartnerCode { get; set; }

        public string AreaCode { get; set; }
    }
}
