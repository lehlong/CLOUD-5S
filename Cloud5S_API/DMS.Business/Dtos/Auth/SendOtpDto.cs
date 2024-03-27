namespace DMS.BUSINESS.Dtos.Auth
{
    public class SendOtpDto
    {
        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}
