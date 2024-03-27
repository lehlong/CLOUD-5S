using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdDevice : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string TypeCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string GroupCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string IpAddress { get; set; }

        public int IpPort { get; set; }

        public int DevicePort { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Username { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Password { get; set; }

        [ForeignKey("TypeCode")]
        public virtual tblMdDeviceType Type { get; set; }

        [ForeignKey("GroupCode")]
        public virtual tblMdDeviceGroup Group { get; set; }
    }
}
