using System.ComponentModel;
using DocumentFormat.OpenXml.Drawing.Diagrams;

namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class TrackingDataExportDto
    {
        [Description("Latitude")]
        public double Latitude { get; set; }

        [Description("Longitude")]
        public double Longitude { get; set; }

        [Description("Heading")]
        public double? Heading { get; set; }

        [Description("Speed")]
        public double? Speed { get; set; }

        [Description("TimeStamp")]
        public string TimeStamp { get; set; }

    }
}
