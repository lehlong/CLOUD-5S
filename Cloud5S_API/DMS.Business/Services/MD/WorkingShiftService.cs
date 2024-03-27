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
    public interface IWorkingShiftService : IGenericService<tblMdWorkingShift, tblWorkingShiftDto>
    {
        Task<IList<tblWorkingShiftDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(BaseExportFilter filter);
    }
    public class WorkingShiftService : GenericService<tblMdWorkingShift, tblWorkingShiftDto>, IWorkingShiftService
    {
        public WorkingShiftService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdWorkingShift.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Description.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.OrdinalNumber);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblWorkingShiftDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdWorkingShift.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.OrdinalNumber);
                return _mapper.Map<IList<tblWorkingShiftDto>>(await query.ToListAsync());
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
                var query = this._dbContext.tblMdWorkingShift.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Description.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderBy(x => x.OrdinalNumber);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblWorkingShiftDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x.IsActive,
                    Name = x.Name,
                    Description = x.Description,
                    FromHour = x.FromHour,
                    ToHour = x.ToHour,
                    Code = x.Code,
                    StrFromHour = x.FromHour.ToString(@"hh\:mm\:ss"),
                    StrToHour = x.ToHour.ToString(@"hh\:mm\:ss"),
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.CA_LAM_VIEC);

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
