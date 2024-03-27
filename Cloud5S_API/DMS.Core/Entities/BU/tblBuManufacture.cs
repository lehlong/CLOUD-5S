using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.SO;

namespace DMS.CORE.Entities.BU
{
    public class tblBuManufacture : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblSoOrder")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ProcessType { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? PrevAmount { get; set; }

        public double? Amount { get; set; }

        public string ItemCode { get; set; }

        public string UnitCode { get; set; }

        public string AreaCode { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PickUpMethod { get; set; }

        public Guid? LatchId { get; set; }

        public string OrderCodeFromStock { get; set; }

        [ForeignKey("OrderCodeFromStock")]
        public virtual tblSoOrder OrderFromStock { get; set; }

        [ForeignKey("LatchId")]
        public virtual tblBuManufactureLatch Latch { get; set; }

        [ForeignKey("PourLineCode")]
        public virtual tblMdPourLine PourLine { get; set; }

        [ForeignKey("PourSectionCode")]
        public virtual tblMdPourSection PourSection { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [ForeignKey("AreaCode")]
        public virtual tblMdArea Area { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdWorkingShift")]
        public string ProcessWorkingShiftCode { get; set; }

        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("ProcessWorkingShiftCode")]
        public virtual tblMdWorkingShift ProcessWorkingShift { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
