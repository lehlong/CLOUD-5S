using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdAccount : SoftDeleteEntity
    {
        [Key]
        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string CompanyCode { get; set; }

        public string PositionCode { get; set; }

        public string DepartmentCode { get;set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Address { get; set; }

        public virtual tblMdCompany Company { get; set; }

        public virtual tblMdPosition Position { get; set; }

        public virtual tblMdDepartment Department { get; set; }

        public virtual ICollection<tblAdAccount_AccountGroup> Account_AccountGroups { get; set; }

        public virtual ICollection<tblAdAccountRight> AccountRights { get; set; }

        public virtual ICollection<tblSoOrderProcess> OrderProcesses { get; set; }
    }
}
