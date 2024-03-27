using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoOrderBatchVehicle")]
    public class tblSoOrderBatchVehicle : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrderBatch")]
        [Column(TypeName = "varchar(50)")]
        public string OrderBatchCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdVehicle")]
        public string VehicleCode { get; set; }

        public int DeliveryNumber { get; set; }

        public virtual tblSoOrderBatch OrderBatch { get; set; }

        public virtual tblMdVehicle Vehicle { get; set; }
    }
}
