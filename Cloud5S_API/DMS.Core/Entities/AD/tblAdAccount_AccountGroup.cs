using DMS.CORE.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdAccount_AccountGroup : BaseEntity
    {
        [Key]
        public string UserName { get; set; }

        [Key]
        public Guid GroupId { get; set; }

        [ForeignKey("UserName")]
        public virtual tblAdAccount Account { get; set; }

        [ForeignKey("GroupId")]
        public virtual tblAdAccountGroup AccountGroup { get; set; }
    }
}
