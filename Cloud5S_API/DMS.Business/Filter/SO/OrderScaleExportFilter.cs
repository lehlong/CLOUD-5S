namespace DMS.BUSINESS.Filter.SO
{
    public class OrderScaleExportFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string PartnerName { get; set; }

        public string AreaCode { get; set; }
        public string KeyWord { get; set; }
        public string VehicleCode { get; set; }
        public bool Weight1 { get; set; } = false;
        public bool Weight2 { get; set; } = false;

        public bool? IsCanceled { get; set; }
    }
}
