using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdPourSection")]
    public class tblMdPourSection : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        public string Name { get; set; }

        public virtual List<tblMdPourLine> PourLines { get; set; }
    }
}
