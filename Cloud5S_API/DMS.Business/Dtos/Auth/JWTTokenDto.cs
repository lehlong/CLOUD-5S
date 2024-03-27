using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.Auth
{
    public class JWTTokenDto
    {
        public string accessToken { get; set; }

        public DateTime expireDate { get; set; }

        public string refreshToken { get; set; }

        public DateTime expireDateRefreshToken { get; set; }

        public tblAccountLoginDto accountInfo { get; set; }
    }
}
