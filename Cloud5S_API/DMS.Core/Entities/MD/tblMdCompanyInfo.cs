using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdCompanyInfo : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Address { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Email { get; set; }
    }
}
