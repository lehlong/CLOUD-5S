using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Common.SQ
{
    [Table("_tblSequenceStockExport")]
    public class _tblSequenceStockExport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime? Time { get; set; }
    }
}
