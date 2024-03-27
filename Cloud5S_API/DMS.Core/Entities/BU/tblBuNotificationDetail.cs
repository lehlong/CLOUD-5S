using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuNotificationDetail : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("tblBuNotification")]
        public int NotificationId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [ForeignKey("tblAdAccount")]
        public string ReceiverName { get; set; }

        public bool? IsSeen { get; set; }

        public bool? IsSent { get; set; }

        [ForeignKey("ReceiverName")]
        public virtual tblAdAccount Account { get; set; }

        [ForeignKey("NotificationId")]
        public virtual tblBuNotification Notification { get; set; }
    }
}
