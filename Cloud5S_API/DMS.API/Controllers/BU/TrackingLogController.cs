using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.BU.Tracking;
using DMS.BUSINESS.Dtos.BU;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingLogController : ControllerBase
    {
        public readonly ITrackingLogService _service;
        public TrackingLogController(ITrackingLogService service)
        {
            _service = service;
        }

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblTrackingLogCreateDto dto)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(dto);
            if (_service.Status)
            {
                transferObject.Data = result;
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0100", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0101", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] Guid Id)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetById(Id);
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

        [HttpGet("GetByOrder")]
        public async Task<IActionResult> GetByOrder([FromQuery] string Code)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetByOrder(Code);
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
