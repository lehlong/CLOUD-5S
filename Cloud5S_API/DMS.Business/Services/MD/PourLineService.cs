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
using System.Text.RegularExpressions;

namespace DMS.BUSINESS.Services.MD
{
    public interface IPourLineService : IGenericService<tblMdPourLine, tblPourLineDto>
    {
        Task<PagedResponseDto> Search(PourLineFilter filter);
        Task<IList<tblPourLineDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(PourLineFilter filter);
    }
    public class PourLineService : GenericService<tblMdPourLine, tblPourLineDto>, IPourLineService
    {
        public PourLineService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(PourLineFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdPourLine
                .Where(x=>string.IsNullOrWhiteSpace(filter.SectionCode) || x.SectionCode == filter.SectionCode)
                .Include(x=>x.PourSection)
                .AsQueryable();
                
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                    x.Name.Contains(filter.KeyWord) ||
                        x.Code.Contains(filter.KeyWord)
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

 
       public async Task<IList<tblPourLineDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdPourLine.Include(x => x.PourSection).AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                var result = await query.ToListAsync();

                
                result = result.OrderBy(x => int.TryParse(Regex.Match(x.Name, @"\d+").Value, out var number) ? number : int.MaxValue).ToList();

                return _mapper.Map<IList<tblPourLineDto>>(result);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }


        public async Task<byte[]> Export(PourLineFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdPourLine.Where(x => string.IsNullOrWhiteSpace(filter.SectionCode) || x.SectionCode == filter.SectionCode).Include(x => x.PourSection).AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                    x.Name.Contains(filter.KeyWord) ||
                        x.Code.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblPourLineDto()
                {
                    OrdinalNumber = i + 1,
                    Code = x.Code,
                    IsActive = x.IsActive,
                    SectionCode = x.SectionCode,
                    Name = x.Name,
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_DAY_DO_HANG);

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
