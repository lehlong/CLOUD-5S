using System.Text;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class NotificationMessage
    {
        public int? PushNotificationId { get; set; }
        public int SMSNotificationId { get; set; }
        public NotificationOneSignalDto Notification { get; set; } = new();
        public string PhoneNumber { get; set; } = string.Empty;
        public string ClientCode { get; set; }
        public List<string> UserNames { get; set; } = new();
    }

    public class NotificationOneSignalDto
    {
        public string app_id { get; set; } = string.Empty;

        public Dictionary<string, string> headings { get; set; } = new();

        public Dictionary<string, string> subtitle = new();

        public Dictionary<string, string> contents { get; set; } = new();

        public NotificationDataDto data { get; set; } = new();

        public string url { get; set; } = string.Empty;

        public string big_picture { get; set; } = string.Empty;
    }

    public class NotificationDto
    {
        public string Headings { get; private set; }

        public string SubTitle { get; private set; }

        public string Content { get; private set; } = string.Empty;

        public NotificationDataDto Data { get; private set; }

        public NotificationDto(string headings, string subTitle, string content)
        {
            Headings = Encoding.UTF8.GetString(Encoding.UTF8.GetBytes(headings));
            SubTitle = Encoding.UTF8.GetString(Encoding.UTF8.GetBytes(subTitle));
            Content = Encoding.UTF8.GetString(Encoding.UTF8.GetBytes(content));
            Data = new();
        }

        public NotificationDto(NotificationDto template, SendNotificationInputDto input)
        {
            Headings = template.Headings;
            SubTitle = template.SubTitle;
            Content = template.Content;
            if (input.MessageParameter != null && input.MessageParameter.Any())
            {
                foreach (var item in input.MessageParameter)
                {
                    Content = Content.Replace(item.Key, item.Value);
                }
            }
            else
            {
                Content = template.Content;
            }
            Data = new()
            {
                NotificationData = new()
                {
                    Contents = Content,
                    Headings = Headings,
                    IsSeen = false,
                    Subtitle = SubTitle,
                }
            };
        }
    }

    public class SendNotificationInputDto
    {
        public Dictionary<string, string> MessageParameter { get; set; } = new();
    }

    public class NotificationDataDto
    {
        public tblNotificationSearchDto NotificationData { get; set; } = new();
    }
}
