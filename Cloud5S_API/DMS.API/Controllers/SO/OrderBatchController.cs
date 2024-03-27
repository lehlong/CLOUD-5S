using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.SO;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Dtos.SO.OrderBatch;
using DMS.BUSINESS.Common.Enum;
using DMS.API.Request;
using DMS.BUSINESS.Dtos.SO.Order;

namespace DMS.API.Controllers.SO
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBatchController : BaseController
    {
        public readonly IOrderBatchService _service;
        public OrderBatchController(IOrderBatchService service, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] OrderBatchFilter filter)
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
                transferObject.GetMessage("2000", _service);
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
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblOrderBatchCreateDto dto)
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

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblOrderBatchUpdateDto dto)
        {
            var transferObject = new TransferObject();
            await _service.Update(dto);
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

        [HttpGet("Vehicle")]
        public async Task<IActionResult> GetVehicle([FromQuery] OrderBatchVehicleFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetVehicle(filter);
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

        [HttpPut("CancelState")]
        public async Task<IActionResult> UpdateCancelState([FromBody] OrderUpdateStateRequest request)
        {
            tblOrderBatchUpdateStateDto model = new()
            {
                Code = request.Code,
                State = OrderBatchState.DA_HUY.ToString()
            };

            var transferObject = new TransferObject();
            await _service.UpdateStep(model);
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

        [HttpPut("Complete")]
        public async Task<IActionResult> UpdateCompleteMixState([FromBody] OrderUpdateStateRequest request)
        {
            tblOrderBatchUpdateStateDto model = new()
            {
                Code = request.Code,
                State = OrderBatchState.DA_KET_THUC.ToString()
            };

            var transferObject = new TransferObject();
            await _service.UpdateStep(model);
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
        public async Task<IActionResult> Export([FromQuery] OrderBatchExportExcelFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSDotXuatHang" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpPut("RefreshNumber")]
        public async Task<IActionResult> RefreshNumber()
        {
            var transferObject = new TransferObject();
            await _service.RefreshNumber();
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
