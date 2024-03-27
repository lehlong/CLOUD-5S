using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblSystemParameterDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string PortName { get; set; }

        public string PortAddress { get; set; }

        public double? PortLatitude { get; set; }

        public double? PortLongitude { get; set; }

        public string DefaultProductItemCode { get; set; }

        public string DefaultIngredientItemCode { get; set; }

        public string DefaultProductStock { get; set; }

        public string DefaultIngredientStock { get; set; }

        public double DefaultTransferValue { get; set; }

        public string UnitCode { get; set; }

        public string DefaultCompanyCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdSystemParameter, tblSystemParameterDto>().ReverseMap();
        }
    }
}
