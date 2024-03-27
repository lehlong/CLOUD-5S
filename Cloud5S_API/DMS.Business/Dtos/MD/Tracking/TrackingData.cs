namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class TrackingData
    {
        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public double? Heading { get; set; }

        public double? Speed { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}
