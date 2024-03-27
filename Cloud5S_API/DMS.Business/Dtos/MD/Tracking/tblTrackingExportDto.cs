using System.ComponentModel;
using DocumentFormat.OpenXml.Drawing.Diagrams;

namespace DMS.BUSINESS.Dtos.MD.Tracking
{
    public class tblTrackingExportDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Id")]
        public Guid Id { get; set; }

        [Description("Biển số xe")]
        public string Vehicle { get; set; }

        [Description("Mã phiếu trộn")]
        public string OrderCode { get; set; }

        [Description("Thời gian gửi")]
        public string SentTime { get; set; }

        [Description("ListObject")]
        public List<TrackingDataExportDto> TrackingDatas { get; set; }
    }
}
