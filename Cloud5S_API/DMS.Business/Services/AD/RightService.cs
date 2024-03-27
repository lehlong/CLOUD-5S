using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.EntityFrameworkCore;


namespace DMS.BUSINESS.Services.AD
{
    public interface IRightService : IGenericService<tblAdRight, tblRightDto>
    {
        Task<tblRightDto> BuildDataForTree();
        Task UpdateOrderTree(tblRightDto moduleDto);
        Task<bool> CheckRight(string right, string UserName);
        Task<List<string>> GetRightOfUser(string userName);
        new Task<tblRightDto> Delete(object code);
    }
    public class RightService : GenericService<tblAdRight, tblRightDto>, IRightService
    {
        public RightService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblRightDto> BuildDataForTree()
        {
            var lstNode = new List<tblRightDto>();
            var rootNode = new tblRightDto() { Id = "R", PId = "-R", Name = "Danh sách quyền trong hệ thống" };
            lstNode.Add(rootNode);

            var lstAllRight = (await this.GetAll()).OrderBy(x => x.OrderNumber).ToList();
            foreach (var right in lstAllRight)
            {
                var node = new tblRightDto() { Id = right.Id, Name = right.Name, PId = right.PId, IsChecked = right.IsChecked, OrderNumber = right.OrderNumber };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                if (item.PId == "-R" || !nodeDict.TryGetValue(item.PId, out tblRightDto parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblRightDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }

        public async Task UpdateOrderTree(tblRightDto moduleDto)
        {
            try
            {
                var lstModuleDto = new List<tblRightDto>();
                var lstModuleUpdate = new List<tblAdRight>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblAdRight>(item);
                    module.OrderNumber = numberOrder++;
                    lstModuleUpdate.Add(module);
                }
                this._dbContext.UpdateRange(lstModuleUpdate);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task<bool> CheckRight(string right, string UserName)
        {
            if (string.IsNullOrEmpty(right)) { return true; }
            if (string.IsNullOrEmpty(UserName)) { return false; }
            var lstRightOfUser = await this.GetRightOfUser(UserName);
            var lstRightCheck = right.Split(',');
            foreach (var item in lstRightCheck)
            {
                if (lstRightOfUser.Contains(item)) { return true; }
            }
            return false;
        }

        public async Task<List<string>> GetRightOfUser(string userName)
        {
            var user = await _dbContext.tblAdAccount.Include(x=>x.Account_AccountGroups)
                .ThenInclude(x=>x.AccountGroup).ThenInclude(x=>x.ListAccountGroupRight)
                .Include(x=>x.AccountRights)
                .FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null) return new();

            var listRightOfUser = new List<string>();

            var lstRightInGroup = user.Account_AccountGroups
                .Select(x => x.AccountGroup)
                .SelectMany(x => x.ListAccountGroupRight)
                .Select(x => x.RightId).ToList();

            var listRightOutGroup = user.AccountRights.Where(x=>x.IsAdded == true).Select(x => x.RightId).ToList();

            var listRightOutGroupRemoved = user.AccountRights.Where(x => x.IsRemoved == true).Select(x => x.RightId).ToList();


            var result = listRightOfUser.Concat(lstRightInGroup).Concat(listRightOutGroup).Distinct().ToList();

            result.RemoveAll(x => listRightOutGroupRemoved.Contains(x));

            return result;
        }

        private void ConvertNestedToList(tblRightDto node, ref List<tblRightDto> lstNodeFlat)
        {
            if (node.Id != "R")
            {
                lstNodeFlat.Add(node);
            }
            if (node.Children != null && node.Children.Count > 0)
            {
                foreach (var item in node.Children)
                {
                    ConvertNestedToList(item, ref lstNodeFlat);
                }
            }
        }
        public override Task<tblRightDto> Add(IDto dto)
        {
            var model = dto as tblRightDto;
            if (string.IsNullOrWhiteSpace(model.PId))
            {
                model.PId = "R";
            }
            return base.Add(dto);
        }


        public async new Task<tblRightDto> Delete(object code)
        {
            try
            {
                var codeString = code.ToString();
                var query = _dbContext.Set<tblAdRight>().AsQueryable(); // Sử dụng _dbContext.Set<tblAdRight>() để truy cập bảng tblAdRight

                query = query.Where(x => x.PId == codeString);

                var recordsWithSamePid = await query.ToListAsync();

                if (recordsWithSamePid.Count == 0)
                {
                    var recordToDelete = await _dbContext.Set<tblAdRight>().FirstOrDefaultAsync(x => x.Id == codeString); // Sử dụng _dbContext.Set<tblAdRight>() để truy cập bảng tblAdRight

                    if (recordToDelete != null)
                    {
                        _dbContext.Remove(recordToDelete);
                        await _dbContext.SaveChangesAsync();
                    }
                    return _mapper.Map<tblRightDto>(recordToDelete);
                }
                return null;
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
