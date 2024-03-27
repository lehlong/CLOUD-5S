using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class OrderScaleExportDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Biển số xe")]
        public string Vehicle { get; set; }

        [Description("Tên khách hàng")]
        public string PartnerName { get; set; }

        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("TL 1")]
        public double Weight1 { get; set; }

        [Description("TL 2")]
        public double Weight2 { get; set; }


        [Description("Trọng lượng hàng")]
        public double Weight { get; set; }

        [Description("Ngày cân vào")]
        public string dateWeight1 { get; set; }

        [Description("Giờ cân")]
        public string timeWeightin { get; set; }

        [Description("Ngày cân ra")]
        public string dateWeight2 { get; set; }

        [Description("Giờ cân ")]
        public string timeWeightout { get; set; }

    }
}
