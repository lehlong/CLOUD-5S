using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.SO
{
    public class OrderBatchFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string VehicleCode { get; set; }

        public string ShipCode { get; set; }

        public string State { get; set; }
    }

    public class OrderBatchExportExcelFilter
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string VehicleCode { get; set; }

        public string ShipCode { get; set; }

        public string State { get; set; }

        public string KeyWord { get; set; }
    }
}
