using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Manufacture;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Filter.SO;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufactureController : ControllerBase
    {
        public readonly IManufactureService _service;
        public ManufactureController(IManufactureService service)
        {
            _service = service;
        }

        //[CustomAuthorize(Right = "R2.4.1")]
        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] ManufactureFilter filter)
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

        [HttpGet("SearchOrder")]
        public async Task<IActionResult> SearchOrder([FromQuery] OrderFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.SearchOrder(filter);
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

        [HttpGet("Shift")]
        public async Task<IActionResult> SearchByShift([FromQuery] ManufactureShiftFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.SearchByShift(filter);
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("BatchUpdate")]
        public async Task<IActionResult> BatchUpdate([FromBody] List<tblManufactureBatchUpdateDto> dto)
        {
            var transferObject = new TransferObject();
            await _service.BatchUpdate(dto);
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

        [HttpPut("BatchUpdateShift")]
        public async Task<IActionResult> BatchUpdateShift([FromBody] tblManufactureBatchUpdateShiftDto dto)
        {
            var transferObject = new TransferObject();
            await _service.BatchUpdateShift(dto);
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

        [HttpPut("LatchData")]
        public async Task<IActionResult> LatchData([FromQuery] DateTime LatchDate, string ShiftCode)
        {
            var transferObject = new TransferObject();
            await _service.LatchData(LatchDate, ShiftCode);
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

        [HttpPut("UnLatchData")]
        public async Task<IActionResult> UnLatchData([FromQuery] DateTime LatchDate, string ShiftCode)
        {
            var transferObject = new TransferObject();
            await _service.UnLatchData(LatchDate, ShiftCode);
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

        [HttpGet("ShiftDetail")]
        public async Task<IActionResult> GetByShift([FromQuery] ManufactureGetByShiftFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetByShift(filter);
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
        public async Task<IActionResult> Export([FromQuery] DateTime date)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(date);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",  "DSNhapXuat" + DateTime.Now.ToString() + ".xlsx");
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
