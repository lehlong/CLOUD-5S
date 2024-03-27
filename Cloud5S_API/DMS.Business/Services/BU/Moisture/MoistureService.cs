using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.SO;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Moisture
{
    public interface IMoistureService : IGenericService<tblBuMoisture,tblMoistureDto>
    {
        Task BatchUpdate(List<tblMoistureCreateUpdateDto> models);
        Task<byte[]> Export(BaseExportFilter filter);

        Task<byte[]> ExportReportMoistureExcel(OrderExportByDayFilter filter);
    }

    public class MoistureService : GenericService<tblBuMoisture, tblMoistureDto>, IMoistureService
    {
        public MoistureService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task BatchUpdate(List<tblMoistureCreateUpdateDto> models)
        {
            try
            {
                var obj = _mapper.Map<List<tblBuMoisture>>(models);

                _dbContext.UpdateRange(obj);

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Exception = ex;
                this.Status = false;
            }
        }

        public async Task<byte[]> Export(BaseExportFilter filter)
        {
            try
            {
                var query = this._dbContext.tblBuMoisture.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.OrderCode.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new MoistureExcelDto()
                {
                    OrdinalNumber = i + 1,
                    OrderCode = x.OrderCode,
                    ProcessBy = x.ProcessBy,
                    TrayWeight = x.TrayWeight,
                    TrayWetWeight = x.TrayWetWeight,
                    WetWeight = x.WetWeight,
                    TrayDryWeight = x.TrayDryWeight,
                    DryWeight = x.DryWeight,
                    Moisture = x.Moisture,
                    Remark = x.Remark,
                    Note = x.Note,
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_DO_AM);

                return result;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> ExportReportMoistureExcel(OrderExportByDayFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblSoOrder
                   .IgnoreQueryFilters()
                    .Include(x => x.Moisture)
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Creator)
                    .Include(x => x.Scale)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Vehicle)

                    .Include(x => x.OrderProcesses)

                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))

                .Where(x => filter.FromDate == null
                         || x.OrderDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.OrderDate.Value.Date <= filter.ToDate.Value.Date)
                .Where(x => filter.AreaCode == null || filter.AreaCode == x.Area.Code)

                .OrderBy(x => x.AreaCode)
                .ThenByDescending(x => x.OrderDate).ToListAsync();

                List<tblSoOrder> data2 = new List<tblSoOrder>();

                for (int i = 0; i < raw_data.Count; i++)
                {
                    if (raw_data[i].Moisture?.TrayWeight == null ||
                        raw_data[i].Moisture?.TrayWetWeight == null ||
                        raw_data[i].Moisture?.TrayDryWeight == null ||
                        raw_data[i].Moisture?.DryWeight == null ||
                        raw_data[i].Moisture?.WetWeight == null ||
                        raw_data[i].Moisture?.Moisture == null
                        ) continue;

                    else data2.Add(raw_data[i]);
                }

                var data = data2.Select((x, i) => new MoistureExportByAreaExcelDto
                {
                    Date = DateOnly.FromDateTime(x.OrderDate ?? DateTime.Now).ToString("dd/MM/yyyy"),
                    OrdinalNumber = i + 1,
                    trayWeight = x.Moisture?.TrayWeight,
                    trayWetWeight = x.Moisture?.TrayWetWeight,
                    trayDryWeight = x.Moisture?.TrayDryWeight,
                    dryWeight = x.Moisture?.DryWeight,
                    wetWeight = x.Moisture?.WetWeight,
                    Moisture = x.Moisture?.Moisture,
                    remark = x.Moisture?.Remark,
                    AreaName = x.Area.Name,
                    AreaCode = x.Area.Code,
                    VehicleCode = x.VehicleCode,
                    ProcessBy = x.Moisture?.ProcessBy,

                }).ToList();


                data = data.OrderBy(x => x.AreaCode).ToList();
                var groupedData = data.GroupBy(x => x.AreaCode).ToList();
                var newData = new List<MoistureExportByAreaExcelDto>();

                var grandTotalTrayWeight = groupedData.Sum(group => group.Sum(x => x.trayWeight ?? 0.0));
                var grandTotalTrayWetWeight = groupedData.Sum(group => group.Sum(x => x.trayWetWeight ?? 0.0));
                var grandTotalTrayDryWeight = groupedData.Sum(group => group.Sum(x => x.trayDryWeight ?? 0.0));
                var grandTotalWetWeight = groupedData.Sum(group => group.Sum(x => x.wetWeight ?? 0.0));
                var grandTotalDryWeight = groupedData.Sum(group => group.Sum(x => x.dryWeight ?? 0.0));
                double grandTotalMoisture = 0;

                foreach (var group in groupedData)
                {
                    newData.AddRange(group);
                    var totalTrayWeight = group.Sum(x => x.trayWeight ?? 0.0);
                    var totalTrayWetWeight = group.Sum(x => x.trayWetWeight ?? 0.0);
                    var totalTrayDryWeight = group.Sum(x => x.trayDryWeight ?? 0.0);
                    var totalWetWeight = group.Sum(x => x.wetWeight ?? 0.0);
                    var totalDryWeight = group.Sum(x => x.dryWeight ?? 0.0);
                    var totalMoisture = group.Sum(x => x.Moisture ?? 0.0) / group.Count();
                    totalMoisture = Math.Round(totalMoisture, 2);
                    var areaCode = group.Key;
                    var areaName = group.First().AreaName;
                    newData.Add(new MoistureExportByAreaExcelDto
                    {
                        Date = "",
                        ProcessBy = "Tổng",
                        AreaCode = areaCode,
                        AreaName = areaName,
                        trayWeight = totalTrayWeight,
                        trayWetWeight = totalTrayWetWeight,
                        trayDryWeight = totalTrayDryWeight,
                        wetWeight = totalWetWeight,
                        dryWeight = totalDryWeight,
                        Moisture = totalMoisture
                    });
                    grandTotalMoisture += totalMoisture;
                }
                newData.Add(new MoistureExportByAreaExcelDto
                {
                    Date = "",
                    ProcessBy = "Tổng",
                    trayWeight = grandTotalTrayWeight,
                    trayWetWeight = grandTotalTrayWetWeight,
                    trayDryWeight = grandTotalTrayDryWeight,
                    wetWeight = grandTotalWetWeight,
                    dryWeight = grandTotalDryWeight,
                    Moisture = (groupedData.Count == 0) ? 0 : grandTotalMoisture / groupedData.Count
            });
                var result = ReportExcelExporter.ExportToExcelReportMoisture(newData, $"BÁO CÁO ĐỘ ẨM");
                return result;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
    }
}
