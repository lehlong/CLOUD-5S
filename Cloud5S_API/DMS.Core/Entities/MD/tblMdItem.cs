using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdItem : BaseEntity
    {
        public Guid Id { get; set; }

        [Key]
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UnitCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public bool IsManufacture { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [ForeignKey("TypeCode")]
        public virtual tblMdItemType ItemType { get; set; }

        public virtual tblBuItemFormula ItemFormula { get; set; }

        public virtual ICollection<tblSoOrderDetail> OrderDetails { get; set; }

        public virtual ICollection<tblSoScale> Scales { get; set; }

        public virtual ICollection<tblBuStockItemHistory> StockItemHistories { get; set; }

        public virtual ICollection<tblBuStockItem> StockItems { get; set; }

    }
}
