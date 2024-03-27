using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using AutoMapper;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class tblScaleImageDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public string ScaleCode { get; set; }

        public Guid AttachmentId { get; set; }

        public string Type { get; set; }

        public virtual tblBuAttachment Attachment { get; set; }

        public virtual tblSoScale OrderScale { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoScaleImage, tblScaleImageDto>().ReverseMap();
        }
    }
}
