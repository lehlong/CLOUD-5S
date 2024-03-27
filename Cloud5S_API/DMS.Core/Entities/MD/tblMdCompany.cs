using DMS.CORE.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdCompany : BaseEntity
    {
        public Guid? Id { get; set; }

        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Type { get; set; }

        [Column(TypeName = "float")]
        public double? Latitude { get; set; }

        [Column(TypeName = "float")]
        public double? Longitude { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Address { get; set; }

        public virtual List<tblMdDepartment> Departments { get; set; }

    }
}
