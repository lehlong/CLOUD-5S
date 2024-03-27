using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Common
{
    public class BaseEntity : IBaseEntity
    {
        public bool? IsActive { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string CreateBy { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string UpdateBy { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? CreateDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? UpdateDate { get; set; }
    }
}
