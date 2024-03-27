using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.BU
{
    public class ExportDailyFrom0HDto
    {
        public double? BeginGMT { get; set; }

        public double? BeginBDT { get; set; }

        public List<ExportDailyFrom0HBaseDto> DataInMonth { get; set; }
    }

    public class ExportDailyFrom0HBaseDto
    {
        public List<ExportDailyFrom0HPartnerDto> PartnerReceipts { get; set; }

        public double? TotalPartnerNumber { get => PartnerReceipts?.Sum(x => x?.PartnerNumber); }

        [JsonIgnore]
        public List<ExportDailyFrom0HShiftDto> ShiftImportBDTs { get; set; }

        [JsonIgnore]
        public List<ExportDailyFrom0HShiftDto> ShiftExportGMTs { get; set; }


        public double? Shift1Value { get => ShiftExportGMTs?.Where(x => x.ShiftCode == "C1")?.Sum(x => x.ShiftNumber); }

        public double? Shift2Value { get => ShiftExportGMTs?.Where(x => x.ShiftCode == "C2")?.Sum(x => x.ShiftNumber); }

        public double? Shift3Value { get => ShiftExportGMTs?.Where(x => x.ShiftCode == "C3" || x.ShiftCode == "C4")?.Sum(x => x.ShiftNumber); }

        public double? TotalShiftGMT { get => Shift1Value + Shift2Value + Shift3Value; }

        public double? TotalShiftBDT { get => ShiftImportBDTs?.Sum(x => x?.ShiftNumber); }

        public double? StockBDT { get; set; }

        public double? StockGMT { get; set; }

        public DateTime OrderDate { get; set; }
    }

    public class ExportDailyFrom0HPartnerDto
    {
        public string PartnerCode { get; set; }

        public string PartnerName { get; set; }

        public double? PartnerNumber { get; set; }
    }

    public class ExportDailyFrom0HShiftDto
    {
        public string ShiftCode { get; set; }

        public string ShiftName { get; set; }

        public double? ShiftNumber { get; set; }
    }
}
