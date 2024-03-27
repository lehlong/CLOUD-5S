using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.SO
{
    public class OrderBatchVehicleFilter : BaseFilter
    {
        public string BatchCode { get; set; }
    }

    public class OrderBatchExportFilter : BaseFilter
    {
        public string BatchCode { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string State { get; set; }

        public string VehicleCode { get; set; }
    }
}
