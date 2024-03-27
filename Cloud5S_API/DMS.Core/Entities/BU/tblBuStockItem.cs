using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockItem : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        [Column(TypeName = "float")]
        public double Amount { get; set; }

        public string CompanyCode { get; set; }

        public string StockCode { get; set; }

        public virtual tblMdItem Item { get; set; }

        [ForeignKey("CompanyCode")]
        public tblMdCompany Company { get; set; }

        [ForeignKey("StockCode")]
        public virtual tblMdStock Stock { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
