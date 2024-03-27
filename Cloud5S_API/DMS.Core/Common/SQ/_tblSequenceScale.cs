using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Common.SQ
{
    [Table("_tblSequenceScale")]
    public class _tblSequenceScale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime? Time { get; set; }
    }
}
