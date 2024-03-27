using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrderBatch : ReferenceEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PurchasingMethod { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdShip")]
        public string ShipCode { get; set; }

        public double ExpectNumber { get; set; }

        public double ReleaseNumber { get; set; }

        public double CompleteNumber { get; set; }

        public int DeliveryNumber { get; set; }

        public int CompleteDeliveryNumber { get; set; }

        public int DeliveringNumber { get; set; }

        public string CustomsDeclaration { get; set; } //To khai hai quan

        [Column(TypeName = "nvarchar(1000)")]
        public string Note { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }

        [ForeignKey("PartnerCode")]
        public virtual tblMdPartner Partner { get; set; }

        public virtual List<tblSoOrderBatchDetail> OrderBatchDetails { get; set; }

        [ForeignKey("ShipCode")]
        public virtual tblMdShip Ship { get; set; }

        public int TotalVehicle { get => Vehicles.Select(x => x.VehicleCode).Distinct().Count(); }

        public virtual List<tblSoOrderBatchVehicle> Vehicles { get; set; }

        public virtual List<tblSoOrder> Orders { get; set; }

        public virtual List<tblSoOrderBatchProcess> Processes { get; set; }

    }
}
