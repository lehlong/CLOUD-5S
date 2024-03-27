using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuManufactureLatch : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime? LatchDate { get; set; }

        public string LatchShiftCode { get; set; }

        public string Note { get; set; }

        public string State { get; set; }

        public bool CanReverse { get; set; }

        [ForeignKey("LatchShiftCode")]
        public virtual tblMdWorkingShift WorkingShift { get; set; }

        public virtual List<tblBuManufacture> Manufactures { get; set; }
    }
}
