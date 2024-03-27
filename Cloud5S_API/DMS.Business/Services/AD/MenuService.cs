using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.AD
{
    public interface IMenuService : IGenericService<tblAdMenu, tblMenuDto>
    {
        Task<tblMenuDto> BuildDataForTree();
        Task UpdateOrderTree(tblMenuDto moduleDto);
        Task<tblMenuDto> GetMenuOfUser(string userName);
        new Task<tblMenuDto> Delete(object code);
    }

    public class MenuService : GenericService<tblAdMenu, tblMenuDto>, IMenuService
    {
        public MenuService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        /// <summary>
        /// Dựng cấu trúc nested tree
        /// </summary>
        /// <returns></returns>
        public async Task<tblMenuDto> BuildDataForTree()
        {
            var lstNode = new List<tblMenuDto>();
            var rootNode = new tblMenuDto() { Id = "MNU", PId = "-MNU", Name = "Danh sách menu" };
            lstNode.Add(rootNode);

            var lstAllMenu = await _dbContext.tblAdMenu.OrderBy(x => x.OrderNumber).ToListAsync();
            foreach (var menu in lstAllMenu)
            {
                var node = new tblMenuDto() { Id = menu.Id, Name = menu.Name, PId = menu.PId, OrderNumber = menu.OrderNumber, Icon = menu.Icon, Url = menu.Url, RightId = menu.RightId };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                if (item.PId == "-MNU" || !nodeDict.TryGetValue(item.PId, out tblMenuDto parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblMenuDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;

        }

        public async Task UpdateOrderTree(tblMenuDto moduleDto)
        {
            try
            {
                if(string.IsNullOrEmpty(moduleDto.PId) || string.IsNullOrEmpty(moduleDto.RightId))
                {
                    this.Status = false;
                    this.MessageObject.Code = "1012";
                    return;
                }

                var lstModuleDto = new List<tblMenuDto>();
                var lstModuleUpdate = new List<tblAdMenu>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblAdMenu>(item);
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

        public async Task<tblMenuDto> GetMenuOfUser(string userName)
        {
            var lstNode = new List<tblMenuDto>();
            var rootNode = new tblMenuDto() { Id = "MNU", PId = "-MNU", Name = "Danh sách menu" };
            lstNode.Add(rootNode);

            var lstRightOfUser = await GetRightOfUser(userName);
            var lstAllMenu = await _dbContext.tblAdMenu.Where(x => lstRightOfUser.Contains(x.RightId)).OrderBy(x => x.OrderNumber).ToListAsync();

            foreach (var menu in lstAllMenu)
            {
                var node = new tblMenuDto() { Id = menu.Id, Name = menu.Name, PId = menu.PId, OrderNumber = menu.OrderNumber, Icon = menu.Icon, Url = menu.Url, RightId = menu.RightId };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                if (item.PId == "-MNU" || !nodeDict.TryGetValue(item.PId, out tblMenuDto parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblMenuDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;

        }

        private void ConvertNestedToList(tblMenuDto node, ref List<tblMenuDto> lstNodeFlat)
        {
            if (node.Id != "MNU")
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

        public async new Task<tblMenuDto> Delete(object code)
        {
            try
            {

                var codeString = code.ToString();
                var query = _dbContext.Set<tblAdMenu>().AsQueryable();

                query = query.Where(x => x.PId == codeString);

                var recordsWithSamePid = await query.ToListAsync();

                if (recordsWithSamePid.Count == 0)
                {
                    var recordToDelete = await _dbContext.Set<tblAdMenu>().FirstOrDefaultAsync(x => x.Id == codeString);

                    if (recordToDelete != null)
                    {
                        _dbContext.Remove(recordToDelete);
                        await _dbContext.SaveChangesAsync();
                    }
                    return _mapper.Map<tblMenuDto>(recordToDelete);
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

        private async Task<List<string>> GetRightOfUser(string userName)
        {
            var user = await _dbContext.tblAdAccount.Include(x => x.Account_AccountGroups)
                .ThenInclude(x => x.AccountGroup).ThenInclude(x => x.ListAccountGroupRight)
                .Include(x => x.AccountRights)
                .FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null) return new();

            var listRightOfUser = new List<string>();

            var lstRightInGroup = user.Account_AccountGroups
                .Select(x => x.AccountGroup)
                .SelectMany(x => x.ListAccountGroupRight)
                .Select(x => x.RightId).ToList();

            var listRightOutGroup = user.AccountRights.Where(x => x.IsAdded == true).Select(x => x.RightId).ToList();

            var listRightOutGroupRemoved = user.AccountRights.Where(x => x.IsRemoved == true).Select(x => x.RightId).ToList();


            var result = listRightOfUser.Concat(lstRightInGroup).Concat(listRightOutGroup).Distinct().ToList();

            result.RemoveAll(x => listRightOutGroupRemoved.Contains(x));

            return result;
        }
    }
}
