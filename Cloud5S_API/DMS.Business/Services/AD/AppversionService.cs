using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.AD
{
    public interface IAppVersionService : IGenericService<tblAdAppVersion, tblAppVersionDto>
    {
        Task<tblAppVersionDto> GetCurrentVersion();
    }
    public class AppVersionService : GenericService<tblAdAppVersion, tblAppVersionDto>, IAppVersionService
    {
        public AppVersionService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblAppVersionDto> GetCurrentVersion()
        {
            var data = await _dbContext.tblAdAppVersion.OrderByDescending(x => x.VersionCode).FirstOrDefaultAsync();

            return _mapper.Map<tblAppVersionDto>(data);
        }
    }
}
