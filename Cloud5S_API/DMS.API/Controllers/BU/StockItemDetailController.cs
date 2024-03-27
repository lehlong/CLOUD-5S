using DMS.API.AppCode.Enum;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.BU.Stock;
using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Dtos.BU;

namespace DMS.API.Controllers.BU
{

    [Route("api/[controller]")]
    [ApiController]
    public class StockItemDetailController : ControllerBase
    {
        public readonly IStockItemDetailService _service;
        public StockItemDetailController(IStockItemDetailService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] StockItemDetailFilter filter)
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

        [HttpGet("GroupSearch")]
        public async Task<IActionResult> GroupSearch([FromQuery] StockItemDetailFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GroupSearch(filter);
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
        public async Task<IActionResult> Export([FromQuery] StockItemDetailFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "BAO_CAO_TON_KHO" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpPut("Transfer")]
        public async Task<IActionResult> TransferStock([FromBody] tblStockItemDetailTransferDto model)
        {
            var transferObject = new TransferObject();
            await _service.TransferStock(model);
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
