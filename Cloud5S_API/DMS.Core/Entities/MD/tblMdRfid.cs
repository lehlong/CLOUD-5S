using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdRfid : BaseEntity
    {
        [Key]
        public string Code { get; set; }

        [ForeignKey("tblMdVehicle")]
        public string VehicleCode { get; set; }

        [ForeignKey("VehicleCode")]
        public virtual tblMdVehicle Vehicle { get; set; }
    }
}
