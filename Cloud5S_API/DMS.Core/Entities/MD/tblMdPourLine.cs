using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdPourLine")]
    public class tblMdPourLine : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [ForeignKey("tblMdPourSection")]
        [Column(TypeName = "varchar(50)")]
        public string SectionCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        [ForeignKey("SectionCode")]
        public virtual tblMdPourSection PourSection { get; set; }
    }
}
