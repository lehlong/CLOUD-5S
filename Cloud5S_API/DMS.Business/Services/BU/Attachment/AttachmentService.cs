using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DMS.BUSINESS.Services.BU.Attachment
{
    public interface IAttachmentService : IGenericService<tblBuAttachment, tblAttachmentDto>
    {
        Task<(byte[], string)> Download(Guid attachmentId);
    }

    public class AttachmentService : GenericService<tblBuAttachment, tblAttachmentDto>, IAttachmentService
    {
        private readonly IConfiguration _configuration;
        public AttachmentService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
        {
            _configuration = configuration; 
        }

        public async Task<(byte[], string)> Download(Guid attachmentId)
        {
            var attachment = await _dbContext.tblBuAttachment.FirstOrDefaultAsync(x => x.Id == attachmentId);

            if (attachment == null)
            {
                this.Status = false;
                this.MessageObject.Code = "0003";
            }

            var uploadUrl = _configuration.GetSection("Url:Upload").Value;

            var path = Path.Combine(uploadUrl, attachment.Url);

            return ((File.ReadAllBytes(path), Path.GetFileName(path)));
        }
    }
}
