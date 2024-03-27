using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.AD;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.API.Controllers.AD
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemParameterController : ControllerBase
    {
        public readonly ISystemParameterService _service;
        public SystemParameterController(ISystemParameterService service)
        {
            _service = service;
        }

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail()
        {
            var transferObject = new TransferObject();
            var result = await _service.GetDetail();
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

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblSystemParameterDto systemParamterDto)
        {
            var transferObject = new TransferObject();
            await _service.Update(systemParamterDto);
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

