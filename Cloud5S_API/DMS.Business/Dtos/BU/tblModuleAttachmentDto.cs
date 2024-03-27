using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblModuleAttachmentDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public Guid ReferenceId { get; set; }

        public string ModuleType { get; set; }

        public Guid AttachmentId { get; set; }

        public virtual tblAttachmentDto Attachment { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuModuleAttachment, tblModuleAttachmentDto > ().ReverseMap();
        }
    }
}
