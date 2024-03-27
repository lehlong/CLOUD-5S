using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.BU
{
    public class CheckInOutExportDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Biển số xe")]
        public string Vehicle { get; set; }

        [Description("Thời gian vào")]
        public string CheckInTime { get; set; }

        [Description("Thời gian ra")]
        public string CheckOutTime { get; set; }
    }
}
