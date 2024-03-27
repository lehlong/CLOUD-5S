using Microsoft.AspNetCore.Http;
using MimeKit;

namespace DMS.BUSINESS.Dtos.Common
{
    public class MailData
    {
        public List<string> To { get; set; } = new List<string>();

        public List<string> Bcc { get; set; } = new List<string>();

        public List<string> Cc { get; set; } = new List<string>();

        public string Subject { get; set; } = string.Empty;

        public string Body { get; set; } = string.Empty;

        public MessagePriority Priority { get; set; }

        public List<IFormFile> Attachments { get; set; } = new();
    }
}
