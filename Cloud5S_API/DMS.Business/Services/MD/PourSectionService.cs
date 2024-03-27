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
    public interface IPourSectionService : IGenericService<tblMdPourSection, tblPourSectionDto>
    {
        Task<IList<tblPourSectionDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(BaseExportFilter filter);
    }
    public class PourSectionService : GenericService<tblMdPourSection, tblPourSectionDto>, IPourSectionService
    {
        public PourSectionService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdPourSection.AsQueryable();
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
                query = query.OrderBy(x => x.Name);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblPourSectionDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdPourSection.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Name);
                return _mapper.Map<IList<tblPourSectionDto>>(await query.ToListAsync());
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
                var query = this._dbContext.tblMdPourSection.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                    x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblPourSectionDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x.IsActive,
                    Name = x.Name,
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_KHU_DO_HANG);

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
