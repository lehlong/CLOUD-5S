using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuTracking")]
    public class tblBuTracking : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public double? Heading {get;set;}

        public double? Speed { get; set; }

        [Column(TypeName = "Datetime2")]
        public DateTime TimeStamp { get; set; }

        [Column(TypeName = "Datetime2")]
        public DateTime SentTime { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }
    }
}
