using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Common.Authentication
{
    public class JWTTokenResponse
    {
        public string Token { get; set; }
        public tblAdAccount User { get;set; }

        public List<string> ListRight { get; set; }

    }
}
