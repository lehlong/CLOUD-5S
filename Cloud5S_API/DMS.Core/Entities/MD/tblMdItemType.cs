using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdItemType : BaseEntity
    {
        [Required]
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        public virtual List<tblMdItem> ListItem { get; set; }

        public tblMdItemType()
        {
            ListItem = new List<tblMdItem>();
        }
    }
}
