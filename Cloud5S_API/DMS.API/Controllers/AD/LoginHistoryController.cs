using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.AD;
using DMS.BUSINESS.Services.AD;
using Microsoft.AspNetCore.Mvc;

namespace DMS.API.Controllers.AD
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginHistoryController : ControllerBase
    {
        private readonly ILoginHistoryService _service;

        public LoginHistoryController(ILoginHistoryService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] LoginHistoryFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Search(filter);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }
    }
}
