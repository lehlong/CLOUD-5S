namespace DMS.BUSINESS.Dtos.BU
{
    public class ExportDailyFrom7H
    {
        public double? BeginGMT { get; set; }

        public double? BeginBDT { get; set; }

        public List<ExportDailyFrom7HDto> DataInMonth { get; set; }
    }

    public class ExportDailyFrom7HDto
    {
        public DateTime OrderDate { get; set; }

        public List<ExportDailyFrom7HPartnerDto> PartnerNumber { get; set; }

        public double TotalPartnerNumber { get => PartnerNumber.Sum(x => x.TotalNumber); }

        public double ConsumptionShift1Number { get; set; }

        public double ConsumptionShift2Number { get; set; }

        public double ConsumptionShift3Number { get; set; }

        public double ConsumptionTotalShiftNumber { get => ConsumptionShift1Number + ConsumptionShift2Number + ConsumptionShift3Number; }

        public double DischargeShift1Number { get; set; }

        public double DischargeShift2Number { get; set; }

        public double DischargeShift3Number { get; set; }

        public double DischargeTotalNumber { get => DischargeShift1Number + DischargeShift2Number + DischargeShift3Number; }

        public double InventoryLog { get; set; }

        public double InventoryBDT { get; set; }
    }

    public class ExportDailyFrom7HPartnerDto
    {
        public DateTime OrderDate { get; set; }

        public string PartnerCode { get; set; }

        public string PartnerName { get; set; }

        public double Shift1Number { get; set; }

        public double Shift2Number { get; set; }

        public double Shift3Number { get; set; }

        public double TotalNumber { get => Shift1Number + Shift2Number + Shift3Number; }
    }

    public class ExportDailyFrom7HProcessDto
    {
        public DateTime OrderDate { get; set; }

        public double Shift1Number { get; set; }

        public double Shift2Number { get; set; }

        public double Shift3Number { get; set; }

        public double TotalNumber { get => Shift1Number + Shift2Number + Shift3Number; }
    }
}
