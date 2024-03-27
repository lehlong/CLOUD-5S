using DMS.BUSINESS.Services.AD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DMS.BUSINESS.Common.Class;
using DMS.API.AppCode.Enum;

namespace DMS.API.AppCode.Attribute
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        public string Right { get; set; }

        public CustomAuthorizeAttribute()
        {
        }
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (context != null)
            {
                var token = context.HttpContext?.Request?.Headers["Authorization"].ToString()?.Split(" ")?.ToList();

                if (token != null && token.Count > 1)
                {
                    JwtSecurityTokenHandler tokenHandler = new();
                    JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token[1]);

                    var claims = securityToken.Claims.ToList();
                    var username = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
                    var rightService = context.HttpContext.RequestServices.GetService(typeof(IRightService)) as RightService;

                    bool isRight = await rightService.CheckRight(this.Right, username);
                    if (!isRight)
                    {
                        var result = new TransferObject
                        {
                            Status = false
                        };
                        result.MessageObject.MessageType = MessageType.Error;
                        result.MessageObject.Message = $"Bạn chưa được phân quyền [{this.Right}]";
                        context.Result = new OkObjectResult(result);
                        return;
                    }
                }
                else
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
            }
        }
    }
}
