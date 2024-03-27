using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCurrentCheckIn : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string VehicleCode { get; set; }

        public DateTime CheckInTime { get; set; }

        public string RfId { get; set; }
    }
}
