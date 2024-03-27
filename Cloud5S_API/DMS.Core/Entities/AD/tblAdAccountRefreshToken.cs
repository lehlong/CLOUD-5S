using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    [Table("tblAdAccountRefreshToken")]
    public class tblAdAccountRefreshToken : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [ForeignKey("tblAdAccount")]
        public string UserName { get; set; }

        public string RefreshToken { get; set; }

        public DateTime ExpireTime { get; set; }

        public virtual tblAdAccount Account { get; set; }
    }
}
