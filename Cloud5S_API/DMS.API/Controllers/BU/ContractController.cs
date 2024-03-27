using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Contract;
using DMS.API.Request;
using DMS.BUSINESS.Common.Enum;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        public readonly IContractService _service;
        public ContractController(IContractService service)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] ContractFilter filter)
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

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] string Id)
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

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblContractCreateDto Contract)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(Contract);
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
        public async Task<IActionResult> Update([FromBody] tblContractUpdateDto Contract)
        {
            var transferObject = new TransferObject();
            await _service.Update(Contract);
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

        [HttpDelete("Delete/{Code}")]
        public async Task<IActionResult> Delete([FromRoute] string Code)
        {
            var transferObject = new TransferObject();
            await _service.Delete(Code);
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

        [HttpPut("ConfirmState")]
        public async Task<IActionResult> ConfirmState([FromBody] ContractUpdateStateRequest dto)
        {
            var transferObject = new TransferObject();
            await _service.UpdateState(new tblContractUpdateStateDto()
            {
                Code = dto.Code,
                State = ContractState.DA_XAC_NHAN.ToString(),
            });
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

        [HttpPut("CancelState")]
        public async Task<IActionResult> CancelState([FromBody] ContractUpdateStateRequest dto)
        {
            var transferObject = new TransferObject();
            await _service.UpdateState(new tblContractUpdateStateDto()
            {
                Code = dto.Code,
                State = ContractState.DA_BI_HUY.ToString(),
            }); if (_service.Status)
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
        public async Task<IActionResult> Export([FromQuery] ContractExportFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DSHopDong" + DateTime.Now.ToString() + ".xlsx");
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
