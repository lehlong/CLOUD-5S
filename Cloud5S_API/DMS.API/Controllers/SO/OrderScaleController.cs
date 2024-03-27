using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.SO;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using Microsoft.AspNetCore.SignalR;
using DMS.BUSINESS.Services.HB;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderScaleController : ControllerBase
    {
        public readonly IOrderScaleService _service;
        public OrderScaleController(IOrderScaleService service, IHubContext<RefreshServiceHub> hubContext)
        {
            _service = service;
        }

        //[CustomAuthorize(Right = "R1.4.1")]
        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] OrderScaleFilter filter)
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

        //[CustomAuthorize(Right = "R1.4.2")]
        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] string Code)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetById(Code);
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
        public async Task<IActionResult> Export([FromQuery] OrderScaleExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSPhieuCan" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("ExportReport")]
        public async Task<IActionResult> ExportReport([FromQuery] OrderScaleExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportReport(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSBaocao" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblOrderScaleDto orderScaledto)
        {
            var transferObject = new TransferObject();
            await _service.Update(orderScaledto);
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

        [HttpPut("Sync")]
        public async Task<IActionResult> Sync([FromBody] List<tblOrderScaleSyncDto> dto)
        {
            var transferObject = new TransferObject();
            var result = await _service.Sync(dto);
            if (_service.Status)
            {
                transferObject.Data = result;
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

        [HttpGet("ReportScale")]
        public async Task<IActionResult> ReportScale([FromQuery] OrderScaleFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.ReportScale(filter);
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

        [HttpGet("ReportOrderScale")] 
        public async Task<IActionResult> ReportOrderScale([FromQuery] OrderScaleExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.ReportOrderScale(filter);
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
    }
}
