using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IDeviceService : IGenericService<tblMdDevice, tblDeviceDto>
    {
        Task<PagedResponseDto> Search(DeviceFilter filter);
        Task<IList<tblDeviceDto>> GetAll(BaseMdFilter filter);
    }
    public class DeviceService : GenericService<tblMdDevice, tblDeviceDto>, IDeviceService
    {
        public DeviceService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(DeviceFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdDevice.Include(x=>x.Group).Include(x => x.Type).AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord) ||
                        x.TypeCode.Contains(filter.KeyWord) ||
                        x.GroupCode.Contains(filter.KeyWord)
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.TypeCode))
                {
                    query = query.Where(x =>
                        x.TypeCode.Contains(filter.TypeCode)
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.GroupCode))
                {
                    query = query.Where(x =>
                        x.TypeCode.Contains(filter.GroupCode)
                    );
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblDeviceDto>> GetAll(BaseMdFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdDevice.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return _mapper.Map<IList<tblDeviceDto>>(await query.ToListAsync());
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
