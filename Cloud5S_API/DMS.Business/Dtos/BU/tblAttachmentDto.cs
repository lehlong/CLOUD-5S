using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblAttachmentDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Extension { get; set; }

        public double Size { get; set; }

        public string Type { get; set; }

        public string CreateBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public virtual tblAccountDto Creator { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuAttachment, tblAttachmentDto>().ReverseMap();
        }
    }

    public class BatchUploadDto
    {
        public byte[] ByteData { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string FileType { get; set; }
    }

    public class AttachmentRenameDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuAttachment, AttachmentRenameDto>().ReverseMap();
        }
    }
}
