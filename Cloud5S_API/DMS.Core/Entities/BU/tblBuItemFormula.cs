using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuItemFormula : SoftDeleteEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public double? Cement { get; set; }

        public double? Stone { get; set; }

        public double? Sand { get; set; }

        public double? Admixture { get; set; }

        public double? Water { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }
    }
}
