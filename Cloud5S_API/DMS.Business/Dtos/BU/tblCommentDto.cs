using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCommentDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public Guid? PId { get; set; }

        public string Type { get; set; }

        public string Content { get; set; }

        public Guid? AttachmentId { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public virtual ICollection<tblCommentDto> Replies { get; set; }

        public virtual tblAttachmentDto Attachment { get; set; }
        
        public virtual CreatorDto Creator { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuComment, tblCommentDto>().ReverseMap();
        }
    }

    public class tblCommentCreateDto : IMapFrom, IDto
    {
        public Guid? PId { get; set; }

        public string Type { get; set; }

        public string Content { get; set; }

        public Guid? AttachmentId { get; set; }

        public Guid ReferenceId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuComment, tblCommentCreateDto>().ReverseMap();
        }
    }

    public class tblCommentUpdateDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; }

        public string Content { get; set; }

        public Guid? AttachmentId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuComment, tblCommentUpdateDto>().ReverseMap();
        }
    }
}
