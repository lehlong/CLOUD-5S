using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdLoginHistory : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string FullName { get; set; }

        public bool IsSuccess { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string UserAgent { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string IPAddress { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string MessageCode { get; set; }
    }
}
