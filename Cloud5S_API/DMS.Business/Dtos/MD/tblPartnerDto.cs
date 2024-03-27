using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblPartnerDto : BaseMdDto, IMapFrom, IDto
    {
        public Guid Id { get; set; }

        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã đối tác")]
        public string Code { get; set; }

        [Description("Họ tên")]
        public string Name { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        [Description("Địa chỉ")]
        public string Address { get; set; }

        [Description("Số điện thoại")]
        public string PhoneNumber { get; set; }

        [Description("Email")]
        public string Email { get; set; }

        [Description("TaxCode")]
        public string TaxCode { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPartner, tblPartnerDto>().ReverseMap();
        }
    }

    public class tblPartnerCreateDto : BaseMdDto, IMapFrom, IDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string TaxCode { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPartner, tblPartnerCreateDto>().ReverseMap();
        }
    }

    public class tblPartnerUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string TaxCode { get; set; }

        public double? Longitude { get; set; }

        public double? Latitude { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPartner, tblPartnerUpdateDto>().ReverseMap();
        }
    }
}
