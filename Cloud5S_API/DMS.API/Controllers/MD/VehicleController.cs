using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Services.MD;
using DMS.BUSINESS.Filter.MD;
using DMS.API.AppCode.Attribute;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        public readonly IVehicleService _service;
        public VehicleController(IVehicleService service)
        {
            _service = service;
        }

        [CustomAuthorize(Right = "R2.12.1")]
        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] VehicleFilter filter)
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

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] VehicleFilterLite filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetAll(filter);
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

        [CustomAuthorize(Right = "R2.12.2")]
        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblVehicleCreateDto vehicle)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(vehicle);
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

        [CustomAuthorize(Right = "R2.12.3")]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblVehicleUpdateDto vehicle)
        {
            var transferObject = new TransferObject();
            await _service.Update(vehicle);
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

        [CustomAuthorize(Right = "R2.12.4")]
        [HttpDelete("Delete/{code}")]
        public async Task<IActionResult> Delete([FromRoute] string code)
        {
            var transferObject = new TransferObject();
            await _service.Delete(code);
            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0105", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0106", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] string code)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetById(code);
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

        //[CustomAuthorize(Right = "R1.10.1")]
        //[HttpGet("Tracking")]
        //public async Task<IActionResult> GetTrackingVehicle([FromQuery] string KeyWord)
        //{
        //    var transferObject = new TransferObject();
        //    var result = await _service.GetTrackingVehicle(KeyWord);
        //    if (_service.Status)
        //    {
        //        transferObject.Data = result;
        //    }
        //    else
        //    {
        //        transferObject.Status = false;
        //        transferObject.MessageObject.MessageType = MessageType.Error;
        //        transferObject.GetMessage("0001", _service);
        //    }
        //    return Ok(transferObject);
        //}

        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] VehicleExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSPhuongTien" + DateTime.Now.ToString() + ".xlsx");
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
