using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdTransportAgency")]
    public class tblMdTransportAgency : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Note { get; set; }
    }
}
