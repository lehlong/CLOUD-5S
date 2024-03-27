using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Stock
{
    public interface IStockItemTransferLogService : IGenericService<tblBuStockItemTransferLog, tblBuStockItemTransferLogDto>
    {
        Task<PagedResponseDto> Search(StockItemTransferLogFilter filter);
    }

    public class StockItemTransferLogService : GenericService<tblBuStockItemTransferLog, tblBuStockItemTransferLogDto>, IStockItemTransferLogService
    {
        public StockItemTransferLogService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
        public  Task<PagedResponseDto> Search(StockItemTransferLogFilter filter)
        {
            var query = _dbContext.tblBuStockItemTransferLog
                .Include(x => x.Company)
                .Include(x => x.Item)
                .Include(x => x.Area)
                .Include(x => x.Unit)
                .Include(x => x.Stock)
                .Include(x => x.FromPourLine)
                .Include(x => x.FromPourSection)
                .Include(x => x.ToPourLine)
                .Include(x => x.ToPourSection)
                
                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.StockCode)
                         || x.StockCode == filter.StockCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Company.Name.Contains(filter.KeyWord))
                .Where(x => filter.FromDate == null
                         || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                .OrderByDescending(x => x.CreateDate);
            return base.Paging(query, filter);
        }
    }
}
