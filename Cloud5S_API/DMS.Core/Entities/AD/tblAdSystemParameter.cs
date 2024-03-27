using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdSystemParameter : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
    }
}
