using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class CheckInOutFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
