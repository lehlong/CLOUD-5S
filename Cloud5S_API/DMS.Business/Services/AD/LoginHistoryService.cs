using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.AD
{
    public interface ILoginHistoryService : IGenericService<tblAdLoginHistory, tblLoginHistoryDto>
    {
        Task<PagedResponseDto> Search(LoginHistoryFilter filter);
    }
    public class LoginHistoryService : GenericService<tblAdLoginHistory, tblLoginHistoryDto>, ILoginHistoryService
    {
        public LoginHistoryService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public Task<PagedResponseDto> Search(LoginHistoryFilter filter)
        {
            var data = _dbContext.tblAdLoginHistory
                .Where(x => filter.FromDate == null || x.CreateDate >= filter.FromDate)
                .Where(x => filter.ToDate == null || x.CreateDate <= filter.ToDate);

            return base.Paging(data, filter);
        }
    }
}
