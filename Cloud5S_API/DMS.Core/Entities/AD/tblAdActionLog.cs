using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdActionLog : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ActionName { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Body { get; set; }
    }
}
