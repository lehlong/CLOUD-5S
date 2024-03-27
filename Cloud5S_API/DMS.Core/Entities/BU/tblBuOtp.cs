using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuOtp")]
    public class tblBuOtp : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }

        [ForeignKey("UserName")]
        public virtual tblAdAccount Account { get; set; }

        public string Code { get; set; }

        public bool? IsEmailOTP { get; set; }

        public bool? IsPhoneNumberOTP { get; set; }

        [Column(TypeName = "varchar(100)" )]
        public string Reception { get; set; }
    }
}
