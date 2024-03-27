using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuFolder : ReferenceEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        [ForeignKey("tblBuFolder")]
        public Guid? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual tblBuFolder Parent { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }

        public virtual ICollection<tblBuFolder> Childs { get; set; }
    }
}
