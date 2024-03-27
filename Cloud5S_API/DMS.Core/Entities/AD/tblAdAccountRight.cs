using DMS.CORE.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdAccountRight : BaseEntity
    {
        [Key]
        public string UserName { get; set; }

        [Key]
        public string RightId { get; set; }

        public bool? IsAdded { get; set; }

        public bool? IsRemoved { get; set; }

        [ForeignKey("UserName")]
        public virtual tblAdAccount Account { get; set; }

        [ForeignKey("RightId")]
        public virtual tblAdRight Right { get; set; }
    }
}
