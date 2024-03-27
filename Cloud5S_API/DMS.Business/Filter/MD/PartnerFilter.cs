using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class PartnerFilter : BaseFilter
    {
        public bool? IsCustomer { get; set; }
        public bool? IsProvider { get; set; }
    }

    public class PartnerFilterLite : BaseMdFilter
    {
        public bool? IsCustomer { get; set; }
        public bool? IsProvider { get; set; }
    }
}
