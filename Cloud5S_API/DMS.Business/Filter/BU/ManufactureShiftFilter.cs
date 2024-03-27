using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class ManufactureShiftFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string WorkingShiftCode { get; set; }
    }

    public class ManufactureGetByShiftFilter : BaseFilter
    {
        public DateTime? ProcessDate { get; set; }
        public string WorkingShiftCode { get; set; }
    }
}
