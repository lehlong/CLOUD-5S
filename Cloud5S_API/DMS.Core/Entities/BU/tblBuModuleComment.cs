using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuModuleComment")]
    public class tblBuModuleComment : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid ReferenceId { get; set; }

        public Guid CommentId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ModuleType { get; set; }

        [ForeignKey("CommentId")]
        public virtual tblBuComment Comment { get; set; }
    }
}
