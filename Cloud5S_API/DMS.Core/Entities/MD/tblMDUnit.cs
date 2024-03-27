using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdUnit : BaseEntity
    {
        [Key]
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        public virtual ICollection<tblMdItem> ListItem { get; set; }

        public tblMdUnit()
        {
            ListItem = new List<tblMdItem>();
        }
    }
}
