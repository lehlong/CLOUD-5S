using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Stock
{
    public interface IStockItemDetailService : IGenericService<tblBuStockItemDetail, tblStockItemDetailDto>
    {
        Task<List<tblStockItemDetailDto>> Search(StockItemDetailFilter filter);
        Task<byte[]> Export(StockItemDetailFilter filter);
        Task TransferStock(tblStockItemDetailTransferDto model);
        Task<List<StockItemDetailPourDto>> GroupSearch(StockItemDetailFilter filter);
    }
    public class StockItemDetailService : GenericService<tblBuStockItemDetail, tblStockItemDetailDto>, IStockItemDetailService
    {
        public StockItemDetailService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
        public async Task<List<tblStockItemDetailDto>> Search(StockItemDetailFilter filter)
        {
            try
            {
                var deleteData = await _dbContext.tblBuStockItemDetail.Where(x => x.Amount == 0).ToListAsync();

                if (deleteData != null && deleteData.Any())
                {
                    _dbContext.tblBuStockItemDetail.RemoveRange(deleteData);
                    await _dbContext.SaveChangesAsync();
                }

                var query = _dbContext.tblBuStockItemDetail
                    .Include(x => x.Order)
                    .Include(x => x.Stock)
                    .Include(x => x.Company)
                    .Include(x => x.Item)
                    .Include(x => x.Area)
                    .Include(x => x.Unit)
                    .Include(x => x.PourLine)
                    .Include(x => x.PourSection)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                             || x.PourSection.Name.Contains(filter.KeyWord) ||
                             x.PourLine.Name.Contains(filter.KeyWord) ||
                             x.Item.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                              x.Area.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                               x.Stock.Name.ToLower().Contains(filter.KeyWord.ToLower())
                              )
                    .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)

                     .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                     .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.PourLineCode)
                         || x.PourLineCode == filter.PourLineCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.PourSectionCode)
                        || x.PourSectionCode == filter.PourSectionCode)
                        .Where(x => string.IsNullOrWhiteSpace(filter.StockCode)
                        || x.StockCode == filter.StockCode)
                     .Where(x => x.Amount != 0)

                    .OrderBy(x => x.PourSection.Name).ThenBy(p => p.PourLine.Name);

                return _mapper.Map<List<tblStockItemDetailDto>>(await query.ToListAsync());

            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<List<StockItemDetailPourDto>> GroupSearch(StockItemDetailFilter filter)
        {
            var data = await _dbContext.tblBuStockItemDetail
                                .Include(x => x.Stock)
                                .Include(x => x.Company)
                                .Include(x => x.Item)
                                .Include(x => x.Area)
                                .Include(x => x.Unit)
                                .Include(x => x.PourLine)
                                .Include(x => x.PourSection)
                                .Include(x => x.Company)
                                .Include(x=>x.Order)
                                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                                         || x.PourSection.Name.Contains(filter.KeyWord) ||
                                         x.PourLine.Name.Contains(filter.KeyWord) ||
                                         x.Item.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                                          x.Area.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                                           x.Stock.Name.ToLower().Contains(filter.KeyWord.ToLower())
                                          )
                                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                                     || x.ItemCode == filter.ItemCode)

                                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                                     || x.CompanyCode == filter.CompanyCode)
                                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                                     || x.AreaCode == filter.AreaCode)
                                .Where(x => string.IsNullOrWhiteSpace(filter.PourLineCode)
                                     || x.PourLineCode == filter.PourLineCode)
                                .Where(x => string.IsNullOrWhiteSpace(filter.PourSectionCode)
                                    || x.PourSectionCode == filter.PourSectionCode)
                                    .Where(x => string.IsNullOrWhiteSpace(filter.StockCode)
                                    || x.StockCode == filter.StockCode)
                .GroupBy(x => new { x.PourSection.Name, x.PourSectionCode, x.CompanyCode, CompanyName = x.Company.Name })
                             .Select(x => new StockItemDetailPourDto()
                             {
                                 PourSectionName = x.Key.Name,
                                 PourSectionCode = x.Key.PourSectionCode,
                                 CompanyCode = x.Key.CompanyCode,
                                 CompanyName = x.Key.CompanyName,
                                 PourLines = x.GroupBy(y => new { y.PourLine.Name, y.PourLineCode }).Select(y => new StockItemDetailLineDto()
                                 {
                                     PourLineName = y.Key.Name,
                                     PourLineCode = y.Key.PourLineCode,
                                     Items = y.GroupBy(z => new
                                     {
                                         AreaName = z.Area.Name,
                                         UnitName = z.Unit.Name,
                                         ItemName = z.Item.Name,
                                         ItemCode = z.ItemCode,
                                         AreaCode = z.AreaCode,
                                         UnitCode = z.UnitCode
                                     }).Select(z => new StockItemDetailItemDto()
                                     {
                                         AreaName = z.Key.AreaName,
                                         UnitName = z.Key.UnitName,
                                         ItemName = z.Key.ItemName,
                                         ItemCode = z.Key.ItemCode,
                                         AreaCode = z.Key.AreaCode,
                                         UnitCode = z.Key.UnitCode,
                                         Orders = z.Select(k => new StockItemDetailOrderDto()
                                         {
                                             Amount = k.Amount,
                                             OrderCode = k.OrderCode,
                                             OrderDate = k.Order.OrderDate,
                                             ShiftCode = k.Order.WorkingShiftCode,
                                             VehicleCode = k.Order.VehicleCode,
                                             ShiftName = k.Order.WorkingShift.Name
                                         }).ToList()
                                     }).OrderBy(x => x.ItemName).ToList()
                                 }).OrderBy(x => x.PourLineCode).ToList()
                             }).OrderByDescending(x => x.PourSectionCode).ToListAsync();

            return data;
        }

        public async Task<byte[]> Export(StockItemDetailFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuStockItemDetail
                    .Include(x => x.Stock)
                    .Include(x => x.Item)
                    .Include(x => x.Company)
                    .Include(x => x.Area)
                    .Include(x => x.Unit)
                    .Include(x => x.PourLine)
                    .Include(x => x.PourSection)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                             || x.PourSection.Name.Contains(filter.KeyWord) ||
                             x.PourLine.Name.Contains(filter.KeyWord) ||
                             x.Item.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                              x.Area.Name.ToLower().Contains(filter.KeyWord.ToLower()) ||
                               x.Stock.Name.ToLower().Contains(filter.KeyWord.ToLower()))
                    .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.PourLineCode)
                         || x.PourLineCode == filter.PourLineCode)
                     .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                     .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.PourSectionCode)
                        || x.PourSectionCode == filter.PourSectionCode)
                        .Where(x => string.IsNullOrWhiteSpace(filter.StockCode)
                        || x.StockCode == filter.StockCode)
                    .OrderByDescending(x => x.PourSectionCode);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblStockItemDetailExportDto()
                {
                    OrdinalNumber = i + 1,
                    CompanyName = x.Company?.Name,
                    AreaName = x.Area?.Name,
                    StockName = x.Stock?.Name,
                    PourSectionName = x.PourSection?.Name,
                    PourLineName = x.PourLine?.Name,
                    ItemName = x.Item?.Name,
                    Amount = x.Amount,
                    UnitName = x.Unit?.Name
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.BAO_CAO_TON_KHO);

                return result;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task TransferStock(tblStockItemDetailTransferDto model)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                var stocks = await _dbContext.tblBuStockItemDetail.ToListAsync();

                var stock = stocks.FirstOrDefault(x => x.CompanyCode == model.CompanyCode
                                && x.AreaCode == model.AreaCode
                                && x.PourSectionCode == model.PourSectionCode
                                && x.PourLineCode == model.PourLineCode
                                && x.ItemCode == model.ItemCode
                                && x.UnitCode == model.UnitCode
                                && x.OrderCode == model.OrderCode
                                && x.StockCode == defaultValue?.DefaultIngredientStock);

                if (stock == null || stock.Amount < model.TrasferAmount)
                {
                    this.Status = false;
                    this.MessageObject.Code = "3009";
                    return;
                }

                var logs = new List<tblBuStockItemTransferLog>();

                foreach (var item in model.ToStocks)
                {
                    var st = stocks.FirstOrDefault(x => x.CompanyCode == model.CompanyCode
                                && x.AreaCode == model.AreaCode
                                && x.PourSectionCode == item.PourSectionCode
                                && x.PourLineCode == item.PourLineCode
                                && x.ItemCode == model.ItemCode
                                && x.OrderCode == model.OrderCode
                                && x.UnitCode == model.UnitCode);

                    if (st == null)
                    {
                        stocks.Add(new tblBuStockItemDetail()
                        {
                            PourLineCode = item.PourLineCode,
                            PourSectionCode = item.PourSectionCode,
                            Amount = item.Amount,
                            AreaCode = model.AreaCode,
                            CompanyCode = model.CompanyCode,
                            ItemCode = model.ItemCode,
                            StockCode = defaultValue?.DefaultIngredientStock,
                            UnitCode = model.UnitCode,
                            OrderCode = model.OrderCode
                        });
                    }
                    else
                    {
                        st.Amount += item.Amount;
                    }
                    stock.Amount -= item.Amount;

                    logs.Add(new tblBuStockItemTransferLog()
                    {
                        Amount = item.Amount,
                        AreaCode = model.AreaCode,
                        CompanyCode = model.CompanyCode,
                        FromPourLineCode = model.PourLineCode,
                        FromPourSectionCode = model.PourSectionCode,
                        ToPourLineCode = item.PourLineCode,
                        ToPourSectionCode = item.PourSectionCode,
                        ItemCode = model.ItemCode,
                        UnitCode = model.UnitCode,
                        StockCode = defaultValue?.DefaultIngredientStock,
                        OrderCode = model.OrderCode
                    });
                }
                await _dbContext.tblBuStockItemTransferLog.AddRangeAsync(logs);
                _dbContext.UpdateRange(stocks);
                await _dbContext.SaveChangesAsync();
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
                return;
            }
        }
    }
}
