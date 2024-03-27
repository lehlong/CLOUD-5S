using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockExportDetail : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblBuStockExport")]
        [Column(TypeName = "varchar(50)")]
        public string ExportCode { get; set; }

        [Column(TypeName = "float")]
        public double? Amount { get; set; }

        public double? PrevAmount { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        public bool IsLast { get; set; }

        [ForeignKey("PourLineCode")]
        public tblMdPourLine PourLine { get; set; }

        [ForeignKey("PourSectionCode")]
        public tblMdPourSection PourSection { get; set; }

        public virtual tblBuStockExport Export { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
