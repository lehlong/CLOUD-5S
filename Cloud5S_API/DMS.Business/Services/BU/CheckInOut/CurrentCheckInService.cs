using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Attachment;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace DMS.BUSINESS.Services.BU.CheckInOut
{
    public interface ICurrentCheckInService : IGenericService<tblBuCurrentCheckIn, tblCurrentCheckInDto>
    {
        Task<PagedResponseDto> Search(CurrentCheckInFilter filter);
    }
    public class CurrentCheckInService : GenericService<tblBuCurrentCheckIn, tblCurrentCheckInDto>, ICurrentCheckInService
    {
        private readonly AttachmentManager _attachmentManager;
        public CurrentCheckInService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
        {
            _attachmentManager = new AttachmentManager(dbContext, configuration);
        }

        public async Task<PagedResponseDto> Search(CurrentCheckInFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCurrentCheckIn.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.VehicleCode.Equals(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Id);
                return await Paging(query, filter);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }
    }
}
