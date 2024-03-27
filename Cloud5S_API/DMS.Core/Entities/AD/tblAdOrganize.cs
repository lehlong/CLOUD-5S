using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdOrganize : SoftDeleteEntity
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int? OrderNumber { get; set; }

        public string Type { get; set; }
        public string BusinessCode { get; set; }
       
    }
}
