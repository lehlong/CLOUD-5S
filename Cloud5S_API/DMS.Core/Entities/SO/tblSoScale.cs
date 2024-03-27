using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoScale")]
    public class tblSoScale : ReferenceEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ScaleTypeCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string VehicleCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string DriverName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdUnit")]
        public string UnitCode { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdCompany")]
        public string CompanyCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Note { get; set; }

        [Column(TypeName = "float")]
        public double? Weight1 { get; set; }

        [Column(TypeName = "float")]
        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        [Column(TypeName = "float")]
        public double? Weight { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string SyncCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdArea")]
        public string AreaCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string BillNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string InvoiceNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string InvoiceTemplate { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string InvoiceSymbol { get; set; }

        [ForeignKey("AreaCode")]
        public tblMdArea Area { get; set; }

        [ForeignKey("CompanyCode")]
        public virtual tblMdCompany Company { get; set; }

        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("PartnerCode")]
        public virtual tblMdPartner Partner { get; set; }

        [ForeignKey("ItemCode")]
        public virtual tblMdItem Item { get; set; }

        public virtual List<tblSoScaleImage> Images { get; set; }

        public virtual tblMdVehicle Vehicle { get; set; }

        public bool? IsCanceled { get; set; }

        [Timestamp]
        public byte[] ConcurrencyToken { get; set; }
    }
}
