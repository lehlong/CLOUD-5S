using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class tblNotificationSearchDto : SoftDeleteBaseDto
    {
        [Key]
        public int Id { get; set; }

        public string Headings { get; set; }

        public string Subtitle { get; set; }

        public string Contents { get; set; }

        public string HtmlContents { get; set; }

        public string Url { get; set; }

        public int? Type { get; set; }

        public bool? IsSeen { get; set; }

        public bool? IsSent { get; set; }
    }
}
