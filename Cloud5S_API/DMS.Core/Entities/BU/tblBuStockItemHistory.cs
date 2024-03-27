using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockItemHistory : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string StockCode { get; set; }

        [Column(TypeName = "float")]
        public double? PrevAmount { get; set; }

        [Column(TypeName = "float")]
        public double? Amount { get; set; }

        [Column(TypeName = "float")]
        public double? ImportAmount { get; set; }

        [Column(TypeName = "float")]
        public double? ExportAmount { get; set; }

        [Column(TypeName = "date")]
        public DateTime ProcessDate { get; set; }

        public string WorkingShiftCode { get; set; }

        [Column(TypeName = "date")]
        public DateTime ProcessDate7H { get; set; }

        public string WorkingShiftCode7H { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("StockCode")]
        public virtual tblMdStock Stock { get; set; }

        [ForeignKey("WorkingShiftCode")]
        public virtual tblMdWorkingShift WorkingShift { get; set; }

        [ForeignKey("WorkingShiftCode7H")]
        public virtual tblMdWorkingShift WorkingShift7H { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
