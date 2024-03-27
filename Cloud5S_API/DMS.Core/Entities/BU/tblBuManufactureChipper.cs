using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations.Schema;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Entities.BU
{
    public class tblBuManufactureChipper : BaseEntity
    {
        public Guid Id { get; set; }

        public string ShiftCode { get; set; }

        [ForeignKey("ShiftCode")]
        public virtual tblMdWorkingShift WorkingShift { get; set; }

        public string ChipperCode { get; set; }

        [ForeignKey("ChipperCode")]
        public virtual tblMdChipper Chipper { get; set; }

        public DateTime? ProcessDate { get; set; }

        public double Amount { get; set; }
    }
}
