using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Stock;
using Microsoft.AspNetCore.Mvc;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockItemController : ControllerBase
    {
        private readonly IStockItemService _service;

        public StockItemController(IStockItemService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] StockItemFilter filter)
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


        [HttpGet("Export0H")]
        public async Task<IActionResult> ExportDailyFrom0H([FromQuery]DateTime fromDate, DateTime toDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportDailyFrom0H(fromDate,toDate);
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

        [HttpGet("DownloadExport")]
        public async Task<IActionResult> ExportDailyFrom0HDownload([FromQuery] DateTime fromDate, DateTime toDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportDailyFrom0HDownload(fromDate,toDate);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"BC0H{fromDate:ddMMM}-{toDate:ddMMM}" + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("Export7H")]
        public async Task<IActionResult> ExportDailyFrom7H([FromQuery] DateTime fromDate, DateTime toDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportDailyFrom7H(fromDate, toDate);
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

        [HttpGet("DownloadExport7H")]
        public async Task<IActionResult> ExportDailyFrom7HDownload([FromQuery] DateTime fromDate, DateTime toDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportDailyFrom7HDownload(fromDate, toDate);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"BC7H{fromDate:ddMMM}-{toDate:ddMMM}" + ".xlsx");
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
