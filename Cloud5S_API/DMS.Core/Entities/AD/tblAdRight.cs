using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdRight : SoftDeleteEntity
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int? OrderNumber { get; set; }

        public virtual List<tblAdAccountGroupRight> AccountGroupRights { get; set; }

        public virtual List<tblAdAccountRight> AccountRights { get; set; }

        public tblAdRight()
        {
            AccountGroupRights = new List<tblAdAccountGroupRight>();
        }
    }
}
