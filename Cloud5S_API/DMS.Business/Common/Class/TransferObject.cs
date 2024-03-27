namespace DMS.BUSINESS.Common.Class
{
    public class TransferObject
    {
        public bool Status { get; set; }
        public object Data { get; set; }
        public MessageObject MessageObject { get; set; }
        public TransferObject()
        {
            Status = true;
            MessageObject = new MessageObject();
        }
    }
}
