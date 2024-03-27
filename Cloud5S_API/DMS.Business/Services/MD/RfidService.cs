using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IRfidService : IGenericService<tblMdRfid, tblRfidDto>
    {
        Task<IList<tblRfidDto>> GetAll(BaseMdFilter filter);
        Task<byte[]> Export(BaseExportFilter filter);

    }
    public class RfidService : GenericService<tblMdRfid, tblRfidDto>, IRfidService
    {
        private readonly IHubContext<RefreshServiceHub> _hubContext;
        public RfidService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdRfid
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.VehicleCode.Contains(filter.KeyWord)
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

        public async Task<IList<tblRfidDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdRfid
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))
                .AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderByDescending(x => x.CreateDate);
                return _mapper.Map<IList<tblRfidDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblRfidDto> GetById(object id)
        {
            try
            {
                var data = await this._dbContext.tblMdRfid
                .FirstOrDefaultAsync(x => x.Code == (string)id);

                return _mapper.Map<tblRfidDto>(data);
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
                var query = this._dbContext.tblMdRfid
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.VehicleCode.Contains(filter.KeyWord)
                    );
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblRfidDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x?.IsActive,
                    Code = x?.Code,
                    VehicleCode = x?.VehicleCode,
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DS_RFID);

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
