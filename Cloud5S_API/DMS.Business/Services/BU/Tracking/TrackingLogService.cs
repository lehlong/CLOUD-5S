using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Tracking
{
    public interface ITrackingLogService : IGenericService<tblBuTrackingLog, tblTrackingLogDto>
    {
        Task<List<tblTrackingLogDto>> GetByOrder(string OrderCode);
    }
    public class TrackingLogService : GenericService<tblBuTrackingLog, tblTrackingLogDto>, ITrackingLogService
    {
        public TrackingLogService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<List<tblTrackingLogDto>> GetByOrder(string OrderCode)
        {
            var data = await _dbContext.tblBuTrackingLog.Where(x => x.OrderCode == OrderCode).ToListAsync();

            return _mapper.Map<List<tblTrackingLogDto>>(data);
        }
    }
}
