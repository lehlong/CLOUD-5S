using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoScaleImage : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string ScaleCode { get; set; }

        public Guid AttachmentId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        [ForeignKey("AttachmentId")]
        public virtual tblBuAttachment Attachment { get; set; }

        [ForeignKey("ScaleCode")]
        public virtual tblSoScale OrderScale { get; set; }
    }
}
