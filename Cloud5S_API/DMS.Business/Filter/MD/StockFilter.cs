using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class StockFilter : BaseFilter
    {
        public string CompanyCode { get; set; }
    }

    public class StockFilterLite : BaseMdFilter
    {
        public string CompanyCode { get; set; }
    }

}
