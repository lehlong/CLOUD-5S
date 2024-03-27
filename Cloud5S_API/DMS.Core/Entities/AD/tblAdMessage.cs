using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdMessage : SoftDeleteEntity
    {
        [Key]
        public string Code { get; set; }

        public string Lang { get; set; }

        public string Value { get; set; }
    }
}
