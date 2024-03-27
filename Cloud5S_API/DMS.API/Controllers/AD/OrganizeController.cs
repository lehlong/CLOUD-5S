using DMS.API.AppCode.Attribute;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Services.AD;
using Microsoft.AspNetCore.Mvc;

namespace DMS.API.Controllers.AD
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizeController : ControllerBase
    {
        public readonly IOrganizeService _service;
        public OrganizeController(IOrganizeService service)
        {
            _service = service;
        }

        [CustomAuthorize(Right = "R5.1.1")]
        [HttpGet("GetOrganizeTree/{businessCode}")]
        public async Task<IActionResult> GetOrganizeTree([FromRoute] string businessCode)
        {
            var transferObject = new TransferObject();
            var result = await _service.BuildDataForTree(businessCode);
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

        [CustomAuthorize(Right = "R5.1.5")]
        [HttpPut("Update-Order")]
        public async Task<IActionResult> UpdateOrganize([FromBody] tblAdOrganizeDto moduleDto)
        {
            var transferObject = new TransferObject();
            await _service.UpdateOrderTree(moduleDto);
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

        [CustomAuthorize(Right = "R5.1.2")]
        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblAdOrganizeDto OrganizeDto)
        {
            var transferObject = new TransferObject();
            var result = await _service.Add(OrganizeDto);
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

        [CustomAuthorize(Right = "R5.1.3")]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblAdOrganizeDto moduleDto)
        {
            var transferObject = new TransferObject();
            await _service.Update(moduleDto);
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



        [CustomAuthorize(Right = "R5.1.4")]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] tblAdOrganizeDto moduleDto)
        {
            var transferObject = new TransferObject();

            var result = await _service.Delete(moduleDto.Id);
            if (_service.Status && result != null)
            {
                transferObject.Status = true;
                transferObject.Data = result;
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


    }
}
