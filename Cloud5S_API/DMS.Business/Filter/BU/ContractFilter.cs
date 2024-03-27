using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class ContractFilter : BaseFilter
    {
        public string Type { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set;}
        public string PartnerCode { get; set; }
    }

    public class ContractExportFilter
    {
        public string Type { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string PartnerCode { get; set; }

        public string KeyWord { get; set; }
    }
}
