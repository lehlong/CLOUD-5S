using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.MD
{
    public class tblMdVehicleType : BaseEntity
    {
        [Required]
        [MaxLength(20)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; }

        public virtual List<tblMdVehicle> ListVehicle { get; set; }

        public tblMdVehicleType()
        {
            ListVehicle = new List<tblMdVehicle>();
        }
    }
}
