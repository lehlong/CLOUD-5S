using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.AD
{
    public interface IActionLogService : IGenericService<tblAdActionLog, ActionLogDto>
    {

    }
    public class ActionLogService : GenericService<tblAdActionLog, ActionLogDto>, IActionLogService
    {
        public ActionLogService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override Task<ActionLogDto> Add(IDto dto)
        {
           return base.Add(dto);
        }
    }
}
