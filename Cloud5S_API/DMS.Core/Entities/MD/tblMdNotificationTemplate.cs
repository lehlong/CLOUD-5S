using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdNotificationTemplate")]
    public class tblMdNotificationTemplate : BaseEntity
    { 
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string TemplateCode { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string TemplateName { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string SubTitle { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Message { get; set; }
    }
}
