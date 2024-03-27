using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.SO
{
    public class OrderFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public List<string> States { get; set; }

        public string Type { get; set; }

        public string PartnerCode { get; set; }

        public string VehicleCode { get; set; }

        public string AreaCode { get; set; }

        public string CompanyCode { get; set; }

        public string CompanyType { get; set; }

        public string BatchCode { get; set; }

        public bool? IsPaid { get; set; }

        public string DriverUserName { get; set; }

        public string WorkingShiftCode { get; set; }

        public bool? IsFullInfor { get; set; }

        public bool? IsEmptyInfor { get; set; }

        public bool Weight1 { get; set; } = false;

        public bool Weight2 { get; set; } = false;

        public string ItemCode { get; set; }
    }

    public class OrderExportByDayFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string AreaCode { get; set; }
    }
}
