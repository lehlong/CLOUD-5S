using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockExport : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        public string OrderCode { get; set; }

        public DateTime? ExportDate { get; set; }

        public string StockCode { get; set; }

        public string CompanyCode { get; set; }

        public string ShiftCode { get; set; }

        public string OrderCodeFromStock { get; set; }

        [Column(TypeName = "Date")]
        public DateTime? ExportDate7H { get; set; }

        public string ShiftCode7H { get; set; }

        [ForeignKey("tblMdItem")]
        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public string AreaCode { get; set; }

        public double? Amount { get; set; }

        [ForeignKey("AreaCode")]
        public virtual tblMdArea Area { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [ForeignKey("ShiftCode7H")]
        public virtual tblMdWorkingShift WorkingShift7H { get; set; }

        [ForeignKey("ShiftCode")]
        public virtual tblMdWorkingShift WorkingShift { get; set; }

        public virtual ICollection<tblBuStockExportDetail> ExportDetails { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }

        [ForeignKey("UpdateBy")]
        public virtual tblAdAccount Updater { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("StockCode")]
        public virtual tblMdStock Stock { get; set; }

        [ForeignKey("CompanyCode")]
        public virtual tblMdCompany Company { get; set; }
    }
}
