using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdMenu : SoftDeleteEntity
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int OrderNumber { get; set; }

        public string RightId { get; set; }
        public string Url { get; set; }

        public string Icon { get; set; }
    }
}
