using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class VehicleFilter : BaseFilter
    {
        public string TypeCode { get; set; }
    }

    public class VehicleFilterLite : BaseMdFilter
    {
    }

    public class VehicleExportFilter : BaseExportFilter
    {
        public string TypeCode { get; set; }
    }
}
