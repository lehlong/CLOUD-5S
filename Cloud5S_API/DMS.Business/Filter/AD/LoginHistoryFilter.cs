using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.AD
{
    public class LoginHistoryFilter : BaseFilter
    {
        public DateTime? FromDate { get; set;}
        public DateTime? ToDate { get; set;}    
    }
}
