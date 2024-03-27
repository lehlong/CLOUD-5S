using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCheckInOut : ReferenceEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdVehicle")]
        public string VehicleCode { get; set; }

        public string OrderCode { get; set; }

        public DateTime CheckInTime { get; set; }

        public DateTime? CheckOutTime { get; set; }

        public string RfId { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }   
    }
}
