using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class tblTrackingCreateDto : IDto
    {
        public string OrderCode { get; set; }
        public TrackingCreateLocationDto Location { get; set; }

    }

    public class TrackingCreateLocationDto
    {
        public TrackingCreateCoordDto Coords { get; set; }
        public DateTime TimeStamp { get; set; }
    }

    public class TrackingCreateCoordDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Heading { get; set; }
        public double Speed { get; set; }
    }
}
