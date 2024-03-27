using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class StockItemFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string StockCode { get; set; }
        public string CompanyCode { get; set; }
        public string ItemCode { get; set; }
        public string ItemType { get; set; }
    }

    public class StockItemExportFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string StockCode { get; set; }
        public string ItemType { get; set; }
        public string KeyWord { get; set; }
    }

    public class StockItemHistoryFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string StockCode { get; set; }
        public string ItemType { get; set; }
    }

    public class StockItemHistoryExportFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string StockCode { get; set; }
        public string ItemType { get; set; }
        public string KeyWord { get; set; }
    }
}
