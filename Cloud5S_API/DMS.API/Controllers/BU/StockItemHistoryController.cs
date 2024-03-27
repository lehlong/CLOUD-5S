using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Stock;
using DMS.API.AppCode.Attribute;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockItemHistoryController : ControllerBase
    {
        public readonly IStockItemHistoryService _service;
        public StockItemHistoryController(IStockItemHistoryService service)
        {
            _service = service;
        }

        [CustomAuthorize(Right = "R3.2.3.1")]
        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] StockItemHistoryFilter filter)
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

        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] StockItemHistoryExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "BAOCAOXNT" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("Synthetic")]
        public async Task<IActionResult> SyntheticData([FromQuery] DateTime? fromDate)
        {
            var transferObject = new TransferObject();
            await _service.SyntheticData(fromDate);
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
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }
    }
}
