namespace DMS.BUSINESS.Filter.SO
{
    public class OrderExportExcelFilter
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public List<string> States { get; set; }

        public string Type { get; set; }

        public string PartnerCode { get; set; }

        public string ItemCode { get; set; }

        public string VehicleCode { get; set; }

        public string AreaCode { get; set; }

        public string CompanyCode { get; set; }

        public string CompanyType { get; set; }

        public string BatchCode { get; set; }

        public bool? IsPaid { get; set; }

        public string KeyWord { get; set; }
    }
}
