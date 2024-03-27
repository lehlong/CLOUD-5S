using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.AD;
using DMS.CORE;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.AD
{
    public interface ISystemParameterService : IGenericService<tblAdSystemParameter, tblSystemParameterDto>
    {
        Task<tblSystemParameterDto> GetDetail();

        Task Update(tblSystemParameterDto systemParameterDto);
    }
    public class SystemParameterService : GenericService<tblAdSystemParameter, tblSystemParameterDto>, ISystemParameterService
    {
        public SystemParameterService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        

        public async Task<tblSystemParameterDto> GetDetail()
        {
            try
            {
                var systemParameter = await _dbContext.Set<tblAdSystemParameter>().FirstOrDefaultAsync();

                var systemParameterDto = _mapper.Map<tblSystemParameterDto>(systemParameter);

                return systemParameterDto;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task Update(tblSystemParameterDto systemParameterDto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var systemParameterInDB = await _dbContext.Set<tblAdSystemParameter>().FirstOrDefaultAsync();

                _mapper.Map(systemParameterDto, systemParameterInDB);

                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }
    }
}
