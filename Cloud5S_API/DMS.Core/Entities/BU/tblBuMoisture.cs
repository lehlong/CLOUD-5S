using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuMoisture")]
    public class tblBuMoisture : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("OrderCode")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string ProcessBy { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double? TrayWeight { get; set; }

        public double? TrayWetWeight { get; set; }

        public double? WetWeight { get; set; }

        public double? TrayDryWeight { get; set; }

        public double? DryWeight { get; set; }

        public double? Moisture { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Remark { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Note { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

    }
}
