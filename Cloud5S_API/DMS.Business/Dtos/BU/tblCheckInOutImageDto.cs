using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCheckInOutImageDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public Guid CheckInOutId { get; set; }

        public Guid AttachmentId { get; set; }

        public string Type { get; set; }

        public virtual tblBuCheckInOut CheckInOut { get; set; }

        public virtual tblBuAttachment Attachment { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOutImage, tblCheckInOutImageDto>().ReverseMap();
        }
    }

    public class tblCheckInOutImageLiteDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public Guid CheckInOutId { get; set; }

        public Guid AttachmentId { get; set; }

        public string Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOutImage, tblCheckInOutImageLiteDto>().ReverseMap();
        }
    }
}
