using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.EntityFrameworkCore;


namespace DMS.BUSINESS.Services.AD
{
    public interface IOrganizeService : IGenericService<tblAdOrganize, tblAdOrganizeDto>
    {
        Task<tblAdOrganizeDto> BuildDataForTree(string businessCode);
        Task UpdateOrderTree(tblAdOrganizeDto moduleDto);
        new Task<tblAdOrganizeDto> Delete(object code);
    }
    public class OrganizeService : GenericService<tblAdOrganize, tblAdOrganizeDto>, IOrganizeService
    {
        public OrganizeService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblAdOrganizeDto> BuildDataForTree(string businessCode)
        {
            var lstNode = new List<tblAdOrganizeDto>();
            var rootNode = new tblAdOrganizeDto() { Id = "ORG", PId = "-ORG", Name = "Cấu trúc tổ chức" };
            lstNode.Add(rootNode);

            var lstAllOrganize = (await this.GetAll()).Where(x => x.BusinessCode == businessCode).OrderBy(x => x.OrderNumber).ToList();
            foreach (var Organize in lstAllOrganize)
            {
                var node = new tblAdOrganizeDto() { 
                    Id = Organize.Id, 
                    Name = Organize.Name, 
                    PId = Organize.PId, 
                    Type = Organize.Type,
                    IsChecked = Organize.IsChecked, 
                    OrderNumber = Organize.OrderNumber, 
                    BusinessCode = Organize.BusinessCode };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                if (item.PId == "-R" || !nodeDict.TryGetValue(item.PId, out tblAdOrganizeDto parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblAdOrganizeDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }

        public async Task UpdateOrderTree(tblAdOrganizeDto moduleDto)
        {
            try
            {
                var lstModuleDto = new List<tblAdOrganizeDto>();
                var lstModuleUpdate = new List<tblAdOrganize>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblAdOrganize>(item);
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

        private void ConvertNestedToList(tblAdOrganizeDto node, ref List<tblAdOrganizeDto> lstNodeFlat)
        {
            if (node.Id != "ORG")
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
        public override Task<tblAdOrganizeDto> Add(IDto dto)
        {
            var model = dto as tblAdOrganizeDto;
            if (string.IsNullOrWhiteSpace(model.PId))
            {
                model.PId = "ORG";
            }
            return base.Add(dto);
        }


        public async new Task<tblAdOrganizeDto> Delete(object code)
        {
            try
            {
                var codeString = code.ToString();
                var query = _dbContext.Set<tblAdOrganize>().AsQueryable(); // Sử dụng _dbContext.Set<tblAdOrganize>() để truy cập bảng tblAdOrganize

                query = query.Where(x => x.PId == codeString);

                var recordsWithSamePid = await query.ToListAsync();

                if (recordsWithSamePid.Count == 0)
                {
                    var recordToDelete = await _dbContext.Set<tblAdOrganize>().FirstOrDefaultAsync(x => x.Id == codeString); // Sử dụng _dbContext.Set<tblAdOrganize>() để truy cập bảng tblAdOrganize

                    if (recordToDelete != null)
                    {
                        _dbContext.Remove(recordToDelete);
                        await _dbContext.SaveChangesAsync();
                    }
                    return _mapper.Map<tblAdOrganizeDto>(recordToDelete);
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
