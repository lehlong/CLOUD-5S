using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IStockService : IGenericService<tblMdStock, tblStockDto>
    {
        Task<PagedResponseDto> Search(StockFilter filter);
        Task<IList<tblStockDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(StockFilterLite filter);
    }
    public class StockService : GenericService<tblMdStock, tblStockDto>, IStockService
    {
        public StockService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(StockFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdStock
                    .Include(x => x.Company)
                    .AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord) 
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.CompanyCode))
                {
                    query = query.Where(x => x.CompanyCode.Contains(filter.CompanyCode));
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderByDescending(x => x.CreateDate);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblStockDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdStock.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderByDescending(x => x.CreateDate);
                return _mapper.Map<IList<tblStockDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(StockFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblMdStock
                    .Include(x => x.Company)
                    .AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord) 
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.CompanyCode))
                {
                    query = query.Where(x => x.CompanyCode.Contains(filter.CompanyCode));
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblStockExportDto()
                {
                    OrdinalNumber = i + 1,
                    Code = x.Code,
                    IsActive = x.IsActive,
                    Name = x.Name,
                    CompanyName = x.Company.Name
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_KHO);

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
