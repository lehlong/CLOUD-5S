namespace DMS.BUSINESS.Filter.SO
{
    public class OrderTrackingFilter
    {
        public string CompanyCode { get; set; }

        public string VehicleCode { get; set; }

        public string BatchCode { get; set; }

        public List<string> States { get; set; }

        public bool? HaveTrackingData { get; set; }
    }
}
