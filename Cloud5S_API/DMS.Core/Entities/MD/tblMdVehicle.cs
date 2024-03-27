using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdVehicle : BaseEntity
    {
        [Required]
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        public double? UnladenWeight { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string DriverUserName { get; set; }

        public string TypeCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdUnit")]
        public string UnitCode { get; set; }

        [ForeignKey("UnitCode")]
        public virtual tblMdUnit Unit { get; set; }

        public virtual tblMdVehicleType VehicleType { get; set; }

        [ForeignKey("DriverUserName")]
        public virtual tblAdAccount DefaultDriver { get; set; }

        public virtual List<tblMdRfid> Rfids { get; set; }
    }
}
