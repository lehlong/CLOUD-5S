using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdWorkingShift")]
    public class tblMdWorkingShift : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName ="nvarchar(255)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Description { get; set; }

        [Column(TypeName = "TIME")]
        public TimeSpan FromHour { get; set; }

        [Column(TypeName = "TIME")]
        public TimeSpan ToHour { get; set; }

        public int OrdinalNumber { get; set; }
    }
}
