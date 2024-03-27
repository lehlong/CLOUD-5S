namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class VehicleTracking
    {
        public List<VehicleTrackingDto> ActiveVehicle { get; set; }
        public List<VehicleTrackingDto> DeActiveVehicle { get; set; }
    }
    public class VehicleTrackingDto
    {
        public string Code { get; set; }
        public string DriverName { get; set; }
        public TrackingData TrackingData { get; set; }
    }

    public class LocationDto
    {
        public string Name { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }
    }
}
