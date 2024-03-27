using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class NotificationFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set;}
    }

    public class NotificationExportFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string KeyWord { get; set; }
    }
}
