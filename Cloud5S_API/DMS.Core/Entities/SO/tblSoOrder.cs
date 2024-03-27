using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrder : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderBatchCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PurchasingMethod { get; set; }

        public DateTime? OrderDate { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string AreaCode { get; set; }

        public bool? IsPaid { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdCompany")]
        public string CompanyCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string VehicleCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string DriverName { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Note { get; set; }

        [ForeignKey("tblSoScale")]
        public string ScaleCode { get; set; }

        [ForeignKey("tblMdWorkingShift")]
        public string WorkingShiftCode { get; set; }

        [ForeignKey("tblMdBerth")]
        public string BerthCode { get; set; }

        [ForeignKey("tblMdShip")]
        public string ShipCode { get; set; }

        public int? CargoCompartmentNumber { get; set; }

        public DateTime? GetOffTime { get; set; }

        [ForeignKey("WorkingShiftCode")]
        public tblMdWorkingShift WorkingShift { get; set; }

        [ForeignKey("CreateBy")]
        public virtual tblAdAccount Creator { get; set; }

        [ForeignKey("PartnerCode")]
        public virtual tblMdPartner Partner { get; set; }

        [ForeignKey("AreaCode")]
        public virtual tblMdArea Area { get; set; }

        [ForeignKey("CompanyCode")]
        public virtual tblMdCompany Company { get; set; }

        [ForeignKey("VehicleCode")]
        public virtual tblMdVehicle Vehicle { get; set; }

        public virtual List<tblSoOrderDetail> OrderDetails { get; set; }

        public virtual List<tblSoOrderProcess> OrderProcesses { get; set; }

        [ForeignKey("OrderBatchCode")]
        public virtual tblSoOrderBatch OrderBatch { get; set; }

        [ForeignKey("ScaleCode")]
        public virtual tblSoScale Scale { get; set; }

        public virtual List<tblBuManufacture> Manufactures { get; set; }

        public virtual List<tblBuManufacture> ManufactureStocks { get; set; }


        [ForeignKey("ShipCode")]
        public virtual tblMdShip Ship { get; set; }

        [ForeignKey("BerthCode")]
        public virtual tblMdBerth Berth { get; set; }

        public virtual tblBuMoisture Moisture { get; set; }

        public virtual ICollection<tblBuStockImport> Imports { get; set; }

        public virtual ICollection<tblBuStockExport> Exports { get; set; }

        public virtual ICollection<tblBuTracking> Trackings { get; set; }

        public virtual List<tblBuStockItemDetail> StockItemDetails { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
