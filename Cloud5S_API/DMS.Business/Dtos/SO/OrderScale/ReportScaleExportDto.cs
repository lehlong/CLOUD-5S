using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class ReportScaleExportDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Khu vực")]
        public string Area { get; internal set; }

        [Description("Biển số xe")]
        public string Vehicle { get; set; }
        [Description("Tên khách hàng")]
        public string PartnerName { get; set; }

        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("TL lần 1")]
        public double Weight1 { get; set; }

        [Description("TL lần 2")]
        public double Weight2 { get; set; }

        [Description("TL Hàng")]
        public double Weight { get; set; }


        [Description("Ngày cân vào")]
        public string dateScalein { get; set; }

        [Description("Giờ cân")]
        public string timeweightin { get; set; }
        [Description("Ngày cân ra")]
        public string dateScaleout { get; set; }
        [Description("Giờ cân")]
        public string timeweightout { get; set; }
        
    }
}
