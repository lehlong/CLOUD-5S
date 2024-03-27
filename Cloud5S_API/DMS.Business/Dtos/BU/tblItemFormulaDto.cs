using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblItemFormulaDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string ItemCode { get; set; }

        public double Cement { get; set; }

        public double Stone { get; set; }

        public double Sand { get; set; }

        public double Admixture { get; set; }

        public double Water { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuItemFormula, tblItemFormulaDto>().ReverseMap();
        }
    }

    public class tblItemFormulaCreateDto : IMapFrom, IDto
    {
        public string ItemCode { get; set; }

        public double Cement { get; set; }

        public double Stone { get; set; }

        public double Sand { get; set; }

        public double Admixture { get; set; }

        public double Water { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuItemFormula, tblItemFormulaCreateDto>().ReverseMap();
        }
    }
}
