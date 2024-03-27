namespace DMS.BUSINESS.Filter.MD
{
    public class TrackingFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string VehicleCode { get; set; }
        public string PartnerCode { get; set; }
        public string OrderCode { get; set; }
        public List<string> State { get; set; }
        public string BatchCode { get; set; }
        public string CompanyCode { get; set; }
    }
}
