using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class AttachmentFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set;}
        public string FileType { get; set; }
        public string ModuleType { get; set; }
    }
}
