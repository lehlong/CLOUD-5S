using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.MD;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IPartnerService : IGenericService<tblMdPartner, tblPartnerDto>
    {
        Task<PagedResponseDto> Search(PartnerFilter filter);
        Task<IList<tblPartnerDto>> GetAll(PartnerFilterLite filter);
        Task<byte[]> Export(PartnerFilterLite filter);
    }
    public class PartnerService : GenericService<tblMdPartner, tblPartnerDto>, IPartnerService
    {
        private readonly IHubContext<RefreshServiceHub> _hubContext;
        public PartnerService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public async Task<PagedResponseDto> Search(PartnerFilter filter)
        {
            var query = this._dbContext.tblMdPartner.AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.KeyWord))
            {
                query = query.Where(x =>
                    x.Code.Contains(filter.KeyWord) ||
                    x.Name.Contains(filter.KeyWord) ||
                    x.Address.Contains(filter.KeyWord) ||
                    x.PhoneNumber.Contains(filter.KeyWord) ||
                    x.Email.Contains(filter.KeyWord)
                );
            }
            if (filter.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == filter.IsActive);
            }
            if (filter.IsCustomer.HasValue)
            {
                query = query.Where(x => x.IsCustomer == filter.IsCustomer);
            }
            if (filter.IsProvider.HasValue)
            {
                query = query.Where(x => x.IsProvider == filter.IsProvider);
            }
            query = query.OrderByDescending(x => x.CreateDate);
            return await this.Paging(query, filter);

        }

        public async Task<IList<tblPartnerDto>> GetAll(PartnerFilterLite filter)
        {
            var query = this._dbContext.tblMdPartner.AsQueryable();

            if (filter.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == filter.IsActive);
            }
            if (filter.IsCustomer.HasValue)
            {
                query = query.Where(x => x.IsCustomer == filter.IsCustomer);
            }
            if (filter.IsProvider.HasValue)
            {
                query = query.Where(x => x.IsProvider == filter.IsProvider);
            }
            query = query.OrderByDescending(x => x.CreateDate);

            return _mapper.Map<IList<tblPartnerDto>>(await query.ToListAsync());

        }

        public override async Task<tblPartnerDto> Add(IDto dto)
        {
            try
            {
                var model = dto as tblPartnerCreateDto;
                await _dbContext.Database.BeginTransactionAsync();
                var entity = _mapper.Map<tblMdPartner>(model);

                if (string.IsNullOrWhiteSpace(model.Code))
                {
                    if (entity.IsCustomer == true && entity.IsProvider == true)
                    {
                        entity.Code = await new CodeManager(_dbContext).GeneratePartnerCode(PartnerType.CA_HAI.ToString());
                    }
                    else if (entity.IsCustomer == true)
                    {
                        entity.Code = await new CodeManager(_dbContext).GeneratePartnerCode(PartnerType.KHACH_HANG.ToString());
                    }
                    else if (entity.IsProvider == true)
                    {
                        entity.Code = await new CodeManager(_dbContext).GeneratePartnerCode(PartnerType.NHA_CUNG_CAP.ToString());
                    }
                }

                var entityResult = await _dbContext.tblMdPartner.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                var dtoResult = _mapper.Map<tblPartnerDto>(entityResult.Entity);
                await _dbContext.Database.CommitTransactionAsync();

                if (this.Status)
                {
                    var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                        x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                        x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                        x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                    .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                    await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.PARTNER.ToString(), dtoResult.Code);
                }
                return dtoResult;
            }
            catch(Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public override async Task Delete(object code)
        {
            await base.Delete(code);
            if (this.Status)
            {
                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.PARTNER.ToString(), code);
            }
        }

        public override async Task Update(IDto dto)
        {
            var model = dto as tblPartnerUpdateDto;
            await base.Update(dto);
            if (this.Status)
            {
                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.PARTNER.ToString(), model.Code);
            }
        }
        public async Task<byte[]> Export(PartnerFilterLite filter)
        {
            var query = this._dbContext.tblMdPartner.AsQueryable();

            if (filter.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == filter.IsActive);
            }
            if (filter.IsCustomer.HasValue)
            {
                query = query.Where(x => x.IsCustomer == filter.IsCustomer);
            }
            if (filter.IsProvider.HasValue)
            {
                query = query.Where(x => x.IsProvider == filter.IsProvider);
            }

            var data = await query.OrderByDescending(x => x.CreateDate).ToListAsync();

            var exportData = data.Select((x, i) => new tblPartnerDto
            {
                Address = x.Address,
                Code = x.Code,
                Name = x.Name,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                TaxCode = x.TaxCode,
                OrdinalNumber = i + 1,
            }).ToList();

            var result = await new ExcelExporter(_dbContext).ExportToExcel(exportData, ExcelExportType.KHACH_HANG);

            return result;
        }
    }
}
