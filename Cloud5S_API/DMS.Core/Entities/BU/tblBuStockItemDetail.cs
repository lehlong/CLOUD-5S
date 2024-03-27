using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockItemDetail : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "float")]
        public double Amount { get; set; }

        public string CompanyCode { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        public string ItemCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public string StockCode { get; set; }

        public string OrderCode { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("StockCode")]
        public virtual tblMdStock Stock { get; set; }   

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("AreaCode")]
        public virtual tblMdArea Area { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [ForeignKey("PourLineCode")]
        public tblMdPourLine PourLine { get; set; }

        [ForeignKey("PourSectionCode")]
        public tblMdPourSection PourSection { get; set; }   

        [ForeignKey("CompanyCode")]
        public tblMdCompany Company { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
