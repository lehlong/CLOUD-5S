using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockItemTransferLog : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "float")]
        public double Amount { get; set; }

        public string CompanyCode { get; set; }

        public string FromPourLineCode { get; set; }

        public string FromPourSectionCode { get; set; }

        public string OrderCode { get; set; }

        public virtual tblSoOrder Order { get; set; }

        public string ToPourLineCode { get; set; }

        public string ToPourSectionCode { get; set; }

        public string ItemCode { get; set; }

        public string AreaCode { get; set; }

        public string UnitCode { get; set; }

        public string StockCode { get; set; }

        [ForeignKey("StockCode")]
        public virtual tblMdStock Stock { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("AreaCode")]
        public virtual tblMdArea Area { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [ForeignKey("FromPourLineCode")]
        public tblMdPourLine FromPourLine { get; set; }

        [ForeignKey("FromPourSectionCode")]
        public tblMdPourSection FromPourSection { get; set; }

        [ForeignKey("CompanyCode")]
        public tblMdCompany Company { get; set; }

        [ForeignKey("ToPourLineCode")]
        public tblMdPourLine ToPourLine { get; set; }

        [ForeignKey("ToPourSectionCode")]
        public tblMdPourSection ToPourSection { get; set; }

    }
}
