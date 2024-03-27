using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCheckInOutImage : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid CheckInOutId { get; set; }

        public Guid AttachmentId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        [ForeignKey("CheckInOutId")]
        public virtual tblBuCheckInOut CheckInOut { get; set; }

        [ForeignKey("AttachmentId")]
        public virtual tblBuAttachment Attachment { get; set; }
    }
}
