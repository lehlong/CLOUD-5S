using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoOrderBatchProcess")]
    public class tblSoOrderBatchProcess : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderBatchCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ActionCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PrevState { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        public virtual tblSoOrderBatch OrderBatch { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Account { get; set; }
    }
}
