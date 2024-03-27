using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.SO;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Dtos.SO.Order;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        public readonly IOrderService _service;
        public OrderController(IOrderService service, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _service = service;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] OrderFilter filter)
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

        [HttpGet("ReportMoisture")]
        public async Task<IActionResult> ReportMoisture([FromQuery] OrderFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.SearchForMoisture(filter);
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

        [HttpGet("SearchOrderByUpdate")]
        public async Task<IActionResult> SearchOrderByUpdate([FromQuery] OrderFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.SearchOrderByUpdate(filter);
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

        //[CustomAuthorize(Right = "R1.1.1")]
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

        //[CustomAuthorize(Right = "R1.1.2")]
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

        [HttpGet("GetDetailByScale")]
        public async Task<IActionResult> GetByScale([FromQuery] string code)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetByScale(code);
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

        [HttpPut("ConfirmPay")]
        public async Task<IActionResult> ConfirmPay([FromBody] tblOrderUpdateStateDto dto)
        {
            var transferObject = new TransferObject();
            await _service.ConfirmPay(dto);
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

        [HttpPut("CancelPay")]
        public async Task<IActionResult> CancelPay([FromBody] tblOrderUpdateStateDto dto)
        {
            var transferObject = new TransferObject();
            await _service.CancelPay(dto);
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

        [HttpPut("UpdateBerth")]
        public async Task<IActionResult> UpdateBerth([FromBody] tblOrderUpdateBerthDto dto)
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

        [HttpPut("Checkout")]
        public async Task<IActionResult> Checkout([FromBody] tblOrderCheckOutDto dto)
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

        [HttpPut("PortArrived")]
        public async Task<IActionResult> PortArrived([FromBody] tblOrderTrackingOffDto dto)
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

        [HttpGet("Export")]
        public async Task<IActionResult> Export([FromQuery] OrderExportExcelFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Export(filter);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filter.Type == "NHAP_HANG" ? "DSPhieuNhapHang" : "DSPhieuXuatHang" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("ExportVehicle")]
        public async Task<IActionResult> ExportVehicle([FromQuery] DateTime FromDate, DateTime ToDate, string VehicleCode)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportVehicle(FromDate, ToDate,VehicleCode);
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

        [HttpGet("ExportVehicleDownload")]
        public async Task<IActionResult> ExportVehicleDownload([FromQuery] DateTime FromDate, DateTime ToDate, string VehicleCode)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportVehicleDownload(FromDate, ToDate, VehicleCode);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "TongSoXe" + DateTime.Now.ToString() + ".xlsx");
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
                return Ok(transferObject);
            }
        }

        [HttpGet("ExportCargo")]
        public async Task<IActionResult> ExportCargo([FromQuery] DateTime FromDate, DateTime ToDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportCargo(FromDate, ToDate);
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

        [HttpGet("Tracking")]
        public async Task<IActionResult> GetTracking([FromQuery] OrderTrackingFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetTracking(filter);
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

        [HttpGet("ExportCargoDownload")]
        public async Task<IActionResult> ExportCargoDownload([FromQuery] DateTime FromDate, DateTime ToDate)
        {
            var transferObject = new TransferObject();
            var result = await _service.ExportCargoDownload(FromDate, ToDate);
            if (_service.Status)
            {
                return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DamXuongTau" + DateTime.Now.ToString() + ".xlsx");
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
