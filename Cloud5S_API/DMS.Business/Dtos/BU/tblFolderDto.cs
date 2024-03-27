using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblFolderDto : IMapFrom, IDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid? ParentId { get; set; }

        public string CreateBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public Guid? ReferenceId { get; set; }

        public virtual tblAccountDto Creator { get; set; }

        public virtual tblFolderDto Parent { get; set; }

        public virtual List<tblFolderDto> Childs { get; set; }

        public virtual List<tblModuleAttachmentDto> ModuleAttachments { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuFolder, tblFolderDto>().ReverseMap();
        }
    }

    public class tblFolderCreateDto : IMapFrom, IDto
    {
        public string Name { get; set; }

        public Guid ParentId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuFolder, tblFolderCreateDto>().ReverseMap();
        }
    }

    public class tblFolderUpdateDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuFolder, tblFolderUpdateDto>().ReverseMap();
        }
    }
}
