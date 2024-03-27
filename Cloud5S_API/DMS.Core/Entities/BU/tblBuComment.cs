using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuComment")]
    public class tblBuComment : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid? PId { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Type { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Content { get; set; }

        public Guid? AttachmentId { get; set; }

        [ForeignKey("PId")]
        public virtual tblBuComment PComment { get; set; }

        public virtual ICollection<tblBuComment> Replies { get; set; }

        [ForeignKey("AttachmentId")]
        public virtual tblBuAttachment Attachment { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }

        public virtual tblBuModuleComment ModuleComment { get; set; }
    }
}
