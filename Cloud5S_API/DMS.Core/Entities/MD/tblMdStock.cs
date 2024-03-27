using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdStock : BaseEntity
    {
        [Key]
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

   
        [Column(TypeName = "varchar(50)")]
        public string CompanyCode { get; set; }

        [ForeignKey("CompanyCode")]
        public virtual tblMdCompany Company { get; set; }
    }
}
