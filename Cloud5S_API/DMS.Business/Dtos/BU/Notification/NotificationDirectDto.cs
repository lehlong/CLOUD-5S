namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class NotificationDirectDto
    {
        public int? PushNotificationId { get; set; }
        public int? SMSNotificationId { get; set; }
        public bool? SendPush { get; set; }
        public bool? SendSMS { get; set; }
    }
}
