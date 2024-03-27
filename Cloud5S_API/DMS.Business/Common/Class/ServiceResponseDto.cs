namespace DMS.BUSINESS.Common.Class
{
    public class ServiceResponseDto
    {
        public MessageObject MessageObject { get; set; }
        public Exception Exception { get; set; }
        public bool Status { get; set; }
        public object Data { get; set; }
    }
}
