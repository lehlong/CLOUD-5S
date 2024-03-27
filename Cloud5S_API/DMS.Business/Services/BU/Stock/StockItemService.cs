using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace DMS.BUSINESS.Services.BU.Stock
{
    public interface IStockItemService : IGenericService<tblBuStockItem, tblStockItemDto>
    {
        Task<List<tblStockItemDto>> Search(StockItemFilter filter);
        Task<byte[]> Export(StockItemExportFilter filter);
        Task<ExportDailyFrom0HDto> ExportDailyFrom0H(DateTime FromDate, DateTime ToDate);
        Task<byte[]> ExportDailyFrom0HDownload(DateTime fromDate, DateTime ToDate);
        Task<ExportDailyFrom7H> ExportDailyFrom7H(DateTime fromDate, DateTime toDate);
        Task<byte[]> ExportDailyFrom7HDownload(DateTime fromDate, DateTime ToDate);
    }
    public class StockItemService : GenericService<tblBuStockItem, tblStockItemDto>, IStockItemService
    {
        public StockItemService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<byte[]> Export(StockItemExportFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblBuStockItem
                    .Include(x => x.Stock)
                    .Include(x => x.Item)

                     .ThenInclude(x => x.Unit)
                    .Include(x => x.Item)
                        .ThenInclude(x => x.ItemType)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                            || x.ItemCode.Contains(filter.KeyWord))
                    .Where(x => filter.StockCode == null || x.StockCode == filter.StockCode)
                    .Where(x => filter.ItemType == null || x.Item.ItemType.Code == filter.ItemType)
                    .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                    .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date).ToListAsync();
                var data = raw_data.Select((x, i) => new tblStockItemExportDto()
                {
                    OrdinalNumber = i + 1,
                    ItemType = x?.Item?.ItemType?.Name ?? string.Empty,
                    Amount = x?.Amount ?? 0,
                    ItemCode = x?.ItemCode ?? string.Empty,
                    ItemName = x?.Item?.Name ?? string.Empty,
                    StockName = x?.Stock?.Name ?? string.Empty,
                    Unit = x?.Item?.Unit?.Name ?? string.Empty,
                }).ToList();

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.TON_KHO);
                return result;
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<List<tblStockItemDto>> Search(StockItemFilter filter)
        {
            try
            {

                var query = _dbContext.tblBuStockItem
                    .Include(x => x.Stock)
                     .Include(x => x.Company)
                    .Include(x => x.Item)
                     .ThenInclude(x => x.Unit)
                    .Include(x => x.Item)
                        .ThenInclude(x => x.ItemType)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                            || x.ItemCode.Contains(filter.KeyWord))
                    .Where(x => filter.StockCode == null || x.StockCode == filter.StockCode)
                    .Where(x => filter.ItemType == null || x.Item.ItemType.Code == filter.ItemType)
                    .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                    .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                    .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.StockCode)
                        || x.StockCode == filter.StockCode);


                return _mapper.Map<List<tblStockItemDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> ExportDailyFrom0HDownload(DateTime fromDate, DateTime ToDate)
        {
            var data = await ExportDailyFrom0H(fromDate, ToDate);

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(ToDate.ToShortDateString());

            #region Header
            int row = 1;
            worksheet.Cells[row, 1].Value = $"LOG RECEIPT & CONSUMPTION IN {ToDate:MMM - yyyy} HÒA NHƠN";
            worksheet.Cells[row, 1].Style.Font.Bold = true;
            worksheet.Cells[row, 1].Style.Font.Size = 26;
            row++;

            worksheet.Cells["A3:A4"].Merge = true;

            worksheet.Cells["A3"].Value = "Ngày";
            worksheet.Cells["A3"].Style.Font.Bold = true;
            worksheet.Cells["A3"].Style.Font.Size = 12;

            int col = 2;
            foreach (var item in data.DataInMonth.Where(x => x.PartnerReceipts != null).SelectMany(x => x?.PartnerReceipts)?.Select(x => x?.PartnerName)?.Distinct())
            {
                worksheet.Cells[5, col].Value = item;
                worksheet.Cells[5, col].Style.Font.Bold = true;
                worksheet.Cells[5, col].Style.Font.Size = 12;
                col++;
            }
            var partnerCol = col - 1;

            if (col > 2)
            {
                worksheet.Cells[3, 2, 3, col].Merge = true;
                worksheet.Cells[4, 2, 4, col - 1].Merge = true;
            }

            worksheet.Cells[3, 2].Value = "NHẬP HÀNG";
            worksheet.Cells[3, 2].Style.Font.Bold = true;
            worksheet.Cells[3, 2].Style.Font.Size = 14;
            worksheet.Cells[3, 2].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[3, 2].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(0, 204, 255));

            worksheet.Cells[4, 2].Value = "HÒA NHƠN";
            worksheet.Cells[4, 2].Style.Font.Bold = true;
            worksheet.Cells[4, 2].Style.Font.Size = 12;
            worksheet.Cells[4, col].Value = "Tổng cộng";
            worksheet.Cells[4, col].Style.Font.Bold = true;
            worksheet.Cells[4, col].Style.Font.Size = 12;

            worksheet.Cells[3, col + 1, 3, col + 5].Merge = true;
            worksheet.Cells[3, col + 1].Value = "Sản xuất(GMT)";
            worksheet.Cells[3, col + 1].Style.Font.Bold = true;
            worksheet.Cells[3, col + 1].Style.Font.Size = 14;
            worksheet.Cells[3, col + 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[3, col + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(255, 255, 0));

            worksheet.Cells[4, col + 1, 4, col + 3].Merge = true;
            worksheet.Cells[4, col + 1].Value = "HÒA NHƠN";
            worksheet.Cells[4, col + 1].Style.Font.Bold = true;
            worksheet.Cells[4, col + 1].Style.Font.Size = 12;

            worksheet.Cells[4, col + 4, 4, col + 5].Merge = true;
            worksheet.Cells[4, col + 4].Value = "Total";
            worksheet.Cells[4, col + 4].Style.Font.Bold = true;
            worksheet.Cells[4, col + 4].Style.Font.Size = 12;

            worksheet.Cells[5, col + 1].Value = "Ca 1";
            worksheet.Cells[5, col + 1].Style.Font.Bold = true;
            worksheet.Cells[5, col + 1].Style.Font.Size = 12;
            worksheet.Cells[5, col + 2].Value = "Ca 2";
            worksheet.Cells[5, col + 2].Style.Font.Bold = true;
            worksheet.Cells[5, col + 2].Style.Font.Size = 12;
            worksheet.Cells[5, col + 3].Value = "Ca 3";
            worksheet.Cells[5, col + 3].Style.Font.Bold = true;
            worksheet.Cells[5, col + 3].Style.Font.Size = 12;
            worksheet.Cells[5, col + 4].Value = "GMT";
            worksheet.Cells[5, col + 4].Style.Font.Bold = true;
            worksheet.Cells[5, col + 4].Style.Font.Size = 12;
            worksheet.Cells[5, col + 5].Value = "BDT";
            worksheet.Cells[5, col + 5].Style.Font.Bold = true;
            worksheet.Cells[5, col + 5].Style.Font.Size = 12;

            worksheet.Cells[3, col + 6, 3, col + 7].Merge = true;
            worksheet.Cells[3, col + 6].Value = "Tồn kho";
            worksheet.Cells[3, col + 6].Style.Font.Bold = true;
            worksheet.Cells[3, col + 6].Style.Font.Size = 14;
            worksheet.Cells[3, col + 6].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[3, col + 6].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(153, 204, 0));

            worksheet.Cells[4, col + 6, 4, col + 7].Merge = true;
            worksheet.Cells[4, col + 6].Value = "HÒA NHƠN";
            worksheet.Cells[4, col + 6].Style.Font.Bold = true;
            worksheet.Cells[4, col + 6].Style.Font.Size = 12;

            worksheet.Cells[5, col + 6].Value = "GMT";
            worksheet.Cells[5, col + 6].Style.Font.Bold = true;
            worksheet.Cells[5, col + 6].Style.Font.Size = 12;

            worksheet.Cells[5, col + 7].Value = "BDT";
            worksheet.Cells[5, col + 7].Style.Font.Bold = true;
            worksheet.Cells[5, col + 7].Style.Font.Size = 12;
            worksheet.Cells[3, 1, 5, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[3, 1, 5, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            #endregion

            #region GenerateData
            row = 6;
            col = col + 7;
            worksheet.Cells[row, 1].Value = "Tồn đầu kỳ";
            worksheet.Cells[row, 1].Style.Font.Bold = true;
            worksheet.Cells[row, 1].Style.Font.Size = 12;
            worksheet.Cells[row, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Cells[row, col - 1].Value = data?.BeginGMT ?? 0;
            worksheet.Cells[row, col].Value = data?.BeginBDT ?? 0;

            row++;
            foreach (var item in data?.DataInMonth)
            {
                col = 1;
                worksheet.Cells[row, col].Value = item?.OrderDate.Day;
                worksheet.Cells[row, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[row, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                col++;
                if (item.PartnerReceipts != null)
                {
                    foreach (var partner in item?.PartnerReceipts)
                    {
                        worksheet.Cells[row, col].Value = partner?.PartnerNumber ?? 0;
                        col++;
                    }
                }
                col = partnerCol + 1;

                worksheet.Cells[row, col].Value = item.TotalPartnerNumber ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.Shift1Value ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.Shift2Value ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.Shift3Value ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.TotalShiftGMT ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.TotalShiftBDT ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.StockGMT ?? 0;
                col++;
                worksheet.Cells[row, col].Value = item.StockBDT ?? 0;

                row++;
            }
            #endregion
            return await package.GetAsByteArrayAsync();
        }

        public async Task<ExportDailyFrom0HDto> ExportDailyFrom0H(DateTime fromDate, DateTime toDate)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();
            var orders = await _dbContext.tblSoOrder.Include(x => x.Partner)
                .Where(x => x.Type == OrderType.NHAP_HANG.ToString())
                .Include(x => x.Imports)
                .Include(x => x.Imports).ThenInclude(x => x.WorkingShift)
                .Include(x => x.Exports)
                .Include(x => x.Exports).ThenInclude(x => x.WorkingShift)
                .Include(x=>x.OrderDetails)
                .Where(x=>x.OrderDetails.Any(y=>y.ItemCode == defaultValue.DefaultIngredientItemCode))
                .Where(x => x.OrderDate.Value.Date >= fromDate.Date)
                .Where(x => x.OrderDate.Value.Date <= toDate.Date).ToListAsync();

            var exports = await _dbContext.tblBuStockExport.Include(x => x.WorkingShift).Where(x => x.ExportDate.Value.Date >= fromDate.Date)
                .Where(x => x.ExportDate.Value.Date <= toDate.Date).ToListAsync();
            var imports = await _dbContext.tblBuStockImport.Include(x => x.WorkingShift).Where(x => x.ImportDate.Value.Date >= fromDate.Date)
               .Where(x => x.ImportDate.Value.Date <= toDate.Date).ToListAsync();

            var listDate = new List<DateTime>();

            foreach (var item in Utils.LoopDay(fromDate, toDate))
            {
                listDate.Add(item);
            }

            var data = listDate.GroupBy(x => x.Date)
                .Select(x => new ExportDailyFrom0HBaseDto
                {
                    OrderDate = x.Key,
                    PartnerReceipts = orders.Where(z => z.OrderDate.Value.Date == x.Key).GroupBy(y => new { y.PartnerCode, y.Partner.Name }).Select(y => new ExportDailyFrom0HPartnerDto()
                    {
                        PartnerCode = y.Key.PartnerCode,
                        PartnerName = y.Key.Name,
                        PartnerNumber = y.SelectMany(z => z.Imports).Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount)
                    }).ToList(),
                    ShiftImportBDTs = imports.Where(y => y.ImportDate.Value.Date == x.Key).GroupBy(y => new { y.ShiftCode, y.WorkingShift.Name }).Select(y => new ExportDailyFrom0HShiftDto()
                    {
                        ShiftCode = y.Key.ShiftCode,
                        ShiftName = y.Key.Name,
                        ShiftNumber = y.Where(z => z.ItemCode == defaultValue.DefaultProductItemCode).Sum(z => z.Amount),
                    }).ToList(),
                    ShiftExportGMTs = exports.Where(y => y.ExportDate.Value.Date == x.Key).GroupBy(y => new { y.ShiftCode, y.WorkingShift.Name }).Select(y => new ExportDailyFrom0HShiftDto()
                    {
                        ShiftCode = y.Key.ShiftCode,
                        ShiftName = y.Key.Name,
                        ShiftNumber = y.Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount),
                    }).ToList(),
                }).ToList();

            var beginGMT = await _dbContext.tblBuStockItemHistory
            .Where(y => y.ProcessDate.Date < fromDate.Date)
            .OrderByDescending(y => y.ProcessDate.Date)
            .FirstOrDefaultAsync(y => y.ItemCode == defaultValue.DefaultIngredientItemCode && y.StockCode == defaultValue.DefaultIngredientStock);

            var beginBDT = await _dbContext.tblBuStockItemHistory
            .Where(y => y.ProcessDate.Date < fromDate.Date)
            .OrderByDescending(y => y.ProcessDate.Date)
            .FirstOrDefaultAsync(y => y.ItemCode == defaultValue.DefaultProductItemCode && y.StockCode == defaultValue.DefaultProductStock);

            for (int i = 0; i < data.Count; i++)
            {
                if (i == 0)
                {
                    data[i].StockGMT = beginGMT?.Amount + data[i].TotalPartnerNumber - data[i].TotalShiftGMT;
                    data[i].StockBDT = beginBDT?.Amount + data[i].TotalShiftBDT;
                }
                else
                {
                    data[i].StockBDT = data[i - 1].StockBDT + data[i].TotalShiftBDT;
                    data[i].StockGMT = data[i - 1].StockGMT + data[i].TotalPartnerNumber - data[i].TotalShiftGMT;
                }
            }

            foreach (var day in Utils.LoopDay(fromDate, toDate))
            {
                if (!data.Any(x => x.OrderDate.Date == day.Date))
                {
                    data.Add(new ExportDailyFrom0HBaseDto()
                    {
                        OrderDate = day,
                    });
                }
            }

            return new ExportDailyFrom0HDto()
            {
                DataInMonth = data.OrderBy(x => x.OrderDate).ToList(),
                BeginGMT = beginGMT?.Amount,
                BeginBDT = beginBDT?.Amount,
            };
        }

        public async Task<ExportDailyFrom7H> ExportDailyFrom7H(DateTime fromDate, DateTime toDate)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            var fromDateConvert = fromDate.Date.AddHours(7);
            var toDateConvert = toDate.Date.AddDays(1).AddHours(6).AddMinutes(59).AddSeconds(59);

            var defaulValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            var raw_partnerData = await _dbContext.tblSoOrder
              .Include(x => x.Partner)
              .Include(x => x.Imports)
              .Include(x => x.OrderDetails)
              .Where(x => x.Type == OrderType.NHAP_HANG.ToString())
              .Where(x => x.OrderDate >= fromDateConvert)
              .Where(x => x.OrderDate <= toDateConvert)
              .Where(x => x.OrderDetails.Any(y => y.ItemCode == defaultValue.DefaultIngredientItemCode))
              .ToListAsync();

            var partnerData = raw_partnerData
              .GroupBy(x => new { OrderDate = x.OrderDate.Value.AddHours(-7).Date, x.PartnerCode, x.Partner.Name })
              .Select(x => new ExportDailyFrom7HPartnerDto()
              {
                  OrderDate = x.Key.OrderDate,
                  PartnerCode = x.Key.PartnerCode,
                  PartnerName = x.Key.Name,
                  Shift1Number = x.SelectMany(z => z.Imports).Where(z => z.ShiftCode7H == "C1").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
                  Shift2Number = x.SelectMany(z => z.Imports).Where(z => z.ShiftCode7H == "C2").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
                  Shift3Number = x.SelectMany(z => z.Imports).Where(z => z.ShiftCode7H == "C3").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
              }).ToList();

            var raw_consumptionData = await _dbContext.tblBuStockExport
                .Where(x => x.ExportDate7H >= fromDate.Date)
                .Where(x => x.ExportDate7H <= toDate.Date).ToListAsync();

            var consumptionData = raw_consumptionData
                .GroupBy(x => x.ExportDate7H.Value.Date)
                .Select(x => new ExportDailyFrom7HProcessDto()
                {
                    OrderDate = x.Key,
                    Shift1Number = x.Where(z => z.ShiftCode7H == "C1").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
                    Shift2Number = x.Where(z => z.ShiftCode7H == "C2").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
                    Shift3Number = x.Where(z => z.ShiftCode7H == "C3").Where(z => z.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(z => z.Amount ?? 0),
                }).ToList();

            var raw_dischargeData = await _dbContext.tblBuStockImportDetail.Include(x => x.Import)
              .Where(x => x.Import.ItemCode == defaulValue.DefaultIngredientItemCode)
              .Where(x => x.Import.StockCode == defaulValue.DefaultIngredientStock)
              .Where(x => x.Import.ImportDate >= fromDateConvert)
              .Where(x => x.Import.ImportDate <= toDateConvert)
              .OrderBy(x => x.Import.ImportDate).ToListAsync();

            var dischargeData = raw_dischargeData
              .GroupBy(x => x.Import.ImportDate.Value.AddHours(-7).Date)
              .Select(x => new ExportDailyFrom7HProcessDto()
              {
                  OrderDate = x.Key,
                  Shift1Number = x.Where(z => z.Import.ShiftCode7H == "C1").Sum(z => z.Amount ?? 0),
                  Shift2Number = x.Where(z => z.Import.ShiftCode7H == "C2").Sum(z => z.Amount ?? 0),
                  Shift3Number = x.Where(z => z.Import.ShiftCode7H == "C3").Sum(z => z.Amount ?? 0),
              }).ToList();

            var raw_consumptionProductData = await _dbContext.tblBuStockImport
                .Where(x => x.ItemCode == defaultValue.DefaultProductItemCode)
                .Where(x => x.ImportDate >= fromDateConvert)
                .Where(x => x.ImportDate <= toDateConvert).ToListAsync();

            var consumptionProductData = raw_consumptionProductData
              .GroupBy(x => x.ImportDate.Value.AddHours(-7).Date)
              .Select(x => new
              {
                  OrderDate = x.Key,
                  BDTNumber = x.Where(z => z.ItemCode == defaultValue.DefaultProductItemCode).Sum(z => z.Amount ?? 0),
              }).ToList();

            var listDate = new List<DateTime>();

            foreach (var date in Utils.LoopDay(fromDate, toDate))
            {
                listDate.Add(date);
            }

            var data = (from day in listDate
                        join p in partnerData
                        on day.Date equals p.OrderDate.Date into parters
                        from partner in parters.DefaultIfEmpty()
                        join c in consumptionData
                        on day.Date equals c.OrderDate.Date into consumptions
                        from consumption in consumptions.DefaultIfEmpty()
                        join d in dischargeData
                        on day.Date equals d.OrderDate.Date into discharges
                        from discharge in discharges.DefaultIfEmpty()
                        join cs in consumptionProductData
                        on day.Date equals cs.OrderDate.Date into consumptionProducts
                        from consumptionProduct in consumptionProducts.DefaultIfEmpty()
                        select new
                        {
                            OrderDate = day,
                            partner?.Shift1Number,
                            partner?.Shift2Number,
                            partner?.Shift3Number,
                            partner?.PartnerCode,
                            partner?.PartnerName,
                            ConsumptionShift1 = consumption?.Shift1Number,
                            ConsumptionShift2 = consumption?.Shift2Number,
                            ConsumptionShift3 = consumption?.Shift3Number,
                            DischargeShift1 = discharge?.Shift1Number,
                            DischargeShift2 = discharge?.Shift2Number,
                            DischargeShift3 = discharge?.Shift3Number,
                            BDTNumber = consumptionProduct?.BDTNumber
                        }).GroupBy(x => new
                        {
                            x.OrderDate,
                            x.ConsumptionShift1,
                            x.ConsumptionShift2,
                            x.ConsumptionShift3,
                            x.DischargeShift1,
                            x.DischargeShift2,
                            x.DischargeShift3,
                            x.BDTNumber
                        }).Select(x => new ExportDailyFrom7HDto()
                        {
                            ConsumptionShift1Number = x.Key.ConsumptionShift1 ?? 0,
                            ConsumptionShift2Number = x.Key.ConsumptionShift2 ?? 0,
                            ConsumptionShift3Number = x.Key.ConsumptionShift3 ?? 0,
                            DischargeShift1Number = x.Key.DischargeShift1 ?? 0,
                            DischargeShift2Number = x.Key.DischargeShift2 ?? 0,
                            DischargeShift3Number = x.Key.DischargeShift3 ?? 0,
                            OrderDate = x.Key.OrderDate,
                            InventoryBDT = x.Key.BDTNumber ?? 0,
                            PartnerNumber = x.Select(y => new ExportDailyFrom7HPartnerDto()
                            {
                                PartnerCode = y.PartnerCode,
                                PartnerName = y.PartnerName,
                                Shift1Number = y.Shift1Number ?? 0,
                                Shift2Number = y.Shift2Number ?? 0,
                                Shift3Number = y.Shift3Number ?? 0
                            }).ToList()
                        }).ToList();

            var beginGMT = await _dbContext.tblBuStockItemHistory
                  .Where(y => y.ProcessDate7H.Date < fromDateConvert.Date)
                  .OrderByDescending(y => y.ProcessDate.Date)
                  .FirstOrDefaultAsync(y => y.ItemCode == defaultValue.DefaultIngredientItemCode && y.StockCode == defaultValue.DefaultIngredientStock);

            var beginBDT = await _dbContext.tblBuStockItemHistory
                  .Where(y => y.ProcessDate7H.Date < fromDateConvert.Date)
                  .OrderByDescending(y => y.ProcessDate.Date)
                  .FirstOrDefaultAsync(y => y.ItemCode == defaultValue.DefaultProductItemCode && y.StockCode == defaultValue.DefaultProductStock);

            for (int i = 0; i < data.Count; i++)
            {
                if (i == 0)
                {
                    data[i].InventoryLog = (beginGMT?.Amount ?? 0) + data[i].TotalPartnerNumber - data[i].ConsumptionTotalShiftNumber;
                    data[i].InventoryBDT = (beginBDT?.Amount ?? 0) + data[i].InventoryBDT;
                }
                else
                {
                    data[i].InventoryLog = data[i - 1].InventoryLog + data[i].TotalPartnerNumber - data[i].ConsumptionTotalShiftNumber;
                    data[i].InventoryBDT = data[i - 1].InventoryBDT + data[i].InventoryBDT;
                }
            }

            var result = new ExportDailyFrom7H()
            {
                DataInMonth = data.OrderBy(x => x.OrderDate).ToList(),
                BeginGMT = beginGMT?.Amount,
                BeginBDT = beginBDT?.Amount,
            };
            return result;
        }

        public async Task<byte[]> ExportDailyFrom7HDownload(DateTime fromDate, DateTime toDate)
        {
            var result = await ExportDailyFrom7H(fromDate, toDate);

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(toDate.ToShortDateString());

            var partners = result.DataInMonth.SelectMany(x => x.PartnerNumber).Select(x => x.PartnerCode).Distinct();

            var totalPartner = partners.Count();
            var totalCol = (totalPartner * 4) + 12;

            int row = 2;
            int col = 1;

            #region Header

            worksheet.Cells[row, col].Value = $"LOG RECEIPT & CONSUMPTION IN {toDate:MMM - yyyy} HÒA NHƠN";
            worksheet.Cells[row, col, row, totalCol].Merge = true;
            worksheet.Cells[row, col, row, totalCol].Style.Font.Bold = true;
            worksheet.Cells[row, col].Style.Font.Size = 16;

            row++;
            row++;

            worksheet.Cells[row, col].Value = "Date";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;
            col++;

            worksheet.Cells[row, col].Value = "Receipt";
            worksheet.Cells[row, col, row, (totalPartner * 4) + 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            row++;

            worksheet.Cells[row, col].Value = "Shift 1";
            worksheet.Cells[row, col, row, col + totalPartner - 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(255, 255, 0));

            col += totalPartner;

            worksheet.Cells[row, col].Value = "Shift 2";
            worksheet.Cells[row, col, row, col + totalPartner - 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(146, 208, 80));

            col += totalPartner;

            worksheet.Cells[row, col].Value = "Shift 3";
            worksheet.Cells[row, col, row, col + totalPartner - 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(247, 150, 70));

            col += totalPartner;

            worksheet.Cells[row, col].Value = "Total 1, 2, 3";
            worksheet.Cells[row, col, row, col + totalPartner - 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
            worksheet.Cells[row, col, row, col + totalPartner - 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(0, 112, 192));

            col += totalPartner;

            worksheet.Cells[row, col].Value = "Total";
            worksheet.Cells[row, col, row + 1, col].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;
            row--;

            worksheet.Cells[row, col].Value = "Consumption";
            worksheet.Cells[row, col, row + 1, col + 3].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            row++;
            row++;

            worksheet.Cells[row, col].Value = "Shift 1";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Shift 2";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Shift 3";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Total";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;
            row--;
            row--;

            worksheet.Cells[row, col].Value = "Discharge";
            worksheet.Cells[row, col, row + 1, col + 3].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            row++;
            row++;

            worksheet.Cells[row, col].Value = "Shift 1";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Shift 2";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Shift 3";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Total";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;
            row--;
            row--;

            worksheet.Cells[row, col].Value = "Inventory";
            worksheet.Cells[row, col, row + 1, col + 1].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            row++;
            row++;

            worksheet.Cells[row, col].Value = "Log";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col++;

            worksheet.Cells[row, col].Value = "Wood Chip (BDT)";
            worksheet.Cells[row, col].Style.Font.Size = 12;
            worksheet.Cells[row, col].Style.Font.Bold = true;

            col = 2;
            for (int i = 0; i < 4; i++)
            {
                foreach (var item in partners)
                {
                    worksheet.Cells[row, col].Value = item;
                    col++;
                }
            }

            worksheet.Cells[1, 1, 6, totalCol].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 6, totalCol].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            row++;
            #endregion

            #region GenerateData

            worksheet.Cells[row, totalCol - 1].Value = result.BeginGMT;
            worksheet.Cells[row, totalCol].Value = result.BeginBDT;
            row++;

            foreach (var item in result.DataInMonth)
            {
                col = 1;
                worksheet.Cells[row, col].Value = item.OrderDate.Day;
                col++;

                foreach (var partner in item.PartnerNumber)
                {
                    worksheet.Cells[row, col].Value = partner.Shift1Number;
                    worksheet.Cells[row, col + totalPartner].Value = partner.Shift2Number;
                    worksheet.Cells[row, col + totalPartner + totalPartner].Value = partner.Shift3Number;
                    worksheet.Cells[row, col + totalPartner + totalPartner + totalPartner].Value = partner.TotalNumber;
                    col++;
                }
                col = (totalPartner * 4) + 2;
                worksheet.Cells[row, col].Value = item.TotalPartnerNumber;
                col++;
                worksheet.Cells[row, col].Value = item.ConsumptionShift1Number;
                col++;
                worksheet.Cells[row, col].Value = item.ConsumptionShift2Number;
                col++;
                worksheet.Cells[row, col].Value = item.ConsumptionShift3Number;
                col++;
                worksheet.Cells[row, col].Value = item.ConsumptionTotalShiftNumber;
                col++;
                worksheet.Cells[row, col].Value = item.DischargeShift1Number;
                col++;
                worksheet.Cells[row, col].Value = item.DischargeShift2Number;
                col++;
                worksheet.Cells[row, col].Value = item.DischargeShift3Number;
                col++;
                worksheet.Cells[row, col].Value = item.DischargeTotalNumber;
                col++;
                worksheet.Cells[row, col].Value = item.InventoryLog;
                col++;
                worksheet.Cells[row, col].Value = item.InventoryBDT;
                row++;
            }

            #endregion

            return await package.GetAsByteArrayAsync();
        }
    }
}
