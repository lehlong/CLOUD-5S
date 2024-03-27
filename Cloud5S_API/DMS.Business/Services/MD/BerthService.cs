using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IBerthService : IGenericService<tblMdBerth, tblBerthDto>
    {
        Task<IList<tblBerthDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(BaseExportFilter filter);
    }
    public class BerthService : GenericService<tblMdBerth, tblBerthDto>, IBerthService
    {
        public BerthService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdBerth.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
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

        public override async Task<tblBerthDto> GetById(object id)
        {
            var data = await this._dbContext.tblMdBerth.FirstOrDefaultAsync(x => x.Code == (string)id);

            return _mapper.Map<tblBerthDto>(data);
        }

        public async Task<IList<tblBerthDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdBerth.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderByDescending(x => x.CreateDate);
                return _mapper.Map<IList<tblBerthDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(BaseExportFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdBerth.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblBerthDto()
                {
                    OrdinalNumber = i + 1,
                    Code = x.Code,
                    IsActive = x.IsActive,
                    Name = x.Name
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_CAU_CANG);

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
