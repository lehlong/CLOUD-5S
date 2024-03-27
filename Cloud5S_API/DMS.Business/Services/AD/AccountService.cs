using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Enum;
using Microsoft.AspNetCore.SignalR;
using DMS.BUSINESS.Services.HB;

namespace DMS.BUSINESS.Services.AD
{
    public interface IAccountService : IGenericService<tblAdAccount, tblAccountDto>
    {
        Task<PagedResponseDto> Search(AccountFilter filter);
        Task UpdateInformation(tblAccountUpdateInformationDto dto);
        Task<IList<tblAccountDto>> GetAll(AccountFilterLite filter);
        Task<byte[]> Export(AccountFilterLite filter);
        Task<tblAccountTreeRightDto> GetByIdWithRightTree(object id);
    }

    public class AccountService : GenericService<tblAdAccount, tblAccountDto>, IAccountService
    {
        private readonly IHubContext<RefreshServiceHub> _hubContext;

        public AccountService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public async Task<PagedResponseDto> Search(AccountFilter filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccount
                .Include(x => x.Account_AccountGroups)
                .ThenInclude(x => x.AccountGroup)
                .Include(x => x.Company)
                .Include(x => x.Position)
                .Include(x => x.Department)
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.UserName.Contains(filter.KeyWord) ||
                        x.FullName.Contains(filter.KeyWord)
                    );
                }

                if (!string.IsNullOrWhiteSpace(filter.RoleCode))
                {
                    query = query.Where(x => x.Account_AccountGroups.Select(x => x.AccountGroup).Any(x => x.RoleCode == filter.RoleCode));
                }

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                if (filter.GroupId.HasValue)
                {
                    query = query.Where(x => x.Account_AccountGroups.Any(x => x.GroupId == filter.GroupId));
                }

                query = query.OrderBy(x => x.UserName);

                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblAccountDto>> GetAll(AccountFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccount
                    .Include(x => x.Account_AccountGroups)
                    .ThenInclude(x => x.AccountGroup)
                    .Include(x => x.Company)
                    .Include(x => x.Position)
                    .Include(x => x.Department)
                    .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.UserName.Contains(filter.KeyWord) ||
                        x.FullName.Contains(filter.KeyWord)
                    );
                }

                if (!string.IsNullOrWhiteSpace(filter.RoleCode))
                {
                    query = query.Where(x => x.Account_AccountGroups.Select(x => x.AccountGroup).Any(x => x.RoleCode == filter.RoleCode));
                }

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                if (filter.GroupId.HasValue)
                {
                    query = query.Where(x => x.Account_AccountGroups.Any(x => x.GroupId == filter.GroupId));
                }

                query = query.OrderByDescending(x => x.CreateDate);
                return _mapper.Map<IList<tblAccountDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblAccountTreeRightDto> GetByIdWithRightTree(object id)
        {
            var data = await _dbContext.tblAdAccount
                                        .Include(x => x.Account_AccountGroups)
                                        .ThenInclude(x => x.AccountGroup)
                                        .ThenInclude(x=>x.ListAccountGroupRight)
                                        .Include(x => x.AccountRights)
                                        .ThenInclude(x => x.Right)
                                        .Include(x => x.Company)
                                        .Include(x => x.Position)
                                        .Include(x => x.Department)
                                        .FirstOrDefaultAsync(x => x.UserName == id as string);
            

            // Lấy danh sách tất cả các quyền
            var lstNode = new List<tblRightDto>();
            var rootNode = new tblRightDto() { Id = "R", PId = "-R", Name = "Danh sách quyền trong hệ thống" };
            lstNode.Add(rootNode);

            var lstAllRight = await this._dbContext.tblAdRight.OrderBy(x => x.OrderNumber).ToListAsync();

            var lstRightInGroup = data.Account_AccountGroups
                    .Select(x => x.AccountGroup)
                    .SelectMany(x => x.ListAccountGroupRight)
                    .Select(x => x.RightId)
                    .Where(x => x != "R")
                    .ToList();

            var lstRightOutGroup = data.AccountRights;

            if (data.Account_AccountGroups.Count > 0)
            {
                rootNode.IsChecked = true;
            }
            foreach (var right in lstAllRight)
            {
                var node = new tblRightDto() { Id = right.Id, Name = right.Name, PId = right.PId };
                if (lstRightOutGroup.Where(x => x.IsAdded.Value).Select(x => x.RightId).Contains(right.Id))
                {
                    node.IsChecked = true;
                }
                else if (lstRightInGroup.Contains(right.Id) && !lstRightOutGroup.Where(x => x.IsRemoved.Value).Select(x => x.RightId).Contains(right.Id))
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

            var result = _mapper.Map<tblAccountTreeRightDto>(data);
            var vehicle = await _dbContext.tblMdVehicle.FirstOrDefaultAsync(x => x.DriverUserName == data.UserName);
            if (vehicle != null)
            {
                result.VehicleCode = vehicle.Code;
            }
            result.TreeRight = rootNode;

            return result;
        }

        public override async Task<tblAccountDto> Add(IDto dto)
        {
            var realDto = dto as tblAccountCreateDto;
            realDto.Password = Utils.CryptographyMD5($"{realDto.UserName}@123");
            var data = await base.Add(dto);

            if(this.Status && !string.IsNullOrEmpty(realDto.VehicleCode))
            {
                var vehicle = await _dbContext.tblMdVehicle.FirstOrDefaultAsync(x => x.Code == realDto.VehicleCode);
                if(vehicle != null)
                {
                    vehicle.DriverUserName = data.UserName;
                }
                await _dbContext.SaveChangesAsync();
            }
            return data;
        }

        public async Task UpdateInformation(tblAccountUpdateInformationDto dto)
        {
            await base.Update(dto);
            if (this.Status)
            {
                if (!string.IsNullOrEmpty(dto.VehicleCode))
                {
                    var vehicle = await _dbContext.tblMdVehicle.FirstOrDefaultAsync(x => x.Code == dto.VehicleCode);
                    if (vehicle != null)
                    {
                        vehicle.DriverUserName = dto.UserName;
                    }
                    await _dbContext.SaveChangesAsync();
                }

                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.USER.ToString(), dto.UserName);
            }
        }

        public override async Task Update(IDto dto)
        {
            try
            {
                var dt = dto as tblAccountUpdateDto;
                var model = _mapper.Map<tblAccountDto>(dto as tblAccountUpdateDto);

                var rootRightInModel = model?.AccountRights?.Where(x => x.RightId == "R").ToList();

                if (rootRightInModel != null && rootRightInModel.Any())
                {
                    rootRightInModel.ForEach(x =>
                    {
                        model.AccountRights.Remove(x);
                    });
                }

                var accountLite = _mapper.Map<tblAccountLiteDto>(model);

                var currentObj = await _dbContext.tblAdAccount.Include(x => x.Account_AccountGroups)
                    .ThenInclude(x => x.AccountGroup)
                    .ThenInclude(x => x.ListAccountGroupRight)
                    .Include(x => x.AccountRights).FirstOrDefaultAsync(x => x.UserName == model.UserName);


                var listRightInGroups = currentObj.Account_AccountGroups
                    .Select(x => x.AccountGroup)
                    .SelectMany(x => x.ListAccountGroupRight)
                    .Select(x => x.RightId)
                    .Where(x => x != "R")
                    .ToList(); // list right in current Group of user

                var listRightOutGroup = currentObj.AccountRights.Select(x => x.RightId).ToList();

                _mapper.Map(accountLite, currentObj);

                currentObj.AccountRights ??= new List<tblAdAccountRight>();

                foreach (var item in model.AccountRights)
                {
                    var rightInAccountRight = currentObj.AccountRights.FirstOrDefault(x => x.RightId == item.RightId);

                    if (listRightInGroups.Contains(item.RightId))
                    {
                        if (rightInAccountRight != null)
                        {
                            currentObj.AccountRights.Remove(rightInAccountRight);
                        }
                        else continue;
                    }


                    if (rightInAccountRight != null)
                    {
                        if (rightInAccountRight.IsRemoved.Value)
                        {
                            rightInAccountRight.IsAdded = true;
                            rightInAccountRight.IsRemoved = false;
                        }
                        else continue;
                    }
                    else
                    {
                        currentObj.AccountRights.Add(new tblAdAccountRight()
                        {
                            RightId = item.RightId,
                            IsAdded = true,
                            IsRemoved = false
                        });
                    }
                }

                var listRightInGroupRemove = listRightInGroups.Concat(listRightOutGroup).Where(x => !model.AccountRights.Select(x => x.RightId).Contains(x)).ToList();

                foreach (var item in listRightInGroupRemove)
                {
                    if (listRightInGroups.Contains(item))
                    {
                        var rightInAccountRight = currentObj.AccountRights.FirstOrDefault(x => x.RightId == item);

                        if (rightInAccountRight == null)
                        {
                            currentObj.AccountRights.Add(new tblAdAccountRight()
                            {
                                RightId = item,
                                IsAdded = false,
                                IsRemoved = true
                            });
                        }
                        else
                        {
                            if (rightInAccountRight.IsAdded.Value)
                            {
                                rightInAccountRight.IsAdded = false;
                                rightInAccountRight.IsRemoved = true;
                            }
                            else continue;
                        }
                    }
                    else
                    {
                        var rightInAccountRight = currentObj.AccountRights.FirstOrDefault(x => x.RightId == item);
                        if (rightInAccountRight != null)
                        {
                            currentObj.AccountRights.Remove(rightInAccountRight);
                        }
                    }


                }
                await _dbContext.SaveChangesAsync();
                if (this.Status)
                {
                    if (!string.IsNullOrEmpty(dt.VehicleCode))
                    {
                        var vehicle = await _dbContext.tblMdVehicle.FirstOrDefaultAsync(x => x.Code == dt.VehicleCode);
                        if (vehicle != null)
                        {
                            vehicle.DriverUserName = dt.UserName;
                        }
                        await _dbContext.SaveChangesAsync();
                    }
                    await _hubContext.Clients.Groups(currentObj.UserName).SendAsync(SignalRNotificationType.RIGHT.ToString(), currentObj.UserName);
                }
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task<byte[]> Export(AccountFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccount
                .Include(x => x.Account_AccountGroups)
                .ThenInclude(x => x.AccountGroup)
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.UserName.Contains(filter.KeyWord) ||
                        x.FullName.Contains(filter.KeyWord)
                    );
                }

                if (!string.IsNullOrWhiteSpace(filter.RoleCode))
                {
                    query = query.Where(x => x.Account_AccountGroups.Select(x => x.AccountGroup).Any(x => x.RoleCode == filter.RoleCode));
                }

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                if (filter.GroupId.HasValue)
                {
                    query = query.Where(x => x.Account_AccountGroups.Any(x => x.GroupId == filter.GroupId));
                }

                query = query.OrderBy(x => x.UserName);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblAccountExportDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x?.IsActive,
                    FullName = x?.FullName,
                    UserName = x?.UserName
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.TAI_KHOAN);

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
