using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.AspNetCore.SignalR;
using DMS.BUSINESS.Services.HB;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;

namespace DMS.BUSINESS.Services.AD
{
    public interface IAccountGroupService : IGenericService<tblAdAccountGroup, tblAccountGroupDto>
    {
        Task<byte[]> Export(BaseExportFilter filter);
    }

    public class AccountGroupService : GenericService<tblAdAccountGroup, tblAccountGroupDto>, IAccountGroupService
    {
        private readonly IHubContext<RefreshServiceHub> _hubContext;
        public AccountGroupService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccountGroup.AsQueryable();
                //query = query.AsNoTracking();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Name);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task Update(IDto dto)
        {
            try
            {
                var realDto = dto as tblAccountGroupUpdateDto;

                realDto.ListAccountGroupRight.RemoveAll(x => x.RightId == "R");

                var entityInDB = await this._dbContext.tblAdAccountGroup
                    .Where(x => x.Id == realDto.Id)
                    .Include(x => x.Account_AccountGroups)
                    .Include(x => x.ListAccountGroupRight)
                    .FirstOrDefaultAsync();

                if (entityInDB == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2003";
                    return;
                }
                entityInDB.ListAccountGroupRight.Clear();
                this._mapper.Map(dto, entityInDB);
                await this._dbContext.SaveChangesAsync();
                if (this.Status)
                    await _hubContext.Clients.Group(realDto.Id.ToString()).SendAsync(SignalRNotificationType.RIGHT.ToString(), realDto.Id);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public override async Task<tblAccountGroupDto> GetById(object id)
        {
            try
            {
                var entity = await this._dbContext.tblAdAccountGroup
                    .Where(x => x.Id == (Guid)id)
                    .Include(x => x.Account_AccountGroups)
                    .ThenInclude(x => x.Account)
                    .Include(x => x.ListAccountGroupRight)
                    .FirstOrDefaultAsync();

                var result = _mapper.Map<tblAccountGroupDto>(entity);

                // Lấy danh sách tất cả các quyền
                var lstNode = new List<tblRightDto>();
                var rootNode = new tblRightDto() { Id = "R", PId = "-R", Name = "Danh sách quyền trong hệ thống" };
                lstNode.Add(rootNode);

                var lstAllRight = await this._dbContext.tblAdRight.OrderBy(x => x.OrderNumber).ToListAsync();
                if (result.ListAccountGroupRight.Count > 0)
                {
                    rootNode.IsChecked = true;
                }
                foreach (var right in lstAllRight)
                {
                    var node = new tblRightDto() { Id = right.Id, Name = right.Name, PId = right.PId };
                    if (result.ListAccountGroupRight.Any(x => x.RightId == right.Id))
                    {
                        node.IsChecked = true;
                    }
                    lstNode.Add(node);
                }

                var nodeDict = lstNode.ToDictionary(n => n.Id);
                foreach (var item in lstNode)
                {
                    if (item.PId == "-R" || !nodeDict.TryGetValue(item.PId, out tblRightDto parentNode))
                    {
                        continue;
                    }

                    parentNode.Children ??= new List<tblRightDto>();
                    parentNode.Children.Add(item);
                }

                result.TreeRight = rootNode;

                return result;
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
                var query = this._dbContext.tblAdAccountGroup.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Name);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblAccountGroupExportDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x.IsActive,
                    Name = x.Name,
                    Notes = x.Notes,
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.NHOM_TAI_KHOAN);

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
