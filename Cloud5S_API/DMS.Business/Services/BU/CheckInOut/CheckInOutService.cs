using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.AppCode.Logger;
using DMS.BUSINESS.Common.Constants;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Services.BU.Attachment;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DMS.BUSINESS.Services.BU.CheckInOut
{
    public interface ICheckInOutService : IGenericService<tblBuCheckInOut, tblCheckInOutDto>
    {
        Task<PagedResponseDto> Search(CheckInOutFilter filter);
        Task<byte[]> Export(CheckInOutExportFilter filter);
        Task<tblCheckInOutDto> Add(tblCheckInOutCreateVehicleDto model);
    }
    public class CheckInOutService : GenericService<tblBuCheckInOut, tblCheckInOutDto>, ICheckInOutService
    {
        private readonly AttachmentManager _attachmentManager;
        public CheckInOutService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
        {
            _attachmentManager = new AttachmentManager(dbContext, configuration);
        }

        public override async Task<tblCheckInOutDto> GetById(object id)
        {

            var data = await _dbContext.tblBuCheckInOut
                    .FirstOrDefaultAsync(x => x.Id == (Guid)id);

            return _mapper.Map<tblCheckInOutDto>(data);
        }

        public override async Task<tblCheckInOutDto> Add(IDto dto)
        {
            var model = dto as tblCheckInOutCreateDto;

            try
            {
                var currentCheckIn = await _dbContext.Set<tblBuCurrentCheckIn>()
                    .FirstOrDefaultAsync(x => x.RfId == model.RfId);

                var rfid = await _dbContext.tblMdRfid.FirstOrDefaultAsync(x => x.Code == model.RfId);

                _dbContext.Database.BeginTransaction();
                if (rfid == null)
                {
                    rfid = new CORE.Entities.MD.tblMdRfid()
                    {
                        Code = model.RfId,
                    };

                    await _dbContext.tblMdRfid.AddAsync(rfid);
                }
                await _dbContext.SaveChangesAsync();

                var currentCheckInOut = await _dbContext.tblBuCheckInOut.Include(x => x.Order).ThenInclude(x => x.OrderProcesses).OrderByDescending(x => x.CreateDate).FirstOrDefaultAsync(x => x.RfId == model.RfId);
                ModuleType moduleType;

                if (currentCheckIn == null)
                {
                    var scale = await _dbContext.tblSoScale.Where(x => x.VehicleCode == rfid.VehicleCode).OrderByDescending(x => x.CreateDate).FirstOrDefaultAsync();

                    var scaleTime = scale?.TimeWeight2 == null ? scale?.TimeWeight1 : scale?.TimeWeight2;

                    if (scale == null || (DateTime.Now - scaleTime) >= new TimeSpan(1, 0, 0))
                    {
                        LoggerService.LogInfo($"Checkin {model.RfId}-{rfid?.VehicleCode}");
                        moduleType = ModuleType.CHECKIN;
                        currentCheckInOut = new tblBuCheckInOut()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = rfid?.VehicleCode,
                            ReferenceId = Guid.NewGuid()
                        };

                        await _dbContext.tblBuCurrentCheckIn.AddAsync(new tblBuCurrentCheckIn()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = rfid?.VehicleCode,
                        });

                        await _dbContext.tblBuCheckInOut.AddAsync(currentCheckInOut);
                    }
                    else
                    {
                        LoggerService.LogInfo($"CheckOut {model.RfId}-{rfid?.VehicleCode}");
                        currentCheckInOut.CheckOutTime = model.CheckTime ?? DateTime.Now;
                        moduleType = ModuleType.CHECKOUT;
                        if (string.IsNullOrWhiteSpace(currentCheckInOut.OrderCode) && !string.IsNullOrWhiteSpace(rfid?.VehicleCode))
                        {
                            var order = await _dbContext.tblSoOrder.AsNoTracking()
                                .OrderByDescending(x => x.OrderDate)
                                .FirstOrDefaultAsync(x => x.VehicleCode == rfid.VehicleCode && x.State == OrderState.CAN_LAN_2.ToString());
                            currentCheckInOut.OrderCode = order?.Code;
                        }
                        if (currentCheckInOut?.Order?.OrderProcesses != null)
                        {
                            currentCheckInOut.Order.OrderProcesses.Add(new CORE.Entities.SO.tblSoOrderProcess()
                            {
                                OrderCode = currentCheckInOut.OrderCode,
                                PrevState = OrderState.CAN_LAN_2.ToString(),
                                State = OrderState.RA_CONG.ToString(),
                                ProcessDate = DateTime.Now,
                            });
                        }
                    }
                }
                else
                {
                    if ((DateTime.Now - currentCheckIn.CheckInTime) > new TimeSpan(1, 0, 0))
                    {
                        currentCheckIn.CheckInTime = DateTime.Now;
                        _dbContext.tblBuCurrentCheckIn.Update(currentCheckIn);
                        LoggerService.LogInfo($"Checkin {model.RfId}-{rfid?.VehicleCode}");
                        moduleType = ModuleType.CHECKIN;
                        currentCheckInOut = new tblBuCheckInOut()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = rfid?.VehicleCode,
                            ReferenceId = Guid.NewGuid()
                        };

                        await _dbContext.tblBuCheckInOut.AddAsync(currentCheckInOut);
                    }
                    else
                    {
                        LoggerService.LogInfo($"CheckOut {model.RfId}-{rfid?.VehicleCode}");
                        currentCheckInOut.CheckOutTime = model.CheckTime ?? DateTime.Now;
                        moduleType = ModuleType.CHECKOUT;
                        if (string.IsNullOrWhiteSpace(currentCheckInOut.OrderCode) && !string.IsNullOrWhiteSpace(rfid?.VehicleCode))
                        {
                            var order = await _dbContext.tblSoOrder.AsNoTracking()
                                .OrderByDescending(x => x.OrderDate)
                                .FirstOrDefaultAsync(x => x.VehicleCode == rfid.VehicleCode && x.State == OrderState.CAN_LAN_2.ToString());
                            currentCheckInOut.OrderCode = order?.Code;
                        }
                        if (currentCheckInOut?.Order?.OrderProcesses != null)
                        {
                            currentCheckInOut.Order.OrderProcesses.Add(new CORE.Entities.SO.tblSoOrderProcess()
                            {
                                OrderCode = currentCheckInOut.OrderCode,
                                PrevState = OrderState.CAN_LAN_2.ToString(),
                                State = OrderState.RA_CONG.ToString(),
                                ProcessDate = DateTime.Now,
                            });
                        }
                        _dbContext.Remove(currentCheckIn);
                    }
                }

                await _dbContext.Database.CommitTransactionAsync();
                var resultCount = await _dbContext.SaveChangesAsync();

                if (resultCount != 0 && currentCheckInOut.ReferenceId.HasValue)
                {
                    foreach (var item in model.Files)
                    {
                        var uploadResult = await _attachmentManager.UploadModuleAttachment(item?.ByteData,
                        item?.Name,
                        Cnst.JPGExtension,
                        FileType.IMAGE.ToString(),
                        moduleType,
                        currentCheckInOut.ReferenceId);
                    }
                }

                return _mapper.Map<tblCheckInOutDto>(currentCheckInOut);
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<tblCheckInOutDto> Add(tblCheckInOutCreateVehicleDto model)
        {
            try
            {
                var currentCheckIn = await _dbContext.Set<tblBuCurrentCheckIn>()
                    .FirstOrDefaultAsync(x => x.RfId == model.RfId);

                _dbContext.Database.BeginTransaction();

                if (!await _dbContext.tblMdVehicle.AnyAsync(x => x.Code == model.VehicleCode))
                {
                    await _dbContext.tblMdVehicle.AddAsync(new CORE.Entities.MD.tblMdVehicle()
                    {
                        Code = model.VehicleCode,
                    });
                    await _dbContext.SaveChangesAsync();
                }

                var currentCheckInOut = await _dbContext.tblBuCheckInOut.Include(x => x.Order).ThenInclude(x => x.OrderProcesses).OrderByDescending(x => x.CreateDate).FirstOrDefaultAsync(x => x.RfId == model.RfId);
                ModuleType moduleType;

                if (currentCheckIn == null)
                {
                    var scale = await _dbContext.tblSoScale.Where(x => x.VehicleCode == model.VehicleCode).OrderByDescending(x => x.CreateDate).FirstOrDefaultAsync();

                    var scaleTime = scale?.TimeWeight2 == null ? scale?.TimeWeight1 : scale?.TimeWeight2;

                    if (scale == null || (DateTime.Now - scaleTime) >= new TimeSpan(1, 0, 0))
                    {
                        LoggerService.LogInfo($"Checkin {model.RfId}-{model?.VehicleCode}");
                        moduleType = ModuleType.CHECKIN;
                        currentCheckInOut = new tblBuCheckInOut()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = model?.VehicleCode,
                            ReferenceId = Guid.NewGuid()
                        };

                        await _dbContext.tblBuCurrentCheckIn.AddAsync(new tblBuCurrentCheckIn()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = model?.VehicleCode,
                        });

                        await _dbContext.tblBuCheckInOut.AddAsync(currentCheckInOut);
                    }
                    else
                    {
                        LoggerService.LogInfo($"CheckOut {model.RfId}-{model?.VehicleCode}");
                        currentCheckInOut.CheckOutTime = model.CheckTime ?? DateTime.Now;
                        moduleType = ModuleType.CHECKOUT;
                        if (string.IsNullOrWhiteSpace(currentCheckInOut.OrderCode) && !string.IsNullOrWhiteSpace(model?.VehicleCode))
                        {
                            var order = await _dbContext.tblSoOrder.AsNoTracking()
                                .OrderByDescending(x => x.OrderDate)
                                .FirstOrDefaultAsync(x => x.VehicleCode == model.VehicleCode && x.State == OrderState.CAN_LAN_2.ToString());
                            currentCheckInOut.OrderCode = order?.Code;
                        }
                        if (currentCheckInOut?.Order?.OrderProcesses != null)
                        {
                            currentCheckInOut.Order.OrderProcesses.Add(new CORE.Entities.SO.tblSoOrderProcess()
                            {
                                OrderCode = currentCheckInOut.OrderCode,
                                PrevState = OrderState.CAN_LAN_2.ToString(),
                                State = OrderState.RA_CONG.ToString(),
                                ProcessDate = DateTime.Now,
                            });
                        }
                    }
                }
                else
                {
                    if ((DateTime.Now - currentCheckIn.CheckInTime) > new TimeSpan(1, 0, 0))
                    {
                        currentCheckIn.CheckInTime = DateTime.Now;
                        _dbContext.tblBuCurrentCheckIn.Update(currentCheckIn);
                        LoggerService.LogInfo($"Checkin {model.RfId}-{model?.VehicleCode}");
                        moduleType = ModuleType.CHECKIN;
                        currentCheckInOut = new tblBuCheckInOut()
                        {
                            RfId = model.RfId,
                            CheckInTime = model.CheckTime ?? DateTime.Now,
                            VehicleCode = model?.VehicleCode,
                            ReferenceId = Guid.NewGuid()
                        };

                        await _dbContext.tblBuCheckInOut.AddAsync(currentCheckInOut);
                    }
                    else
                    {
                        LoggerService.LogInfo($"CheckOut {model.RfId}-{model?.VehicleCode}");
                        currentCheckInOut.CheckOutTime = model.CheckTime ?? DateTime.Now;
                        moduleType = ModuleType.CHECKOUT;
                        if (string.IsNullOrWhiteSpace(currentCheckInOut.OrderCode) && !string.IsNullOrWhiteSpace(model?.VehicleCode))
                        {
                            var order = await _dbContext.tblSoOrder.AsNoTracking()
                                .OrderByDescending(x => x.OrderDate)
                                .FirstOrDefaultAsync(x => x.VehicleCode == model.VehicleCode && x.State == OrderState.CAN_LAN_2.ToString());
                            currentCheckInOut.OrderCode = order?.Code;
                        }
                        if (currentCheckInOut?.Order?.OrderProcesses != null)
                        {
                            currentCheckInOut.Order.OrderProcesses.Add(new CORE.Entities.SO.tblSoOrderProcess()
                            {
                                OrderCode = currentCheckInOut.OrderCode,
                                PrevState = OrderState.CAN_LAN_2.ToString(),
                                State = OrderState.RA_CONG.ToString(),
                                ProcessDate = DateTime.Now,
                            });
                        }
                        _dbContext.Remove(currentCheckIn);
                    }
                }

                await _dbContext.Database.CommitTransactionAsync();
                var resultCount = await _dbContext.SaveChangesAsync();

                if (resultCount != 0 && currentCheckInOut.ReferenceId.HasValue)
                {
                    foreach (var item in model.Files)
                    {
                        var uploadResult = await _attachmentManager.UploadModuleAttachment(item?.ByteData,
                        item?.Name,
                        Cnst.JPGExtension,
                        FileType.IMAGE.ToString(),
                        moduleType,
                        currentCheckInOut.ReferenceId);
                    }
                }

                return _mapper.Map<tblCheckInOutDto>(currentCheckInOut);
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return null;
            }
        }


        public async Task<PagedResponseDto> Search(CheckInOutFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCheckInOut
                    .Include(x => x.Order)
                    .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                    .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.VehicleCode.Contains(filter.KeyWord))
                    .OrderByDescending(x => x.CreateDate);
                return await Paging(query, filter);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(CheckInOutExportFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblBuCheckInOut.AsQueryable()
                    .Where(x => filter.FromDate == null || x.CreateDate >= filter.FromDate.Value)
                    .Where(x => filter.ToDate == null || x.CreateDate <= filter.ToDate.Value)
                    .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.VehicleCode.Contains(filter.KeyWord))
                    .OrderBy(x => x.Id).ToListAsync();

                var data = raw_data?.Select((x, i) => new CheckInOutExportDto()
                {
                    CheckInTime = x?.CheckInTime.ToString(),
                    CheckOutTime = x?.CheckOutTime?.ToString(),
                    OrdinalNumber = i + 1,
                    Vehicle = x.VehicleCode
                }).ToList();

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, ExcelExportType.VAO_RA);
                return result;
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }
    }
}
