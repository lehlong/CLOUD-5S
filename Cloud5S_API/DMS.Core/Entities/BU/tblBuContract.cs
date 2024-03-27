using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuContract")]
    public class tblBuContract : ReferenceEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdPartner")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Content { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Column(TypeName = "nvarchar(1000)")]
        public string Note { get; set; }

        [ForeignKey("PartnerCode")]
        public virtual tblMdPartner Partner { get; set; }

        public virtual List<tblBuContractDetail> Details { get; set; }
    }
}
