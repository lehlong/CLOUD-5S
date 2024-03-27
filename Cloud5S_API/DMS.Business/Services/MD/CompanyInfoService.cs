using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.MD;
using DMS.CORE;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface ICompanyInfoService : IGenericService<tblMdCompanyInfo, tblCompanyInfoDto>
    {
        Task<tblCompanyInfoDto> GetDetail();

        Task Update(tblCompanyInfoDto companyInfoDto);
    }
    public class CompanyInfoService : GenericService<tblMdCompanyInfo, tblCompanyInfoDto>, ICompanyInfoService
    {
        public CompanyInfoService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblCompanyInfoDto> GetDetail()
        {
            try
            {
                var companyInfo = await _dbContext.Set<tblMdCompanyInfo>().FirstOrDefaultAsync();

                var companyInfoDto = _mapper.Map<tblCompanyInfoDto>(companyInfo);

                return companyInfoDto;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task Update(tblCompanyInfoDto companyInfoDto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var companyInfoInDB = await _dbContext.Set<tblMdCompanyInfo>().FirstOrDefaultAsync();

                _mapper.Map(companyInfoDto, companyInfoInDB);

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
