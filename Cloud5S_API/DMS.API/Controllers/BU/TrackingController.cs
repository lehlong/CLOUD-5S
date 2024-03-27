using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Dtos.MD.Tracking;
using DMS.BUSINESS.Filter.MD;
using DMS.BUSINESS.Services.BU.Tracking;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingController : ControllerBase
    {
        private readonly ITrackingService _service;

        public TrackingController(ITrackingService trackingService)
        {
            _service = trackingService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var transferObject = new TransferObject();
            var result = await _service.GetAll();
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

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblTrackingCreateDto unit)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(unit);
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

        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] string vehicle, string orderCode)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(vehicle, orderCode);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSTracking" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromQuery] string vehicle, string orderCode)
        {
            var transferObject = new TransferObject();
            await _service.Delete(orderCode, vehicle);
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

        [HttpGet("Location")]
        public async Task<IActionResult> GetLocation([FromQuery]TrackingFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetLocation(filter);
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

        [HttpGet("StationLocation")]
        public async Task<IActionResult> GetStationLocation()
        {
            var transferObject = new TransferObject();
            var result = await _service.GetStationLocation();
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
