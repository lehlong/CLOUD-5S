using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.BU
{
    public class ManufactureFilter : BaseFilter
    {
        public DateTime? ImportFromDate { get; set; }

        public DateTime? ImportToDate { get; set; }

        public string ImportWorkingShiftCode { get; set; }

        public string VehicleCode { get; set; }

        public List<string> State { get; set; }

        public string PartnerCode { get; set; }

        public DateTime? ExportFromDate { get; set; }

        public DateTime? ExportToDate { get; set; }

        public string ExportWorkingShiftCode { get; set; }

        public bool? IsOnShift { get; set; }
    }
}
