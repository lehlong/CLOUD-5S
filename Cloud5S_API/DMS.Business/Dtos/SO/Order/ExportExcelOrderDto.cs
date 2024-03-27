using DocumentFormat.OpenXml.Wordprocessing;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class ExportExcelOrderDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Nhà máy")]
        public string CompanyName { get; set; }

        [Description("Mã phiếu")]
        public string Code { get; set; }

        [Description("Mã phiếu cân")]
        public string ScaleCode { get; set; }

        [Description("Ngày giờ nhập")]
        public string OrderDate { get; set; }

        [Description("Biển số xe")]
        public string VehicleCode { get; set; }

        [Description("Nhà cung cấp")]
        public string PartnerName { get; set; }

        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("Khu vực")]
        public string AreaName { get; set; }

        [Description("Khối lượng hàng")]
        public double? WeightScale { get; set; }

        [Description("Đơn vị tính")]
        public string UnitName { get; set; }

        [Description("Trạng thái")]
        public string State { get; set; }

        [Description("Thanh toán")]
        public string IsPaid { get; set; }
    }

    public class ExportCellExcelOrderDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Nhà máy")]
        public string CompanyName { get; set; }

        [Description("Mã phiếu")]
        public string Code { get; set; }

        [Description("Mã phiếu cân")]
        public string ScaleCode { get; set; }

        [Description("Mã đợt xuất hàng")]
        public string OrderBatchCode { get; set; }

        [Description("Ngày giờ xuất")]
        public string OrderDate { get; set; }

        [Description("Biển số xe")]
        public string VehicleCode { get; set; }

        [Description("Khách hàng")]
        public string PartnerName { get; set; }

        [Description("Sản phẩm")]
        public string ItemName { get; set; }

        [Description("Khối lượng hàng")]
        public double? WeightScale { get; set; }

        [Description("Đơn vị tính")]
        public string UnitName { get; set; }

        [Description("Trạng thái")]
        public string State { get; set; }
    }

    public class MoistureExportByAreaExcelDto
    {
        [Description("STT")]
        public int? OrdinalNumber { get; set; }
        [Description("Ngày nhập")]
        public string Date { get; set; }

        [Description("Thực hiện bởi")]
        public string ProcessBy { get; set; }

        [Description("Biển số xe")]
        public string VehicleCode { get; set; }

        [Description("Tên khu vực")]
        public string AreaName { get; set; }
        [Description("Mã khu vực")]
        public string AreaCode { get; set; }

        [Description("Trọng lượng khay")]
        public double? trayWeight { get; set; }

        [Description("Trọng lượng khay + gỗ tươi")]
        public double? trayWetWeight { get; set; }

        [Description("Trọng lượng gỗ tươi")]
        public double? wetWeight { get; set; }

        [Description("Trọng lượng khay + gỗ khô")]
        public double? trayDryWeight { get; set; }

        [Description("Trọng lượng gỗ khô")]
        public double? dryWeight { get; set; }

        [Description("Độ ẩm trung bình")]
        public double? Moisture { get; set; }

        [Description("Đánh giá")]
        public string remark { get; set; }
    }
}
