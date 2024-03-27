using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class StockItemDetailFilter : BaseFilter
    {

        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string PourSectionCode { get; set; }
        public string StockCode { get; set; }

        public string ItemCode { get; set; }
        public string CompanyCode { get; set; }

        public string PourLineCode { get; set; }

        public string AreaCode { get; set; }

    }
}
