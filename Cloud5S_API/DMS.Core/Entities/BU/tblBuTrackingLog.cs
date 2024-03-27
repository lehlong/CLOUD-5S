using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuTrackingLog")]
    public class tblBuTrackingLog : BaseEntity
    {
        public Guid Id { get; set; }

        public string DriverUserName { get; set; }

        [ForeignKey("DriverUserName")]
        public virtual tblAdAccount Driver { get; set; }

        public string OrderCode { get; set; }

        public virtual tblSoOrder Order { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Reason { get; set; }

        public DateTime? LogTime { get; set; }
    }
}
