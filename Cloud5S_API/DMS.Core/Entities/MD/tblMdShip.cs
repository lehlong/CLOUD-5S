using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdShip")]
    public class tblMdShip : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        public string Name { get; set; }

        public double? Tonage { get; set; }
    }
}
