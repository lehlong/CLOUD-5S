using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuModuleAttachment")]
    public class tblBuModuleAttachment : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid? ReferenceId { get; set; }

        public string ModuleType { get; set; }

        public Guid AttachmentId { get; set; }

        public virtual tblBuAttachment Attachment { get; set; }
    }
}
