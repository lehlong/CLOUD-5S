using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.FileManager
{
    public interface IFolderService : IGenericService<tblBuFolder, tblFolderDto>
    {

    }
    public class FolderService : GenericService<tblBuFolder, tblFolderDto>, IFolderService
    {
        public FolderService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async override Task<tblFolderDto> GetById(object ParentId)
        {
            if (ParentId == null) ParentId = Guid.Empty;

            var folder = await _dbContext.tblBuFolder.Include(x => x.Childs).FirstOrDefaultAsync(x => x.Id == (Guid)ParentId);

            if (folder == null) return null;

            var moduleAttachments = await _dbContext.tblBuModuleAttachment.Include(x => x.Attachment).Where(x => x.ReferenceId == folder.ReferenceId).ToListAsync();

            var data = _mapper.Map<tblFolderDto>(folder);

            data.ModuleAttachments = _mapper.Map<List<tblModuleAttachmentDto>>(moduleAttachments);

            return data;
        }
    }
}
