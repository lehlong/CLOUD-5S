using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.AD;

namespace DMS.CORE.Entities.BU
{
    public class tblBuStockImportDetail : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblBuStockImport")]
        [Column(TypeName = "varchar(50)")]
        public string ImportCode { get; set; }

        [Column(TypeName = "float")]
        public double? Amount { get; set; }

        public string PourLineCode { get; set; }

        public string PourSectionCode { get; set; }

        public bool IsLast { get; set; }

        [ForeignKey("PourLineCode")]
        public tblMdPourLine PourLine { get; set; }

        [ForeignKey("PourSectionCode")]
        public tblMdPourSection PourSection { get; set; }

        public virtual tblBuStockImport Import { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Account { get; set; }
    }
}
