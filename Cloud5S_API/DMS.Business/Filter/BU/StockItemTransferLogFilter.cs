using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class StockItemTransferLogFilter : BaseFilter
    {     
        public string AreaCode { get; set; }      
        public string CompanyCode { get; set; }

        public string ItemCode { get; set; }
        public string StockCode { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

    }
}
