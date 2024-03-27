using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Common
{
    public class SoftDeleteEntity : BaseEntity, ISoftDeleteEntity
    {
        public bool? IsDeleted { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DeleteDate { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string DeleteBy { get; set; }
    }
}
