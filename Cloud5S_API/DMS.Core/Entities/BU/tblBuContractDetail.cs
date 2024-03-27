using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuContractDetail")]
    public class tblBuContractDetail : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblBuContract")]
        public string ContractCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdItem")]
        public string ItemCode { get; set;}

        public double? OrderNumber { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        [ForeignKey("ContractCode")]
        public virtual tblBuContract Contract { get; set; }
    }
}
