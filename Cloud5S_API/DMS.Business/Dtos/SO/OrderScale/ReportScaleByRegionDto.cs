using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class ReportScaleByRegionDto
    {

        [Description("Tên KV")]
        public string AreaName { get; internal set; }

        [Description("Ngày")]
        public string Date { get; set; }

        [Description("TL Hàng")]
        public double Weight { get; set; }


        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("Tỷ lệ")]
        public string Percent { get; set; }
    }
    public class ViewListReportScaleByRegionDto
    {
  
        [Description("Ngày")]
        public string Date { get; set; }

        [Description("Tổng")]
        public double? TotalWeight { get; set; }


        [Description("Danh sách")]
        public List<ReportScaleByRegionDto> ReportScaleByRegionDtos { get; set; }

    }
    public class TotalReportScaleByRegionDto
    {
        [Description("Danh sách hiển thị ")]
        public List<ViewListReportScaleByRegionDto> ViewListReportScaleByRegionDto { get; set; }
        [Description("Danh sách tổng cộng")]
        public List<TotalWeightAndPercent> TotalWegthAndPercent { get; set; }

        public string TotalAll{ get; set; }
    }
    public class TotalWeightAndPercent
    {
        [Description("Tên KV")]
        public string AreaName { get; internal set; }

        [Description("TL Hàng")]
        public string TotalWeight { get; set; }


        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("Tỷ lệ")]
        public string TotalPercent { get; set; }

    }

}
