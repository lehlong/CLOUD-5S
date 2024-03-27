using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Stock
{
    public interface IStockItemHistoryService : IGenericService<tblBuStockItemHistory, tblStockItemHistoryDto>
    {
        Task<PagedResponseDto> Search(StockItemHistoryFilter filter);
        Task SyntheticData(DateTime? FromDate);
        Task<byte[]> Export(StockItemHistoryExportFilter filter);
    }
    public class StockItemHistoryService : GenericService<tblBuStockItemHistory, tblStockItemHistoryDto>, IStockItemHistoryService
    {
        public StockItemHistoryService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(StockItemHistoryFilter filter)
        {
            try
            {
                var raw_query = _dbContext.tblBuStockItemHistory.Include(x => x.Item).Include(x => x.Stock).AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    raw_query = raw_query.Where(x => x.Item.Name.Contains(filter.KeyWord));
                }

                if (!string.IsNullOrWhiteSpace(filter.ItemType))
                {
                    raw_query = raw_query.Where(x => x.Item.TypeCode == filter.ItemType);
                }

                if (!string.IsNullOrWhiteSpace(filter.StockCode))
                {
                    raw_query = raw_query.Where(x => x.StockCode == filter.StockCode);
                }

                if (filter.FromDate != null)
                {
                    raw_query = raw_query.Where(x => x.ProcessDate.Date >= filter.FromDate.Value.Date);
                }

                if (filter.ToDate != null)
                {
                    raw_query = raw_query.Where(x => x.ProcessDate.Date <= filter.ToDate.Value.Date);
                }

                var query = raw_query.GroupBy(x => new
                {
                    x.ItemCode,
                    x.StockCode,
                    ItemName = x.Item.Name,
                    StockName = x.Stock.Name
                }).Select(x => new tblStockItemHistoryExportDto()
                {
                    ItemCode = x.Key.ItemCode,
                    StockCode = x.Key.StockCode,
                    ItemName = x.Key.ItemName,
                    StockName = x.Key.StockName,
                    ExportAmount = x.Sum(y => y.ExportAmount),
                    ImportAmount = x.Sum(y => y.ImportAmount),
                    FirstAmount = x.OrderBy(y => y.ProcessDate).FirstOrDefault().PrevAmount ?? 0,
                    LastAmount = x.OrderByDescending(y => y.ProcessDate).FirstOrDefault().Amount ?? 0
                });


                var pagedResponseDto = new PagedResponseDto
                {
                    TotalRecord = await query.CountAsync(),
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize
                };
                pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
                var result = await query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
                pagedResponseDto.Data = result;

                return pagedResponseDto;
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(StockItemHistoryExportFilter filter)
        {
            try
            {
                var raw_data = _dbContext.tblBuStockItemHistory.Include(x => x.Item).Include(x => x.Stock).AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    raw_data = raw_data.Where(x => x.Item.Name.Contains(filter.KeyWord));
                }

                if (!string.IsNullOrWhiteSpace(filter.ItemType))
                {
                    raw_data = raw_data.Where(x => x.Item.TypeCode == filter.ItemType);
                }

                if (!string.IsNullOrWhiteSpace(filter.ItemType))
                {
                    raw_data = raw_data.Where(x => x.Item.TypeCode == filter.ItemType);
                }

                if (!string.IsNullOrWhiteSpace(filter.StockCode))
                {
                    raw_data = raw_data.Where(x => x.StockCode == filter.StockCode);
                }

                if (filter.FromDate != null)
                {
                    raw_data = raw_data.Where(x => x.ProcessDate.Date >= filter.FromDate.Value.Date);
                }

                if (filter.ToDate != null)
                {
                    raw_data = raw_data.Where(x => x.ProcessDate.Date <= filter.ToDate.Value.Date);
                }

                var data = await raw_data.ToListAsync();

                var result = data.GroupBy(x => new
                {
                    x.ItemCode,
                    x.StockCode,
                    ItemName = x.Item.Name,
                    StockName = x.Stock.Name
                }).Select((x, i) => new tblStockItemHistoryExportDto()
                {
                    OrdinalNumber = i + 1,
                    ItemCode = x.Key.ItemCode,
                    StockCode = x.Key.StockCode,
                    ItemName = x.Key.ItemName,
                    StockName = x.Key.StockName,
                    ExportAmount = x.Sum(y => y.ExportAmount),
                    ImportAmount = x.Sum(y => y.ImportAmount),
                    FirstAmount = x.OrderBy(y => y.ProcessDate).FirstOrDefault().PrevAmount ?? 0,
                    LastAmount = x.OrderByDescending(y => y.ProcessDate).FirstOrDefault().Amount ?? 0
                }).ToList();

                return await new ExcelExporter(_dbContext).ExportToExcel(result, ExcelExportType.XUAT_NHAP_TON);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task SyntheticData(DateTime? FromDate)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();
            var items = await _dbContext.tblMdItem.Where(x => x.Code == defaultValue.DefaultIngredientItemCode || x.Code == defaultValue.DefaultProductItemCode)
                    .ToListAsync();

            var stocks = await _dbContext.tblMdStock.ToListAsync();

            var workingshifts = await _dbContext.tblMdWorkingShift.ToListAsync();

            foreach (var day in Utils.LoopDay(FromDate ?? DateTime.Now, DateTime.Now))
            {
                foreach (var shift in workingshifts)
                {
                    var import = _dbContext.tblBuStockImport.Include(x => x.Order).ThenInclude(x => x.OrderDetails).Where(x => x.ItemCode == defaultValue.DefaultIngredientItemCode || x.ItemCode == defaultValue.DefaultProductItemCode)
                        .Where(x => x.ImportDate.Value.Date == day.Date && x.ShiftCode == shift.Code);

                    foreach (var i in import.Where(x => x.Order != null))
                    {
                        i.Amount = i.Order.OrderDetails.Sum(x => x.OrderNumber);
                    }

                    _dbContext.UpdateRange(import);

                    var importData = await import
                                .GroupBy(x => new { x.ItemCode, x.StockCode, x.ShiftCode })
                                .Select(x => new
                                {
                                    x.Key.ItemCode,
                                    Amount = x.Sum(y => y.Amount),
                                    x.Key.StockCode,
                                    x.Key.ShiftCode
                                }).ToListAsync();

                    var export = await _dbContext.tblBuStockExport.Include(x => x.Order).ThenInclude(x => x.OrderDetails).Where(x => x.ItemCode == defaultValue.DefaultIngredientItemCode || x.ItemCode == defaultValue.DefaultProductItemCode)
                        .Where(x => x.ExportDate.Value.Date == day.Date && x.ShiftCode == shift.Code).ToListAsync();

                    foreach (var e in export.Where(x => x.Order != null))
                    {
                        e.Amount = e.Order.OrderDetails.Sum(x => x.OrderNumber);
                    }

                    _dbContext.UpdateRange(export);

                    var exportData = export
                    .GroupBy(x => new { x.ItemCode, x.StockCode, x.ShiftCode })
                    .Select(x => new
                    {
                        x.Key.ItemCode,
                        Amount = x.Sum(y => y.Amount),
                        x.Key.StockCode,
                        x.Key.ShiftCode
                    }).ToList();

                    var prevData = await _dbContext.tblBuStockItemHistory.Where(x => x.ItemCode == defaultValue.DefaultIngredientItemCode || x.ItemCode == defaultValue.DefaultProductItemCode)
                        .Where(x => SqlServerDbFunctionsExtensions.DateTimeFromParts(null, x.ProcessDate.Year, x.ProcessDate.Month, x.ProcessDate.Day, shift.FromHour.Hours, shift.FromHour.Minutes, shift.FromHour.Seconds, shift.FromHour.Milliseconds) <= (day.Date + shift.FromHour))
                                  .OrderByDescending(x => x.ProcessDate).ThenByDescending(x => x.WorkingShiftCode)
                                  .ToListAsync();

                    var histories = await _dbContext.tblBuStockItemHistory.Where(x => x.ItemCode == defaultValue.DefaultIngredientItemCode || x.ItemCode == defaultValue.DefaultProductItemCode)
                        .Where(x => x.ProcessDate.Date == day.Date && x.WorkingShiftCode == shift.Code).ToListAsync();

                    foreach (var item in items)
                    {
                        foreach (var stockCode in stocks.Select(x => x.Code))
                        {
                            var importNumber = importData.FirstOrDefault(x => x.ItemCode == item.Code && x.Amount != 0 && x.StockCode == stockCode && x.ShiftCode == shift.Code)?.Amount ?? 0;

                            var exportNumber = exportData.FirstOrDefault(x => x.ItemCode == item.Code && x.Amount != 0 && x.StockCode == stockCode && x.ShiftCode == shift.Code)?.Amount ?? 0;

                            var prevNumber = prevData.FirstOrDefault(x => x.ItemCode == item.Code && x.Amount != 0 && x.StockCode == stockCode)?.Amount ?? 0;

                            if (prevNumber == 0 && (prevNumber + importNumber - exportNumber == 0)) continue;

                            var history = histories.FirstOrDefault(x => x.WorkingShiftCode == shift.Code && x.ItemCode == item.Code && x.Amount != 0 && x.StockCode == stockCode);

                            if (history == null)
                            {
                                var processDate7H = day.Date;
                                var shiftCode7H = shift.Code;

                                if (shift.Code == "C4")
                                {
                                    shiftCode7H = "C3";
                                    processDate7H = day.Date.AddDays(-1);
                                }

                                histories.Add(new tblBuStockItemHistory()
                                {
                                    ItemCode = item.Code,
                                    Amount = prevNumber + importNumber - exportNumber,
                                    StockCode = stockCode,
                                    ExportAmount = exportNumber,
                                    ImportAmount = importNumber,
                                    ProcessDate = day.Date,
                                    PrevAmount = prevNumber,
                                    WorkingShiftCode = shift.Code,
                                    ProcessDate7H = processDate7H,
                                    WorkingShiftCode7H = shiftCode7H
                                });
                            }
                            else
                            {
                                history.ImportAmount = importNumber;
                                history.ExportAmount = exportNumber;
                                history.Amount = prevNumber + importNumber - exportNumber;
                                history.PrevAmount = prevNumber;
                            }
                        }
                    }
                    _dbContext.UpdateRange(histories);
                    await _dbContext.SaveChangesAsync();
                }
            };
        }
    }
}
