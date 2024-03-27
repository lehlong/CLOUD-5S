using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.AppCode.Logger;
using DMS.BUSINESS.Common.Constants;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Services.BU.Attachment;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Globalization;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderScaleService : IGenericService<tblSoScale, tblOrderScaleDto>
    {
        Task<OrderScalePagedResponseDto> Search(OrderScaleFilter filter);
        Task<tblOrderScaleDto> GetById(string Code);
        Task<byte[]> Export(OrderScaleExportFilter filter);
        Task<byte[]> ExportReport(OrderScaleExportFilter filter);
        Task Update(tblOrderScaleDto orderScaledto);
        Task<SyncScaleResponseDto> Sync(List<tblOrderScaleSyncDto> dto);
        Task<IList<tblOrderScaleDto>> ReportScale(OrderScaleFilter filter);
        Task<TotalReportScaleByRegionDto> ReportOrderScale(OrderScaleExportFilter filter);
    }
    public class OrderScaleService : GenericService<tblSoScale, tblOrderScaleDto>, IOrderScaleService
    {
        private readonly AttachmentManager _attachmentManager;
        private readonly IHubContext<RefreshServiceHub> _refreshHubContext;
        private readonly IHubContext<TrackingServiceHub> _trackingHubContext;

        public OrderScaleService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration, IHubContext<RefreshServiceHub> refreshHubContext, IHubContext<TrackingServiceHub> trackingHubContext) : base(dbContext, mapper)
        {
            _attachmentManager = new AttachmentManager(dbContext, configuration);
            _refreshHubContext = refreshHubContext;
            _trackingHubContext = trackingHubContext;
        }

        public async Task<OrderScalePagedResponseDto> Search(OrderScaleFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoScale
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Item)
                    .Include(x => x.Unit)
                    .Include(x => x.Company)
                    .Include(x => x.Images)
                    .ThenInclude(x => x.Attachment)

                 .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) ||
                        x.Code.Contains(filter.KeyWord) ||
                        x.VehicleCode.ToLower().Contains(filter.KeyWord.ToLower())
                        || x.SyncCode.Contains(filter.KeyWord))
                .Where(x => filter.FromDate == null || (x.TimeWeight2 ?? x.TimeWeight1).Value >= filter.FromDate.Value)
                .Where(x => filter.ToDate == null || (x.TimeWeight2 ?? x.TimeWeight1).Value <= filter.ToDate.Value)
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)
                .Where(x => string.IsNullOrEmpty(filter.Type)
                         || filter.Type == x.ScaleTypeCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)
                .Where(x => filter.IsCanceled == null ||
                         (x.IsCanceled ?? false) == filter.IsCanceled);

                if (filter.Weight1 == true)
                {
                    query = query.Where(x => x.Weight1 != null);
                }
                else
                {
                    query = query.Where(x => x.Weight1 == null);
                }

                if (filter.Weight2 == true)
                {
                    query = query.Where(x => x.Weight2 != null);
                }
                else
                {
                    query = query.Where(x => x.Weight2 == null);
                }

                var result = await base.Paging(query.OrderByDescending(x => x.TimeWeight2 ?? x.TimeWeight1), filter);

                return new OrderScalePagedResponseDto()
                {
                    CurrentPage = result.CurrentPage,
                    Data = result?.Data,
                    PageSize = result.PageSize,
                    TotalPage = result.TotalPage,
                    TotalRecord = result.TotalRecord,
                    TotalWeight = await query.SumAsync(x => x.Weight ?? 0)
                };
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(OrderScaleExportFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblSoScale.Include(x => x.Item)
                 .Include(x => x.Partner)
             .Where(x => filter.FromDate == null || x.TimeWeight1.Value >= filter.FromDate.Value)
             .Where(x => filter.ToDate == null || x.TimeWeight1.Value <= filter.ToDate.Value)
             .Where(x => string.IsNullOrWhiteSpace(filter.PartnerName) || x.Partner.Name.Contains(filter.PartnerName))
             .OrderByDescending(x => x.CreateDate).ToListAsync();
                if ((filter.Weight1 == true && filter.Weight2 == true) || (filter.Weight1 == false && filter.Weight2 == false))
                {

                }
                else
                {
                    if (filter.Weight1 == true)
                    {
                        raw_data = raw_data.Where(x => x.Weight1 != null && x.Weight2 == null).ToList();
                    }

                    if (filter.Weight2 == true)
                    {
                        raw_data = raw_data.Where(x => x.Weight2 != null && x.Weight1 != null).ToList();
                    }
                }
                var data = raw_data?.Select((x, i) => new OrderScaleExportDto()
                {

                    ItemName = x?.Item?.Name,
                    OrdinalNumber = i + 1,
                    PartnerName = x?.Partner?.Name,
                    Vehicle = x?.VehicleCode,
                    Weight = x?.Weight ?? 0,
                    dateWeight1 = x?.TimeWeight1?.ToString("dd/mm/yyyy"),
                    dateWeight2 = x?.TimeWeight2?.ToString("dd/mm/yyyy"),
                    timeWeightin = x?.TimeWeight1?.ToString("HH:mm:ss"),
                    timeWeightout = x?.TimeWeight2?.ToString("HH:mm:ss")
                }).ToList();

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.PHIEU_CAN);
                return result;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> ExportReport(OrderScaleExportFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoScale.Include(x => x.Item)
                .Include(x => x.Partner)
            .Where(x => filter.FromDate == null || x.TimeWeight1.Value >= filter.FromDate.Value)
            .Where(x => filter.ToDate == null || x.TimeWeight1.Value <= filter.ToDate.Value)
            .Where(x => string.IsNullOrWhiteSpace(filter.PartnerName) || x.Partner.Name.Contains(filter.PartnerName))
            .Where(x => filter.IsCanceled == null ||
                         (x.IsCanceled ?? false) == filter.IsCanceled);

                if (filter.Weight1 == true)
                {
                    query = query.Where(x => x.Weight1 != null);
                }
                else
                {
                    query = query.Where(x => x.Weight1 == null);
                }

                if (filter.Weight2 == true)
                {
                    query = query.Where(x => x.Weight2 != null);
                }
                else
                {
                    query = query.Where(x => x.Weight2 == null);
                }

                var raw_data = await query.OrderByDescending(x => x.CreateDate).ToListAsync();

                var data_phieucan = raw_data?.Select((x, i) => new OrderScaleExportDto()
                {

                    ItemName = x?.Item?.Name,
                    OrdinalNumber = i + 1,
                    PartnerName = x?.Partner?.Name,
                    Vehicle = x?.VehicleCode,
                    Weight = x?.Weight ?? 0,
                    Weight1 = x?.Weight1 ?? 0,
                    Weight2 = x?.Weight2 ?? 0,
                    dateWeight1 = x?.TimeWeight1?.ToString("dd/MM/yyyy"),
                    dateWeight2 = x?.TimeWeight2?.ToString("dd/MM/yyyy"),
                    timeWeightin = x?.TimeWeight1?.ToString("HH:mm:ss"),
                    timeWeightout = x?.TimeWeight2?.ToString("HH:mm:ss")
                }).ToList();
                var data = await ReportOrderScale(filter);
                var result = await new ExcelExporter(_dbContext).ExportReportToExcel(data, data_phieucan, filter);
                return result;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblOrderScaleDto> GetById(string Code)
        {
            try
            {
                var data = await _dbContext.tblSoScale
                .Include(x => x.Item)
                .Include(x => x.Order)
                .Include(x => x.Partner)
                .Include(x => x.Item)
                .Include(x => x.Unit)
                .Include(x => x.Company)
                .Include(x => x.Area)
                .Include(x => x.Images)
                    .ThenInclude(x => x.Attachment)
                .FirstOrDefaultAsync(x => x.Code == Code);

                return _mapper.Map<tblOrderScaleDto>(data);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task Update(tblOrderScaleDto orderScaledto)
        {
            try
            {
                var orderScaleCode = orderScaledto.Code;
                var orderScaleInDB = await _dbContext.Set<tblSoScale>().FindAsync(orderScaleCode);

                if (orderScaleInDB == null)
                {
                    Status = false;
                    MessageObject.Code = "0004";
                    return;
                }

                await _dbContext.Database.BeginTransactionAsync();

                _mapper.Map(orderScaledto, orderScaleInDB);
                await _dbContext.SaveChangesAsync();

                var isUploadSuccess = await SaveImageToOrderFolder(orderScaleInDB, orderScaledto.Image);

                if (!isUploadSuccess)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    Status = false;
                    MessageObject.Code = "3000";
                    return;
                }
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
            }
        }

        private async Task<bool> SaveImageToOrderFolder(tblSoScale model, byte[] image)
        {
            string fileName = "order_" + model.VehicleCode + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Cnst.JPGExtension;

            var uploadResult = await _attachmentManager.UploadModuleAttachment(image, fileName, Cnst.JPGExtension, FileType.IMAGE.ToString(), ModuleType.ORDER, model.ReferenceId ?? Guid.Empty);

            return uploadResult.Status;
        }

        public async Task<SyncScaleResponseDto> Sync(List<tblOrderScaleSyncDto> dto)
        {
            var result = new SyncScaleResponseDto();

            var shifts = await _dbContext.tblMdWorkingShift.ToListAsync();

            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            var stocks = await _dbContext.tblBuStockItem.ToListAsync();

            int resultCount = 0;
            foreach (var model in dto)
            {
                LoggerService.LogInfo($"Start Trace.");
                LoggerService.LogInfo($"Request to sync: {JsonConvert.SerializeObject(model)}");
                try
                {
                    var parseScaleTypeResult = Enum.TryParse(model.ScaleTypeCode, out ScaleType scaleType);

                    if (!parseScaleTypeResult)
                    {
                        result.Fails.Add(new SyncScaleResponseBaseDto()
                        {
                            Code = "2024",
                            MessageObject = new Common.Class.MessageObject()
                            {
                                Message = "Loại cân không đúng"
                            },
                            Status = false
                        });
                        continue;
                    }

                    await _dbContext.Database.BeginTransactionAsync();
                    var currentObj = await _dbContext.tblSoScale
                        .Include(x => x.Order).ThenInclude(x => x.OrderDetails)
                        .FirstOrDefaultAsync(y => y.SyncCode == model.Code);
                    var obj = _mapper.Map<tblSoScale>(model);
                    List<SyncScaleOrderState> processes = new();

                    string orderCode = string.Empty;
                    var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Orders).ThenInclude(x => x.OrderDetails).Where(x => x.StartDate <= model.TimeWeight1 && x.EndDate >= model.TimeWeight1 && x.State != OrderBatchState.DA_HUY.ToString()).FirstOrDefaultAsync();

                    if (orderBatch != null && orderBatch.State != OrderBatchState.DANG_XUAT_HANG.ToString())
                    {
                        orderBatch.State = OrderBatchState.DANG_XUAT_HANG.ToString();
                        await _dbContext.SaveChangesAsync();
                    }

                    string batchCode = null;
                    if (model.ItemCode == defaultValue.DefaultProductItemCode && !string.IsNullOrEmpty(orderBatch?.Code))
                    {
                        batchCode = orderBatch.Code;
                    }

                    var orderType = GetOrderType(scaleType);

                    if (string.IsNullOrEmpty(orderType))
                    {
                        obj.Code = await new CodeManager(_dbContext).GenerateOrderScaleCode();

                        processes.Add(new SyncScaleOrderState()
                        {
                            OldState = OrderState.KHOI_TAO.ToString(),
                            State = OrderState.CAN_LAN_1,
                            ProcessDate = model.TimeWeight1 ?? DateTime.Now,
                        });

                        if (model.Weight2 != null && model.TimeWeight2 != null)
                        {
                            processes.Add(new SyncScaleOrderState()
                            {
                                OldState = OrderState.CAN_LAN_1.ToString(),
                                State = OrderState.CAN_LAN_2,
                                ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                            });
                        }

                        _dbContext.tblSoScale.Add(obj);
                    }
                    else if (currentObj == null)
                    {
                        obj.Code = await new CodeManager(_dbContext).GenerateOrderScaleCode();
                        orderCode = await new CodeManager(_dbContext).GenerateOrderCode();
                        OrderState orderState = OrderState.CAN_LAN_1;

                        var shift = shifts.Where(x => (model.TimeWeight1.Value.Date + x.FromHour) <= model.TimeWeight1 && (model.TimeWeight1.Value.Date + x.ToHour) >= model.TimeWeight1).FirstOrDefault();
                        var orderDate = model.TimeWeight1;
                        processes.Add(new SyncScaleOrderState()
                        {
                            OldState = OrderState.VAO_CONG.ToString(),
                            State = OrderState.CAN_LAN_1,
                            ProcessDate = model.TimeWeight1 ?? DateTime.Now,
                        });

                        if (model.Weight2 != null && model.TimeWeight2 != null)
                        {
                            processes.Add(new SyncScaleOrderState()
                            {
                                OldState = OrderState.CAN_LAN_1.ToString(),
                                State = OrderState.CAN_LAN_2,
                                ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                            });
                            orderState = OrderState.CAN_LAN_2;
                            orderDate = model.TimeWeight2;
                            shift = shifts.Where(x => (model.TimeWeight2.Value.Date + x.FromHour) <= model.TimeWeight2 && (model.TimeWeight2.Value.Date + x.ToHour) >= model.TimeWeight2).FirstOrDefault();
                        }

                        if (model.IsCanceled == true)
                        {
                            processes.Add(new SyncScaleOrderState()
                            {
                                OldState = orderState.ToString(),
                                State = OrderState.DA_HUY,
                                ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                            });
                            orderState = OrderState.DA_HUY;
                        }

                        obj.Order = new tblSoOrder()
                        {
                            PartnerCode = obj.PartnerCode,
                            State = orderState.ToString(),
                            Code = orderCode,
                            DriverName = obj.DriverName,
                            Note = obj.Note,
                            OrderDate = orderDate,
                            CompanyCode = obj.CompanyCode,
                            OrderBatchCode = batchCode,
                            WorkingShiftCode = shift?.Code,
                            AreaCode = obj.AreaCode,
                            OrderDetails = new List<tblSoOrderDetail>() {
                            new tblSoOrderDetail()
                            {
                                ItemCode = obj.ItemCode,
                                UnitCode = obj.UnitCode,
                                OrderNumber = (model.Weight2 != null || model.TimeWeight2 != null) ? Math.Abs((model.Weight2 ?? 0) - (model.Weight1 ?? 0)) : 0
                            }
                            },
                            VehicleCode = obj.VehicleCode,
                            Type = obj.ScaleTypeCode,
                        };

                        if (!String.IsNullOrEmpty(model.VehicleCode))
                        {
                            if (!await _dbContext.tblMdVehicle.AnyAsync(x => x.Code == model.VehicleCode))
                            {
                                await _dbContext.tblMdVehicle.AddAsync(new CORE.Entities.MD.tblMdVehicle()
                                {
                                    Code = model.VehicleCode,
                                    DriverUserName = model.DriverName,
                                });
                                resultCount += await _dbContext.SaveChangesAsync();

                                //if (model.RfId != null)
                                //{
                                //    await _dbContext.tblMdVehicle.AddAsync(new CORE.Entities.MD.tblMdVehicle()
                                //    {
                                //        Code = model.VehicleCode,
                                //        DriverUserName = model.DriverName,
                                //        Rfids = new List<CORE.Entities.MD.tblMdRfid>()
                                //    {
                                //        new CORE.Entities.MD.tblMdRfid() {
                                //            Code = model.RfId,
                                //            VehicleCode = model.VehicleCode
                                //        }
                                //    }
                                //    });
                                //    resultCount += await _dbContext.SaveChangesAsync();
                                //}
                            }
                        }

                        if (!String.IsNullOrEmpty(model.RfId) && !String.IsNullOrEmpty(model.VehicleCode))
                        {
                            var rfid = await _dbContext.tblMdRfid.FirstOrDefaultAsync(x => x.Code == model.RfId);
                            if (rfid == null)
                            {
                                await _dbContext.tblMdRfid.AddAsync(new CORE.Entities.MD.tblMdRfid()
                                {
                                    Code = model.RfId,
                                    VehicleCode = model.VehicleCode,
                                });
                                resultCount += await _dbContext.SaveChangesAsync();
                            }
                            else
                            {
                                rfid.VehicleCode = model?.VehicleCode;
                                _dbContext.tblMdRfid.Update(rfid);
                                resultCount += await _dbContext.SaveChangesAsync();
                            }
                        }
                        await _dbContext.tblSoScale.AddAsync(obj);
                        resultCount += await _dbContext.SaveChangesAsync();

                        var checkInOut = await _dbContext.tblBuCheckInOut.OrderByDescending(x => x.CreateDate)
                                            .FirstOrDefaultAsync(x => x.RfId == model.RfId && x.CheckOutTime == null);

                        if (checkInOut != null)
                        {
                            checkInOut.OrderCode = orderCode;
                            checkInOut.VehicleCode = model.VehicleCode;
                            processes.Add(new SyncScaleOrderState()
                            {
                                OldState = OrderState.KHOI_TAO.ToString(),
                                State = OrderState.VAO_CONG,
                                ProcessDate = checkInOut.CreateDate ?? DateTime.Now
                            });
                        }
                        resultCount += await _dbContext.SaveChangesAsync();

                        if (orderState == OrderState.CAN_LAN_2)
                        {
                            if (scaleType == ScaleType.NHAP_HANG)
                            {
                                await AddImport(obj.Order, defaultValue, stocks);
                            }
                            else if (scaleType == ScaleType.XUAT_HANG)
                            {
                                await AddExport(obj.Order, defaultValue, stocks);
                            }
                        }
                        LoggerService.LogInfo($"Added Scale: {orderState}");
                    }
                    else
                    {
                        orderCode = currentObj.Order.Code;
                        if (currentObj.TimeWeight2 == null && currentObj.Weight2 == null && (model.Weight2 != null || model.TimeWeight2 != null))
                        {
                            var shift = shifts.Where(x => (model.TimeWeight2.Value.Date + x.FromHour) <= model.TimeWeight2 && (model.TimeWeight2.Value.Date + x.ToHour) >= model.TimeWeight2).FirstOrDefault();
                            if (model.TimeWeight2 == null) model.TimeWeight2 = DateTime.Now;
                            if (model.IsCanceled != true)
                            {
                                processes.Add(new SyncScaleOrderState()
                                {
                                    OldState = currentObj.Order.State,
                                    State = OrderState.CAN_LAN_2,
                                    ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                                });
                                currentObj.Order.State = OrderState.CAN_LAN_2.ToString();
                            }
                            currentObj.Order.WorkingShiftCode = shift?.Code;
                            currentObj.Order.OrderDate = model.TimeWeight2;

                            currentObj.Order.OrderDetails.ForEach(x =>
                            {
                                x.OrderNumber = Math.Abs((model.Weight2 ?? 0) - (currentObj.Weight1 ?? 0));
                            });
                        }
                        else if (model.Weight2 != null || model.TimeWeight2 != null)
                        {
                            if (model.IsCanceled == true)
                            {
                                processes.Add(new SyncScaleOrderState()
                                {
                                    OldState = currentObj.Order.State,
                                    State = OrderState.DA_HUY,
                                    ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                                });
                                currentObj.Order.State = OrderState.DA_HUY.ToString();
                            }
                            var shift = shifts.Where(x => (model.TimeWeight2.Value.Date + x.FromHour) <= model.TimeWeight2 && (model.TimeWeight2.Value.Date + x.ToHour) >= model.TimeWeight2).FirstOrDefault();
                            if (model.TimeWeight2 == null) model.TimeWeight2 = DateTime.Now;
                            currentObj.Order.WorkingShiftCode = shift?.Code;
                            currentObj.Order.OrderDate = model.TimeWeight2;

                            currentObj.Order.OrderDetails.ForEach(x =>
                            {
                                x.OrderNumber = Math.Abs((model.Weight2 ?? 0) - (currentObj.Weight1 ?? 0));
                            });
                        }

                        _mapper.Map(model, currentObj);

                        if (model.IsCanceled == true)
                        {
                            processes.Add(new SyncScaleOrderState()
                            {
                                OldState = currentObj.Order.State,
                                State = OrderState.DA_HUY,
                                ProcessDate = model.TimeWeight2 ?? DateTime.Now,
                            });
                            currentObj.Order.State = OrderState.DA_HUY.ToString();
                        }

                        _dbContext.Entry(currentObj).State = EntityState.Modified;

                        await _dbContext.SaveChangesAsync();

                        if (currentObj.Order.State == OrderState.CAN_LAN_2.ToString())
                        {
                            if (scaleType == ScaleType.NHAP_HANG)
                            {
                                await AddImport(currentObj.Order, defaultValue, stocks);
                            }
                            else if (scaleType == ScaleType.XUAT_HANG)
                            {
                                await AddExport(currentObj.Order, defaultValue, stocks);
                            }
                        }
                        LoggerService.LogInfo($"Updated Scale: {currentObj.Order.State}");
                    }
                    resultCount += await _dbContext.SaveChangesAsync();

                    if (orderBatch != null)
                    {
                        orderBatch.ReleaseNumber = orderBatch.Orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString() || x.State == OrderState.DEN_CANG.ToString() || x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);
                        orderBatch.DeliveryNumber = orderBatch.Orders.Count(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString() || x.State == OrderState.DEN_CANG.ToString() || x.State == OrderState.DO_HANG.ToString());
                        orderBatch.DeliveringNumber = orderBatch.Orders.Count(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString());
                        orderBatch.CompleteNumber = orderBatch.Orders.Where(x => x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);
                        orderBatch.CompleteDeliveryNumber = orderBatch.Orders.Count(x => x.State == OrderState.DO_HANG.ToString() || x.State == OrderState.DEN_CANG.ToString());

                        _dbContext.Update(orderBatch);
                        await _dbContext.SaveChangesAsync();
                    }

                    foreach (var item in processes)
                    {
                        if (string.IsNullOrEmpty(orderCode)) continue;
                        await AddOrderProcess(item.OldState, orderCode, item.ProcessDate, item.State);
                    }

                    result.Success.Add(new SyncScaleResponseBaseDto()
                    {
                        Code = model.Code,
                        Status = true
                    });
                    await _dbContext.Database.CommitTransactionAsync();
                    LoggerService.LogInfo($"End Trace.");
                }
                catch (Exception ex)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    result.Fails.Add(new SyncScaleResponseBaseDto()
                    {
                        Code = model.Code,
                        Status = false,
                        Exception = ex
                    });
                }
            };
            if (resultCount > 0)
            {
                await _refreshHubContext.Clients.All.SendAsync("ReceiveMessageRefresh", true);
                await _trackingHubContext.Clients.All.SendAsync("Tracking");
                await _refreshHubContext.Clients.All.SendAsync(SignalRNotificationType.SCALE.ToString(), true);
                await _refreshHubContext.Clients.All.SendAsync("ORDER_BATCH", true);

            }
            return result;
        }

        private async Task AddOrderProcess(string oldState, string orderCode, DateTime ProcessDate, OrderState? newState = null, string action = null)
        {
            string prevState = oldState;
            string state;
            switch (newState)
            {
                case OrderState.KHOI_TAO:
                    action = OrderAction.TAO_MOI.ToString();
                    state = OrderState.KHOI_TAO.ToString();
                    break;
                case OrderState.VAO_CONG:
                    action = OrderAction.VAO_CONG.ToString();
                    state = OrderState.VAO_CONG.ToString();
                    break;
                case OrderState.CAN_LAN_1:
                    action = OrderAction.CAN_LAN_1.ToString();
                    state = OrderState.CAN_LAN_1.ToString();
                    break;
                case OrderState.CAN_LAN_2:
                    action = OrderAction.CAN_LAN_2.ToString();
                    state = OrderState.CAN_LAN_2.ToString();
                    break;
                case OrderState.RA_CONG:
                    action = OrderAction.RA_CONG.ToString();
                    state = OrderState.RA_CONG.ToString();
                    break;
                case OrderState.DEN_CANG:
                    action = OrderAction.DEN_CANG.ToString();
                    state = OrderState.DEN_CANG.ToString();
                    break;
                case OrderState.DO_HANG:
                    action = OrderAction.DO_HANG.ToString();
                    state = OrderState.DO_HANG.ToString();
                    break;

                case OrderState.DA_HUY:
                    action = OrderAction.HUY_DON.ToString();
                    state = OrderState.DA_HUY.ToString();
                    break;
                default:
                    action ??= string.Empty;
                    state = oldState;
                    break;
            }

            var process = new tblOrderProcessCreateDto()
            {
                ActionCode = action,
                OrderCode = orderCode,
                PrevState = prevState,
                State = state,
                ProcessDate = ProcessDate
            };

            var processObj = _mapper.Map<tblSoOrderProcess>(process);
            await _dbContext.tblSoOrderProcess.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        private string GetOrderType(ScaleType scaleType)
        {
            switch (scaleType)
            {
                case ScaleType.NHAP_HANG: return OrderType.NHAP_HANG.ToString();
                case ScaleType.XUAT_HANG: return OrderType.XUAT_HANG.ToString();
                default: return string.Empty;
            }
        }

        private async Task AddImport(tblSoOrder order, tblAdSystemParameter defaultValue, List<tblBuStockItem> stockItem)
        {

            var import = await _dbContext.tblBuStockImport
                .FirstOrDefaultAsync(x => x.OrderCode == order.Code && x.StockCode == defaultValue.DefaultIngredientStock && x.ItemCode == defaultValue.DefaultIngredientItemCode);

            if (import != null)
            {
                import.Amount = order.OrderDetails?.Sum(x => x.OrderNumber);
                return;
            }

            var importCode = await new CodeManager(_dbContext).GenerateImportCode();

            var shiftCode7H = order?.WorkingShiftCode;

            var importDate7H = order?.OrderDate;

            if (order?.WorkingShiftCode == "C4")
            {
                shiftCode7H = "C3";
                importDate7H = order?.OrderDate.Value.AddDays(-1);
            }

            var itemCode = order.OrderDetails?.FirstOrDefault()?.ItemCode;

            if (_dbContext.tblBuStockImport.Any(x => x.OrderCode == order.Code
            && x.ItemCode == itemCode))
            {
                return;
            }

            await _dbContext.tblBuStockImport.AddAsync(new tblBuStockImport()
            {
                Code = importCode,
                CompanyCode = order?.CompanyCode,
                ImportDate = order?.OrderDate,
                OrderCode = order?.Code,
                StockCode = defaultValue?.DefaultIngredientStock,
                ShiftCode = order?.WorkingShiftCode,
                ImportDate7H = importDate7H,
                ShiftCode7H = shiftCode7H,
                Amount = order.OrderDetails?.Sum(x => x.OrderNumber),
                ItemCode = itemCode,
                UnitCode = order.OrderDetails?.FirstOrDefault()?.UnitCode,
                AreaCode = order?.AreaCode,
            });
            await _dbContext.SaveChangesAsync();

            var orderDetail = order.OrderDetails.FirstOrDefault();

            var stock = stockItem.FirstOrDefault(x => x.ItemCode == orderDetail?.ItemCode
            && x.CompanyCode == order?.CompanyCode);

            if (stock != null)
            {
                stock.Amount += (orderDetail?.OrderNumber ?? 0);
            }
            await _dbContext.SaveChangesAsync();
        }

        private async Task AddExport(tblSoOrder order, tblAdSystemParameter defaultValue, List<tblBuStockItem> stockItem)
        {
            var export = await _dbContext.tblBuStockExport
                .FirstOrDefaultAsync(x => x.OrderCode == order.Code && x.StockCode == defaultValue.DefaultProductStock && x.ItemCode == defaultValue.DefaultProductItemCode);

            if (export != null)
            {
                export.Amount = order.OrderDetails?.Sum(x => x.OrderNumber);
                return;
            }

            var exportCode = await new CodeManager(_dbContext).GenerateExportCode();
            var shiftCode7H = order?.WorkingShiftCode;
            var exportDate7H = order?.OrderDate;

            if (order?.WorkingShiftCode == "C4")
            {
                shiftCode7H = "C3";
                exportDate7H = order?.OrderDate.Value.AddDays(-1);
            }

            var itemCode = order.OrderDetails?.FirstOrDefault()?.ItemCode;

            if (_dbContext.tblBuStockExport.Include(x => x.ExportDetails).Any(x => x.OrderCode == order.Code
           && x.ItemCode == itemCode))
            {
                return;
            }
            await _dbContext.tblBuStockExport.AddAsync(new tblBuStockExport()
            {
                Code = exportCode,
                CompanyCode = order?.CompanyCode,
                ExportDate = order?.OrderDate,
                OrderCode = order?.Code,
                StockCode = defaultValue?.DefaultProductStock,
                ShiftCode = order?.WorkingShiftCode,
                ExportDate7H = exportDate7H,
                ShiftCode7H = shiftCode7H,
                Amount = order?.OrderDetails?.Sum(x => x.OrderNumber),
                ItemCode = itemCode,
                UnitCode = order.OrderDetails?.FirstOrDefault()?.UnitCode,
                AreaCode = order?.AreaCode
            });
            await _dbContext.SaveChangesAsync();

            var orderDetail = order.OrderDetails.FirstOrDefault();

            var stock = stockItem.FirstOrDefault(x => x.ItemCode == orderDetail?.ItemCode
            && x.StockCode == defaultValue?.DefaultProductStock
            && x.CompanyCode == order?.CompanyCode);

            if (stock != null)
            {
                stock.Amount -= (orderDetail?.OrderNumber ?? 0);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<tblOrderScaleDto>> ReportScale(OrderScaleFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoScale
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Item)
                    .Include(x => x.Unit)
                    .Include(x => x.Company)
                    .Include(x => x.Images)
                        .ThenInclude(x => x.Attachment)
                .Where(x => filter.FromDate == null || x.TimeWeight1.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.TimeWeight1.Value.Date <= filter.ToDate.Value.Date)
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.ItemCode == filter.ItemCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)
                .Where(x => string.IsNullOrEmpty(filter.Type)
                         || filter.Type == x.ScaleTypeCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)
                .OrderByDescending(x => x.TimeWeight1);

                return _mapper.Map<IList<tblOrderScaleDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<TotalReportScaleByRegionDto> ReportOrderScale(OrderScaleExportFilter filter)
        {
            try
            {
                var listData = await _dbContext.tblSoScale.Include(x => x.Item)
                    .Include(x => x.Area)
                    .Include(x => x.Partner)
                    .Where(x => filter.FromDate == null || x.TimeWeight1.Value >= filter.FromDate.Value)
                    .Where(x => filter.ToDate == null || x.TimeWeight1.Value <= filter.ToDate.Value)
                    .Where(x => string.IsNullOrWhiteSpace(filter.PartnerName) || x.Partner.Name.Contains(filter.PartnerName))
                    .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode) || x.AreaCode == filter.AreaCode)
                    .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode) || x.VehicleCode == filter.VehicleCode)
                    .Where(x => x.Weight1 != null && x.Weight2 != null && x.Weight1 > 0 && x.Weight2 > 0 && !string.IsNullOrEmpty(x.Item.Name))
                    .GroupBy(x => new { x.TimeWeight1, AreaName = string.IsNullOrEmpty(x.Area.Name) || x.ScaleTypeCode == ScaleType.XUAT_HANG.ToString() ? "Khu vực khác" : x.Area.Name, x.Item.Name, x.Weight })
                    .Select(x => new ReportScaleByRegionDto
                    {
                        AreaName = x.Key.AreaName,
                        Date = x.Key.TimeWeight1.Value.ToString("dd/MM/yyyy"),
                        Weight = (double)x.Key.Weight,
                        ItemName = x.Key.Name,

                    }).ToListAsync();
                if (listData != null && listData.Any())
                {
                    var listResult = new TotalReportScaleByRegionDto();
                    var listTotal = new List<ViewListReportScaleByRegionDto>();
                    var listDate = listData.OrderBy(x => DateTime.ParseExact(x.Date.ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)).Select(x =>
                    DateTime.ParseExact(x.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture)).Distinct().ToList();
                    var minDateFilter = Convert.ToDateTime(filter.FromDate == null ? listDate.Min() : filter.FromDate);
                    var maxDateFilter = Convert.ToDateTime(filter.ToDate == null ? listDate.Max() : filter.ToDate);
                    var minDateOfMaxMonthFilter = new DateTime(maxDateFilter.Year, maxDateFilter.Month, 1);

                    DateTime firstDay = minDateFilter;
                    DateTime lastDay = maxDateFilter;
                    var dateList = new List<DateTime>();
                    var currentDate = firstDay;

                    while (currentDate <= lastDay)
                    {
                        dateList.Add(currentDate);
                        currentDate = currentDate.AddDays(1);
                    }

                    var dateData = dateList.Select(date => date.ToString("dd/MM/yyyy")).ToList();

                    var reportScaleByRegionDtos = listData;

                    var listSumWeigthPercent = new List<ReportScaleByRegionDto>();

                    if (listDate != null && listDate.Any())
                    {
                        foreach (var item in dateData)
                        {
                            var obj = new ViewListReportScaleByRegionDto
                            {
                                Date = item
                            };
                            var listDataByDate = reportScaleByRegionDtos.Where(x => x.Date == item.ToString()).ToList();
                            if (listDataByDate != null && listDataByDate.Any())
                            {
                                obj.TotalWeight = listDataByDate.Sum(x => x.Weight);

                                var listSumOtherItem = listDataByDate
                                    .GroupBy(x => new { x.ItemName, x.AreaName })
                                    .Select(x => x.First())
                                    .ToList();

                                obj.ReportScaleByRegionDtos = listSumOtherItem.Select(x => new ReportScaleByRegionDto
                                {
                                    AreaName = x.AreaName,
                                    ItemName = x.ItemName,
                                    Weight = listDataByDate.ToList().Where(y => y.ItemName == x.ItemName && y.AreaName == x.AreaName).Sum(x => x.Weight),
                                    Date = x.Date,
                                    Percent = ((listDataByDate.ToList().Where(y => y.ItemName == x.ItemName && y.AreaName == x.AreaName).Sum(x => x.Weight) / obj.TotalWeight) * 100).ToString()
                                }).ToList();

                                listSumWeigthPercent = listSumWeigthPercent.Concat(obj.ReportScaleByRegionDtos.ToList()).ToList();
                            }
                            else
                            {
                                obj.TotalWeight = 0;
                                obj.ReportScaleByRegionDtos = new List<ReportScaleByRegionDto>(0);
                            }
                            listTotal.Add(obj);
                            reportScaleByRegionDtos = reportScaleByRegionDtos.Where(x => x.Date != item.ToString()).ToList();
                        }
                        listResult.ViewListReportScaleByRegionDto = listTotal;
                        // tổng cộng theo hàng hóa ở dưới
                        var listTotalItem = new List<TotalWeightAndPercent>();
                        listResult.TotalAll = listResult.ViewListReportScaleByRegionDto.Sum(x => x.TotalWeight).ToString();
                        foreach (var item in listSumWeigthPercent)
                        {
                            var obj = new TotalWeightAndPercent
                            {
                                AreaName = item.AreaName,
                                ItemName = item.ItemName,
                                TotalWeight = listSumWeigthPercent.ToList().Where(y => y.ItemName == item.ItemName && y.AreaName == item.AreaName).Sum(x => x.Weight).ToString(),
                                TotalPercent =
                              ((listSumWeigthPercent.Where(y => y.ItemName == item.ItemName && y.AreaName == item.AreaName).Sum(x => x.Weight) / double.Parse(listResult.TotalAll)) * 100).ToString()
                            };
                            listTotalItem.Add(obj);
                        }
                        listTotalItem = listTotalItem.DistinctBy(o => new { o.AreaName, o.ItemName }).ToList();
                        listResult.TotalWegthAndPercent = listTotalItem;
                        listResult.TotalAll = listResult.ViewListReportScaleByRegionDto.Sum(x => x.TotalWeight).ToString();
                    }
                    return _mapper.Map<TotalReportScaleByRegionDto>(listResult);
                }
                return null;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
    }
}
