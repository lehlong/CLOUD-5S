using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Services.AD;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DMS.API.AppCode.Attribute
{
    public class ActionLogAttribute : ActionFilterAttribute
    {
        public string Name { get; set; }

        public ActionLogAttribute(string name)
        {
            Name = name;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var actionLogService = context.HttpContext.RequestServices.GetService(typeof(IActionLogService)) as ActionLogService;

            var body = context.HttpContext.Request.ReadBodyFromRequest().Result;

            var token = context?.HttpContext?.Request?.Headers["Authorization"].ToString()?.Split(" ")?.ToList();
            List<Claim> _Claims = new();
            string userName = string.Empty;
            if (token != null && token.Count > 1)
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token[1]);
                _Claims = securityToken.Claims.ToList();
                userName = _Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            }

            await actionLogService.Add(new ActionLogCreateDto()
            {
                Body = body,
                UserName = userName,
                ActionName = Name,
            });

             await base.OnActionExecutionAsync(context, next);
        }
    }
}
