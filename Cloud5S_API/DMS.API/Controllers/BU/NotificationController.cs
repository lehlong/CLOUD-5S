using Microsoft.AspNetCore.Mvc;
using DMS.BUSINESS.Services.BU.Notìication;
using DMS.API.AppCode.Enum;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.Common;
using DMS.API.AppCode.Extensions;
using DMS.API.Request;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.BUSINESS.Filter.BU;
using DMS.API.AppCode.Attribute;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : BaseController
    {
        private readonly INotificationService _service;

        public NotificationController(IHttpContextAccessor contextAccessor, INotificationService service) : base(contextAccessor)
        {
            _service = service;
        }

        [CustomAuthorize(Right = "R1.9.1")]
        [HttpGet("ManagerSearch")]
        public async Task<IActionResult> Search([FromQuery] NotificationFilter filter)
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [CustomAuthorize(Right = "R1.9.2")]
        [HttpGet("ManagerGetById")]
        public async Task<IActionResult> GetById([FromQuery] int Id)
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [CustomAuthorize(Right = "R1.9.3")]
        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblNotificationCreateDto model)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(model, UserName);
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
        public async Task<IActionResult> GetMessageDetail([FromQuery] int Id)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetMessageDetail(Id, UserName);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("Search")]
        public async Task<IActionResult> GetUserNotification([FromQuery] BaseFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetUserNotification(filter, UserName);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("Seen")]
        public async Task<IActionResult> Seen([FromBody] NotificationRequest request)
        {
            var transferObject = new TransferObject();
            await _service.UpdateSeenState(request.Id, UserName, true);
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

        [HttpPut("UnSeen")]
        public async Task<IActionResult> UnSeen([FromBody] NotificationRequest request)
        {
            var transferObject = new TransferObject();
            await _service.UpdateSeenState(request.Id, UserName, false);
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

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromQuery] NotificationRequest request)
        {
            var transferObject = new TransferObject();
            await _service.Delete(request.Id, UserName);
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

        [HttpGet("Quantity")]
        public async Task<IActionResult> GetQuantity()
        {
            var transferObject = new TransferObject();
            var result = await _service.GetQuantity(UserName);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] NotificationExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSThongbao" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }
    }
}
