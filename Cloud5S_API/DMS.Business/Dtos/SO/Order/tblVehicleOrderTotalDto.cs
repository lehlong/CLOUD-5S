namespace DMS.BUSINESS.Dtos.SO.Order
{

    public class tblVehicleOrderExport
    {
        public List<tblVehicleOrderTotal> OrderTotals { get; set; }

        public List<tblVehicleOrderTotalDto> TotalValues
        {
            get => OrderTotals.SelectMany(x => x.Data)
                .GroupBy(x => x.OrderDate.Date)
                .Select(x => new tblVehicleOrderTotalDto()
                {
                    OrderDate = x.Key,
                    Value0To6 = x.Sum(y => y.Value0To6),
                    Value12To18 = x.Sum(y => y.Value12To18),
                    Value18To24 = x.Sum(y => y.Value18To24),
                    Value6To12 = x.Sum(y => y.Value6To12),
                    Weight0To6 = x.Sum(y => y.Weight0To6),
                    Weight6To12 = x.Sum(y => y.Weight6To12),
                    Weight12To18 = x.Sum(y => y.Weight12To18),
                    Weight18To24 = x.Sum(y => y.Weight18To24),
                }).OrderBy(x => x.OrderDate).ToList();
        }

        public int TotalValue { get => TotalValues.Sum(x => x.Value0To6 + x.Value6To12 + x.Value12To18 + x.Value18To24); }

        public double TotalWeight { get => TotalValues.Sum(x => x.Weight0To6 + x.Weight6To12 + x.Weight12To18 + x.Weight18To24); }

        public double TotalAverage { get => Math.Round(TotalValue != 0 ? TotalWeight / TotalValue : 0, 2); }
    }


    public class tblVehicleOrderTotal
    {
        public int OrdinalNumber { get; set; }

        public string VehicleCode { get; set; }

        public List<tblVehicleOrderTotalDto> Data { get; set; }

        public int Total { get => Data.Sum(x => x.Value0To6 + x.Value6To12 + x.Value12To18 + x.Value18To24); }
        public double TotalWeight { get => Data.Sum(x => x.Weight0To6 + x.Weight6To12 + x.Weight12To18 + x.Weight18To24); }
    }

    public class tblVehicleOrderTotalDto
    {
        public DateTime OrderDate { get; set; }

        public int Value0To6 { get; set; }

        public int Value6To12 { get; set; }

        public int Value12To18 { get; set; }

        public int Value18To24 { get; set; }

        public double Weight0To6 { get; set; }

        public double Weight6To12 { get; set; }

        public double Weight12To18 { get; set; }

        public double Weight18To24 { get; set; }

        public double Average0To6 { get => Value0To6 != 0 ? Weight0To6 / Value0To6 : 0; }

        public double Average6To12 { get => Value6To12 != 0 ? Weight6To12 / Value6To12 : 0; }

        public double Average12To18 { get => Value12To18 != 0 ? Weight12To18 / Value12To18 : 0; }

        public double Average18To24 { get => Value18To24 != 0 ? Weight18To24 / Value18To24 : 0; }

    }
}
