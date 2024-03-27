using Microsoft.AspNetCore.Mvc;
using DMS.BUSINESS.Dtos.Auth;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.Auth;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace DMS.API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginInfo)
        {
            var transferObject = new TransferObject();
            var loginResult = await _service.Login(loginInfo);
            if (_service.Status)
            {
                transferObject.Data = loginResult;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("1000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            var transferObject = new TransferObject();
            var loginResult = await _service.RefreshToken(refreshTokenDto);
            if (_service.Status)
            {
                transferObject.Data = loginResult;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage(_service.MessageObject.Code, _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> Update([FromBody] ChangePasswordDto accountGroup)
        {
            var transferObject = new TransferObject();
            await _service.ChangePassword(accountGroup);

            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0103", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0104", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("SendOTP")]
        public async Task<IActionResult> SendOTP([FromBody] SendOtpDto dto)
        {
            var transferObject = new TransferObject();
            await _service.SendOtp(dto);
            if (_service.Status)
            {
                transferObject.Data = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage(_service.MessageObject.Code, _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage(_service.MessageObject.Code, _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            var transferObject = new TransferObject();
            await _service.ForgotPassword(dto);

            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0103", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0104", _service);
            }
            return Ok(transferObject);
        }
    }
}
