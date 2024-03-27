using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrderBatchDetail : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderBatchCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public double OrderNumber { get; set; }

        public double? ReleaseNumber { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdUnit")]
        public string UnitCode { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }


        [ForeignKey("OrderBatchCode")]
        public virtual tblSoOrderBatch OrderBatch { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }
    }
}
