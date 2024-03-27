using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.BU;
using DMS.BUSINESS.Dtos.SO.OrderScale;

namespace DMS.API.Controllers.BU
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleAttachmentController : ControllerBase
    {
        public readonly IModuleAttachmentService _service;
        public ModuleAttachmentController(IModuleAttachmentService service)
        {
            _service = service;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Insert(IFormFile file, string moduleType, Guid? referenceId)
        {
            var transferObject = new TransferObject();  
            var result = await _service.Upload(file, moduleType, referenceId);
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

        [HttpGet("GetByReferenceId")]
        public async Task<IActionResult> GetByReferenceId([FromQuery] Guid ReferenceId)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetByReferenceId(ReferenceId);
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

        [HttpPost("BatchUpload")]
        public async Task<IActionResult> BatchUpload(List<IFormFile> files, string moduleType, Guid? referenceId)
        {
            var transferObject = new TransferObject();

            var result = await _service.UploadList(files, moduleType, referenceId);
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

        [HttpPost("UploadScaleImage")]
        public async Task<IActionResult> UploadScaleImage(List<SyncScaleRequestDto> model)
        {
            var transferObject = new TransferObject();

            var result = await _service.UploadScaleImage(model);
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
    }
}
