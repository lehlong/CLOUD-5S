using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DMS.API.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private List<Claim> _Claims;
        public BaseController(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
            try
            {
                var token = _contextAccessor?.HttpContext?.Request?.Headers["Authorization"].ToString()?.Split(" ")?.ToList();
                if (token != null && token.Count > 1)
                {
                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token[1]);
                    _Claims = securityToken.Claims.ToList();
                }
            }
            catch (Exception)
            {
                _Claims = new();
            }
        }

        protected string UserName
        {
            get
            {
                try
                {
                    return _Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        protected string FullName
        {
            get
            {
                try
                {
                    return _Claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }
    }
}
