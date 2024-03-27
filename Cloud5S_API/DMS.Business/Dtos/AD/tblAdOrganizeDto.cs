using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAdOrganizeDto : IMapFrom, IDto
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string PId { get; set; }
        public int? OrderNumber { get; set; }
        public string Type {  get; set; }
        public string BusinessCode {  get; set; }
        public bool IsChecked { get; set; }
        public List<tblAdOrganizeDto> Children { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdOrganize, tblAdOrganizeDto>().ReverseMap();
        }
    }

    public class OrganizeViewModel
    {
        public Guid GroupId { get; set; }

        public List<tblAdOrganizeDto> ListOrganize { get; set; }

        public OrganizeViewModel()
        {
            ListOrganize = new List<tblAdOrganizeDto>();
        }
    }
}
