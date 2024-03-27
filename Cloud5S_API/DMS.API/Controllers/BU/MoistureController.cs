using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.BU.Moisture;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.SO;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoistureController : ControllerBase
    {
        public readonly IMoistureService _service;
        public MoistureController(IMoistureService service)
        {
            _service = service;
        }


        [HttpPut("BatchUpdate")]
        public async Task<IActionResult> BatchUpdate([FromBody] List<tblMoistureCreateUpdateDto> dto)
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


        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] BaseExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSCSKH" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("ExportReportMoistureExcel")]
        public async Task<IActionResult> ExportReportMoistureExcel([FromQuery] OrderExportByDayFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportReportMoistureExcel(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSBaoCaoDoAm" + DateTime.Now.ToString() + ".xlsx");
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
