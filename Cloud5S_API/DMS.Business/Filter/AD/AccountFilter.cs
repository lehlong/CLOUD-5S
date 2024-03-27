using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.AD
{
    public class AccountFilter : BaseFilter
    {
        public Guid? GroupId { get; set; }
        public string RoleCode { get; set; }
    }

    public class AccountFilterLite
    {
        public Guid? GroupId { get; set; }
        public string RoleCode { get; set; }
        public string KeyWord { get; set; }
        public bool? IsActive { get; set; }
    }
}
