using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdBusiness : BaseEntity
    {
        [Key]
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string ShortName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string TaxCode { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Phone { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Address { get; set; }
    }
}
