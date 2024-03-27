using DMS.BUSINESS.Common.Class;

namespace DMS.BUSINESS.Common
{
    public interface IBaseService
    {
        MessageObject MessageObject { get; set; }
        Exception Exception { get; set; }
        bool Status { get; set; }
    }
}
