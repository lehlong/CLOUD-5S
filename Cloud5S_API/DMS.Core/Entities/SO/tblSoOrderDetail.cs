using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrderDetail : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdUnit")]
        public string UnitCode { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        public double OrderNumber { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
