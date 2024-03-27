using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuNotification")]
    public class tblBuNotification : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [ForeignKey("tblAdAccount")]
        public string SenderName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Headings { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Subtitle { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Contents { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Url { get; set; }

        public int? Type { get; set; }

        public virtual ICollection<tblBuNotificationDetail> Details { get; set; }
    }
}
