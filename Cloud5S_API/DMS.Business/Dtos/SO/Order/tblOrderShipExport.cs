using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderShipExportDto
    {
        public string Ship { get; set; }

        public double TotalWeight { get => ColData.Sum(x => x.Weight); }

        public int TotalVehicle { get => ColData.Sum(x => x.Vehicle); }

        public double GMTPerVehicle { get => TotalVehicle != 0 ? TotalWeight / TotalVehicle : 0; }

        public List<tblCargoOrderBaseDto> ColData
        {
            get => RowData.SelectMany(x => x.Shift)
                .SelectMany(x => x.Tunel)
                .GroupBy(x => new { x.Tunel, x.Bridge })
                .Select(x => new tblCargoOrderBaseDto
                {
                    Tunel = x.Key.Tunel,
                    Bridge = x.Key.Bridge,
                    Vehicle = x.Sum(y => y.Vehicle),
                    Weight = x.Sum(y => y.Weight)
                }).OrderBy(x=>x.Tunel).ToList();
        }

        public List<tblCargoOrderDateDto> RowData { get; set; }

        public tblOrderShipExportDto(List<tblCargoOrderDateDto> rowData, string ship)
        {
            RowData = rowData;
            Ship = ship;
        }
    }

    public class tblCargoOrderDateDto
    {
        public DateTime Date { get; set; }

        [JsonIgnore]
        public double TotalWeight { get => Shift.Sum(x => x.TotalWeight); }

        [JsonIgnore]
        public int TotalVehicle { get => Shift.Sum(x => x.TotalVehicle); }

        public List<tblCargoOrderShiftDto> Shift
        {
            get => Shift0To6
            .Concat(Shift6To12)
            .Concat(Shift12To18)
            .Concat(Shift18To24)
                .GroupBy(x => x.Time).Select(x => new tblCargoOrderShiftDto()
                {
                    Time = x.Key,
                    Tunel = x.SelectMany(y => y.Tunel)
                    .GroupBy(y => new { y.Tunel, y.Bridge })
                    .Select(y => new tblCargoOrderBaseDto()
                    {
                        Bridge = y.Key.Bridge,
                        Tunel = y.Key.Tunel,
                        Vehicle = y.Sum(z => z.Vehicle),
                        Weight = y.Sum(z => z.Weight),
                    }).OrderBy(x => x.Name).ToList()
                }).OrderBy(x => x.Time)
            .ToList();
        }
        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift0To6 { get; set; }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift1
        {
            get => Shift0To6
                .GroupBy(x => x.Time).Select(x => new tblCargoOrderShiftDto()
                {
                    Time = x.Key,
                    Tunel = x.SelectMany(y => y.Tunel)
                    .GroupBy(y => new { y.Tunel, y.Bridge })
                    .Select(y => new tblCargoOrderBaseDto()
                    {
                        Bridge = y.Key.Bridge,
                        Tunel = y.Key.Tunel,
                        Vehicle = y.Sum(z => z.Vehicle),
                        Weight = y.Sum(z => z.Weight),
                    }).OrderBy(x => x.Name).ToList()
                }).OrderBy(x => x.Time)
            .ToList();
        }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift6To12 { get; set; }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift2
        {
            get => Shift6To12
                .GroupBy(x => x.Time).Select(x => new tblCargoOrderShiftDto()
                {
                    Time = x.Key,
                    Tunel = x.SelectMany(y => y.Tunel)
                    .GroupBy(y => new { y.Tunel, y.Bridge })
                    .Select(y => new tblCargoOrderBaseDto()
                    {
                        Bridge = y.Key.Bridge,
                        Tunel = y.Key.Tunel,
                        Vehicle = y.Sum(z => z.Vehicle),
                        Weight = y.Sum(z => z.Weight),
                    }).OrderBy(x => x.Name).ToList()
                }).OrderBy(x => x.Time)
            .ToList();
        }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift12To18 { get; set; }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift3
        {
            get => Shift12To18
                .GroupBy(x => x.Time).Select(x => new tblCargoOrderShiftDto()
                {
                    Time = x.Key,
                    Tunel = x.SelectMany(y => y.Tunel)
                    .GroupBy(y => new { y.Tunel, y.Bridge })
                    .Select(y => new tblCargoOrderBaseDto()
                    {
                        Bridge = y.Key.Bridge,
                        Tunel = y.Key.Tunel,
                        Vehicle = y.Sum(z => z.Vehicle),
                        Weight = y.Sum(z => z.Weight),
                    }).OrderBy(x => x.Name).ToList()
                }).OrderBy(x => x.Time)
            .ToList();
        }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift18To24 { get; set; }

        [JsonIgnore]
        public List<tblCargoOrderShiftDto> Shift4
        {
            get => Shift18To24
                .GroupBy(x => x.Time).Select(x => new tblCargoOrderShiftDto()
                {
                    Time = x.Key,
                    Tunel = x.SelectMany(y => y.Tunel)
                    .GroupBy(y => new { y.Tunel, y.Bridge })
                    .Select(y => new tblCargoOrderBaseDto()
                    {
                        Bridge = y.Key.Bridge,
                        Tunel = y.Key.Tunel,
                        Vehicle = y.Sum(z => z.Vehicle),
                        Weight = y.Sum(z => z.Weight),
                    }).OrderBy(x => x.Name).ToList()
                }).OrderBy(x => x.Time)
            .ToList();
        }
    }

    public class tblCargoOrderShiftDto
    {
        public string Time { get; set; }

        public double TotalWeight { get => Tunel.Sum(x => x.Weight); }

        public int TotalVehicle { get => Tunel.Sum(x => x.Vehicle); }

        public double GMTPerVehicle { get => TotalVehicle != 0 ? TotalWeight / TotalVehicle : 0; }

        public List<tblCargoOrderBaseDto> Tunel { get; set; }
    }

    public class tblCargoOrderBaseDto
    {
        [JsonIgnore]
        public int Tunel { get; set; }

        public string Name { get => $"Hầm {Tunel}"; }

        public string Bridge { get; set; }

        public double Weight { get; set; }

        public int Vehicle { get; set; }
    }

    public class tblCargoOrderTmpDto
    {
        public DateTime GetOffTime { get; set; }

        public double Weight { get; set; }

        public string Vehicle { get; set; }

        public string Bridge { get; set; }

        public int Tunel { get; set; }
    }
}
