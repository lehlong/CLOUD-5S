using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuAttachment : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Url { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Extension { get; set; }

        public double Size { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Type { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }
    }
}
