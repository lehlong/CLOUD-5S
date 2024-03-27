using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.MD.Tracking;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderService : IGenericService<tblSoOrder, tblOrderDto>
    {
        Task<OrderPagedResponseDto> Search(OrderFilter filter);
        Task ConfirmPay(tblOrderUpdateStateDto model);
        Task CancelPay(tblOrderUpdateStateDto model);
        Task<byte[]> Export(OrderExportExcelFilter OrderExportFilter);
        Task Update(tblOrderUpdateBerthDto model); // do hang
        Task Update(tblOrderCheckOutDto model); // ra cong
        Task Update(tblOrderTrackingOffDto model); // den cang
        Task<OrderPagedResponseDto> SearchOrderByUpdate(OrderFilter filter);
        Task<OrderPagedResponseDto> SearchForMoisture(OrderFilter filter);
        Task<byte[]> ExportVehicleDownload(DateTime FromDate, DateTime ToDate, string VehicleCode);
        Task<tblVehicleOrderExport> ExportVehicle(DateTime FromDate, DateTime ToDate, string VehicleCode);
        Task<tblOrderShipExportDto> ExportCargo(DateTime FromDate, DateTime ToDate);
        Task<List<tblOrderTrackingDto>> GetTracking(OrderTrackingFilter filter);
        Task<byte[]> ExportCargoDownload(DateTime FromDate, DateTime ToDate);
        Task<tblOrderDto> GetByScale(object id);
    }
    public class OrderService : GenericService<tblSoOrder, tblOrderDto>, IOrderService
    {
        private readonly IHubContext<TrackingServiceHub> _trackingHubContext;
        private readonly IHubContext<RefreshServiceHub> _refreshHubContext;
        public OrderService(AppDbContext dbContext, IMapper mapper, IHubContext<TrackingServiceHub> trackingHubContext, IHubContext<RefreshServiceHub> refreshHubContext) : base(dbContext, mapper)
        {
            _trackingHubContext = trackingHubContext;
            _refreshHubContext = refreshHubContext;
        }

        public async Task<OrderPagedResponseDto> Search(OrderFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Moisture)
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Creator)
                    .Include(x => x.Scale)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.WorkingShift)
                    .Include(x => x.Manufactures)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Vehicle)

                    .Include(x => x.OrderProcesses)

                .Where(x => filter.FromDate == null
                         || x.OrderDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.OrderDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => filter.States == null
                         || !filter.States.Any()
                         || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))

                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyType)
                         || x.Company.Type == filter.CompanyType)

                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.OrderDetails.Any(y => y.ItemCode == filter.ItemCode))

                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.Type)
                         || x.Type == filter.Type)

                .Where(x => string.IsNullOrWhiteSpace(filter.BatchCode)
                         || x.OrderBatchCode == filter.BatchCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.DriverUserName)
                         || x.Vehicle.DriverUserName == filter.DriverUserName)

                .Where(x => string.IsNullOrWhiteSpace(filter.WorkingShiftCode)
                         || x.WorkingShiftCode == filter.WorkingShiftCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.VehicleCode.Contains(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord) || x.ScaleCode.Contains(filter.KeyWord)
                         || x.Scale.BillNumber.Contains(filter.KeyWord)
                         || x.VehicleCode.Replace(".", string.Empty).Contains(filter.KeyWord))

                .Where(x => filter.IsPaid == null
                         || (filter.IsPaid.Value ? (x.IsPaid == true) : (x.IsPaid == false || x.IsPaid == null)));

                if (filter.Weight1 == true)
                {
                    query = query.Where(x => x.Scale.Weight1 != null && x.Scale.Weight2 == null);
                }

                if (filter.Weight2 == true)
                {
                    query = query.Where(x => x.Scale.Weight2 != null && x.Scale.Weight1 != null);
                }

                query = query.OrderByDescending(x => x.OrderDate);
                switch (filter.IsFullInfor ?? false, filter.IsEmptyInfor ?? false)
                {
                    case (true, false):
                        query = query
                            .Where(x => x.Moisture != null ||
                                        (x.Moisture.TrayWeight != null ||
                                        x.Moisture.TrayWetWeight != null ||
                                        x.Moisture.WetWeight != null ||
                                        x.Moisture.TrayDryWeight != null ||
                                        x.Moisture.DryWeight != null ||
                                        x.Moisture.Moisture != null ||
                                        x.Moisture.Remark != null ||
                                        x.Moisture.ProcessBy != null)
                            );
                        break;

                    case (false, true):
                        query = query
                            .Where(x => x.Moisture == null ||
                                        (x.Moisture.TrayWeight == null ||
                                        x.Moisture.TrayWetWeight == null ||
                                        x.Moisture.WetWeight == null ||
                                        x.Moisture.TrayDryWeight == null ||
                                        x.Moisture.DryWeight == null ||
                                        x.Moisture.Moisture == null ||
                                        x.Moisture.Remark == null ||
                                        x.Moisture.ProcessBy == null)
                            );
                        break;

                    case (true, true):
                        break;
                    case (false, false):
                        break;
                }

                var result = await Paging(query.OrderByDescending(x => x.Scale.TimeWeight2 ?? x.Scale.TimeWeight1), filter);
                var number = await query.CountAsync();
                var quantity = await query.SelectMany(x => x.OrderDetails).SumAsync(x => x.OrderNumber);

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                var results = result.Data as List<tblOrderDto>;

                results.ForEach(x =>
                {
                    x.EndLocation = new LocationStationDto()
                    {
                        Address = defaultValue?.PortAddress,
                        Latitude = defaultValue?.PortLatitude,
                        Longitude = defaultValue?.PortLongitude,
                        Name = defaultValue?.PortName,
                    };
                });

                return new OrderPagedResponseDto()
                {
                    CurrentPage = result.CurrentPage,
                    Data = results,
                    PageSize = result.PageSize,
                    TotalPage = result.TotalPage,
                    TotalRecord = result.TotalRecord,
                    Number = number,
                    Quantity = quantity,
                };
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<IList<tblOrderDto>> GetAll()
        {
            try
            {
                var query = await _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Area)
                    .Include(x => x.Moisture)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.Unit)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Partner)
                    .Include(x => x.Creator)
                    .Include(x => x.Vehicle)
                    .Include(x => x.OrderProcesses)
                    .ThenInclude(x => x.Account)
                    .OrderByDescending(x => x.CreateDate)
                    .ToListAsync();

                return _mapper.Map<List<tblOrderDto>>(query);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblOrderDto> GetById(object id)
        {
            try
            {
                var entity = await _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Area)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Partner)
                    .Include(x => x.Creator)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.OrderProcesses)
                    .ThenInclude(x => x.Account)
                    .Include(x => x.Scale)
                    .FirstOrDefaultAsync(x => x.Code == id.ToString());

                var data = _mapper.Map<tblOrderDto>(entity);
                data.OrderDetails = data.OrderDetails.ToList();
                return data;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblOrderDto> GetByScale(object id)
        {
            try
            {
                var entity = await _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Area)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Partner)
                    .Include(x => x.Creator)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.OrderProcesses)
                    .ThenInclude(x => x.Account)
                    .Include(x => x.Scale)
                    .FirstOrDefaultAsync(x => x.Scale.SyncCode == id.ToString());

                if(entity == null)
                {
                    return null;
                }

                var data = _mapper.Map<tblOrderDto>(entity);
                data.OrderDetails = data.OrderDetails.ToList();
                return data;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }


        public async Task ConfirmPay(tblOrderUpdateStateDto model)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var entityInDB = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.Code);

                if (entityInDB == null)
                {
                    Status = false;
                    MessageObject.Code = "2003";
                    return;
                }

                entityInDB.IsPaid = true;

                await _dbContext.SaveChangesAsync();
                await AddProcess(entityInDB.State, model.Code, action: OrderAction.THANH_TOAN.ToString());

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task CancelPay(tblOrderUpdateStateDto model)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var entityInDB = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.Code);

                if (entityInDB == null)
                {
                    Status = false;
                    MessageObject.Code = "2003";
                    return;
                }

                entityInDB.IsPaid = false;

                await _dbContext.SaveChangesAsync();
                await AddProcess(entityInDB.State, model.Code, action: OrderAction.HUY_THANH_TOAN.ToString());
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task<byte[]> Export(OrderExportExcelFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Moisture)
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Creator)
                    .Include(x => x.Scale)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Vehicle)

                    .Include(x => x.OrderProcesses)

                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))

                .Where(x => filter.FromDate == null
                         || x.OrderDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.OrderDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => filter.States == null
                         || !filter.States.Any()
                         || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))

                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode)
                         || x.OrderDetails.Any(y => y.ItemCode == filter.ItemCode))

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyType)
                         || x.Company.Type == filter.CompanyType)

                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.Type)
                         || x.Type == filter.Type)

                .Where(x => string.IsNullOrWhiteSpace(filter.BatchCode)
                         || x.OrderBatchCode == filter.BatchCode)

                .Where(x => filter.IsPaid == null
                         || (filter.IsPaid.Value ? (x.IsPaid == true) : (x.IsPaid == false || x.IsPaid == null)))

                .OrderByDescending(x => x.CreateDate).ToListAsync();

                if (filter.Type == "XUAT_HANG")
                {
                    var cellData = raw_data.Select((x, i) => new ExportCellExcelOrderDto()
                    {
                        Code = x?.Code,
                        OrderDate = x?.OrderDate.ToString(),
                        ItemName = x?.OrderDetails?.FirstOrDefault()?.Item?.Name,
                        PartnerName = x?.Partner?.Name,
                        OrdinalNumber = i + 1,
                        State = x?.State,
                        CompanyName = x?.Company?.Name,
                        ScaleCode = x?.Scale?.Code,
                        VehicleCode = x?.Vehicle?.Code,
                        WeightScale = x?.Scale?.Weight ?? 0,
                        OrderBatchCode = x?.OrderBatchCode,
                        UnitName = x?.OrderDetails?.FirstOrDefault()?.Unit?.Name
                    }).ToList();
                    return await new ExcelExporter(_dbContext).ExportToExcel(cellData, ExcelExportType.PHIEU_XUAT_HANG);
                }

                var data = raw_data.Select((x, i) => new ExportExcelOrderDto()
                {
                    Code = x?.Code,
                    OrderDate = x?.OrderDate.ToString(),
                    ItemName = x?.OrderDetails?.FirstOrDefault()?.Item?.Name,
                    PartnerName = x?.Partner?.Name,
                    OrdinalNumber = i + 1,
                    State = x?.State,
                    CompanyName = x?.Company?.Name,
                    ScaleCode = x?.Scale?.Code,
                    VehicleCode = x?.Vehicle?.Code,
                    AreaName = x?.Area?.Name,
                    UnitName = x?.OrderDetails?.FirstOrDefault()?.Unit?.Name,
                    WeightScale = x?.Scale?.Weight ?? 0,
                    IsPaid = x?.IsPaid == true ? "Đã thanh toán" : "Chưa thanh toán",
                }).ToList();

                return await new ExcelExporter(_dbContext).ExportToExcel(data, ExcelExportType.PHIEU_NHAP_HANG);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.MessageObject.Message = ex.Message;
                this.Exception = ex;
                return null;
            }
        }

        private async Task AddProcess(string oldState, string orderCode, OrderState? newState = null, string action = null)
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
            };

            var processObj = _mapper.Map<tblSoOrderProcess>(process);
            await _dbContext.tblSoOrderProcess.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(tblOrderUpdateBerthDto model)
        {
            var currentObj = await _dbContext.tblSoOrder.Include(x => x.OrderProcesses).Include(x => x.OrderDetails).AsNoTracking().FirstOrDefaultAsync(x => x.Code == model.Code);

            if (currentObj.State != OrderState.CAN_LAN_2.ToString()
                && currentObj.State != OrderState.RA_CONG.ToString()
                && currentObj.State != OrderState.DEN_CANG.ToString()
                && currentObj.State != OrderState.DO_HANG.ToString())
            {
                this.Status = false;
                this.MessageObject.Code = "3011";
                return;
            }

            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                if (!currentObj.OrderProcesses.Any(x => x.State == OrderState.DEN_CANG.ToString()))
                {
                    await Update(new tblOrderTrackingOffDto()
                    {
                        Code = model.Code,
                    });
                }

                await base.Update(model);

                if (this.Status)
                {
                    await AddProcess(currentObj.State, model.Code, OrderState.DO_HANG);
                    var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Orders).ThenInclude(x => x.OrderDetails).FirstOrDefaultAsync(x => x.Code == currentObj.OrderBatchCode);
                    if (orderBatch != null)
                    {
                        orderBatch.CompleteNumber = orderBatch.Orders.Where(x => x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);
                        _dbContext.Update(orderBatch);
                        await _dbContext.SaveChangesAsync();
                        await _refreshHubContext.Clients.All.SendAsync("ORDER_BATCH");
                    }
                }
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                await _dbContext.Database.RollbackTransactionAsync();
            }
        }

        public async Task Update(tblOrderCheckOutDto model)
        {
            var currentObj = await _dbContext.tblSoOrder.Include(x => x.OrderDetails).AsNoTracking().FirstOrDefaultAsync(x => x.Code == model.Code);

            await base.Update(model);

            if (this.Status)
            {
                await AddProcess(currentObj.State, model.Code, OrderState.RA_CONG);

                await _trackingHubContext.Clients.All.SendAsync("Tracking");
            }
        }

        public async Task Update(tblOrderTrackingOffDto model)
        {
            var currentObj = await _dbContext.tblSoOrder.AsNoTracking().FirstOrDefaultAsync(x => x.Code == model.Code);

            await base.Update(model);

            if (this.Status)
            {
                await AddProcess(currentObj.State, model.Code, OrderState.DEN_CANG);

                var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Orders).ThenInclude(x => x.OrderDetails).FirstOrDefaultAsync(x => x.Code == currentObj.OrderBatchCode);
                if (orderBatch != null)
                {
                    orderBatch.DeliveringNumber = orderBatch.Orders.Count(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString());
                    orderBatch.CompleteDeliveryNumber = orderBatch.Orders.Count(x => x.State == OrderState.DO_HANG.ToString() || x.State == OrderState.DEN_CANG.ToString());
                    await _dbContext.SaveChangesAsync();
                }
                await _trackingHubContext.Clients.All.SendAsync("Tracking");
                await _refreshHubContext.Clients.All.SendAsync("ORDER_BATCH");
            }
        }

        public async Task<OrderPagedResponseDto> SearchOrderByUpdate(OrderFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Moisture)
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Creator)
                    .Include(x => x.Scale)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Vehicle)

                    .Include(x => x.OrderProcesses)

                .Where(x => filter.FromDate == null
                         || x.OrderDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.OrderDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => filter.States == null
                         || !filter.States.Any()
                         || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))

                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.Type)
                         || x.Type == filter.Type)

                .Where(x => string.IsNullOrWhiteSpace(filter.BatchCode)
                         || x.OrderBatchCode == filter.BatchCode)

                .Where(x => filter.IsPaid == null
                         || (filter.IsPaid.Value ? (x.IsPaid == true) : (x.IsPaid == false || x.IsPaid == null)))

                .OrderByDescending(x => x.UpdateDate);

                var result = await Paging(query, filter);
                var number = await query.CountAsync();
                var quantity = await query.SelectMany(x => x.OrderDetails).SumAsync(x => x.OrderNumber);
                return new OrderPagedResponseDto()
                {
                    CurrentPage = result.CurrentPage,
                    Data = result.Data,
                    PageSize = result.PageSize,
                    TotalPage = result.TotalPage,
                    TotalRecord = result.TotalRecord,
                    Number = number,
                    Quantity = quantity
                };
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<OrderPagedResponseDto> SearchForMoisture(OrderFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrder
                    .IgnoreQueryFilters()
                    .Include(x => x.Moisture)
                    .Include(x => x.Partner)
                    .Include(x => x.Area)
                    .Include(x => x.Company)
                    .Include(x => x.Vehicle)
                    .Include(x => x.Creator)
                    .Include(x => x.Scale)
                    .Include(x => x.Ship)
                    .Include(x => x.Berth)
                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)

                     .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                    .Include(x => x.OrderBatch)
                        .ThenInclude(x => x.Partner)
                    .Include(x => x.OrderBatch)
                    .Include(x => x.Vehicle)

                    .Include(x => x.OrderProcesses)

                .Where(x => filter.FromDate == null
                         || x.OrderDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.OrderDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => filter.States == null
                         || !filter.States.Any()
                         || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))

                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode)
                         || x.PartnerCode == filter.PartnerCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.VehicleCode == filter.VehicleCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode)
                         || x.CompanyCode == filter.CompanyCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.CompanyType)
                         || x.Company.Type == filter.CompanyType)

                .Where(x => string.IsNullOrWhiteSpace(filter.AreaCode)
                         || x.AreaCode == filter.AreaCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.Type)
                         || x.Type == filter.Type)

                .Where(x => string.IsNullOrWhiteSpace(filter.BatchCode)
                         || x.OrderBatchCode == filter.BatchCode)

                .Where(x => filter.IsPaid == null
                         || (filter.IsPaid.Value ? (x.IsPaid == true) : (x.IsPaid == false || x.IsPaid == null)))

                .Where(x => x.Moisture != null)
                .OrderBy(x => x.AreaCode)
                .ThenByDescending(x => x.OrderDate);

                var result = await Paging(query, filter);
                var number = await query.CountAsync();
                var quantity = await query.SelectMany(x => x.OrderDetails).SumAsync(x => x.OrderNumber);
                return new OrderPagedResponseDto()
                {
                    CurrentPage = result.CurrentPage,
                    Data = result.Data,
                    PageSize = result.PageSize,
                    TotalPage = result.TotalPage,
                    TotalRecord = result.TotalRecord,
                    Number = number,
                    Quantity = quantity
                };
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblVehicleOrderExport> ExportVehicle(DateTime FromDate, DateTime ToDate, string VehicleCode)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            TimeSpan ZeroSpan = new(0, 0, 0);

            TimeSpan SixSpan = new(5, 59, 59);

            TimeSpan TwelveSpan = new(11, 59, 59);

            TimeSpan EightTeenSpan = new(17, 59, 59);

            TimeSpan Twelve4Span = new(23, 59, 59);

            var query = await _dbContext.tblSoOrder
                .Include(x => x.OrderDetails)
            .Where(x => x.Type == OrderType.XUAT_HANG.ToString())
            .Where(x => x.OrderDetails.Any(y => y.ItemCode == defaultValue.DefaultProductItemCode))
            .Where(x => x.State != OrderState.KHOI_TAO.ToString())
            .Where(x => x.State != OrderState.CAN_LAN_1.ToString())
            .Where(x => x.State != OrderState.DA_HUY.ToString())
            .Where(x => x.OrderDate.Value.Date >= FromDate.Date)
            .Where(x => x.OrderDate.Value.Date <= ToDate.Date)
            .Where(x => string.IsNullOrEmpty(VehicleCode) || x.VehicleCode == VehicleCode)
            .GroupBy(x => x.VehicleCode)
            .Select(x => new
            {
                VehicleCode = x.Key,
                OrderDates = x.Select(y => new
                {
                    y.OrderDate,
                    Weight = y.OrderDetails.Sum(z => z.OrderNumber)
                }).ToList(),
            }).ToListAsync();

            var data = query
                .Select(x => new tblVehicleOrderTotal()
                {
                    VehicleCode = x.VehicleCode,
                    Data = x.OrderDates.GroupBy(y => y.OrderDate.Value.Date)
                    .Select(y => new tblVehicleOrderTotalDto()
                    {
                        OrderDate = y.Key,
                        Value0To6 = y.Count(z => z.OrderDate >= (z.OrderDate.Value.Date + ZeroSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + SixSpan)),
                        Value6To12 = y.Count(z => z.OrderDate >= (z.OrderDate.Value.Date + SixSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + TwelveSpan)),
                        Value12To18 = y.Count(z => z.OrderDate >= (z.OrderDate.Value.Date + TwelveSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + EightTeenSpan)),
                        Value18To24 = y.Count(z => z.OrderDate >= (z.OrderDate.Value.Date + EightTeenSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + Twelve4Span)),
                        Weight0To6 = y.Where(z => z.OrderDate >= (z.OrderDate.Value.Date + ZeroSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + SixSpan)).Sum(z => z.Weight),
                        Weight6To12 = y.Where(z => z.OrderDate >= (z.OrderDate.Value.Date + SixSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + TwelveSpan)).Sum(z => z.Weight),
                        Weight12To18 = y.Where(z => z.OrderDate >= (z.OrderDate.Value.Date + TwelveSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + EightTeenSpan)).Sum(z => z.Weight),
                        Weight18To24 = y.Where(z => z.OrderDate >= (z.OrderDate.Value.Date + EightTeenSpan) && z.OrderDate.Value <= (z.OrderDate.Value.Date + Twelve4Span)).Sum(z => z.Weight),
                    }).ToList()
                }).ToList();

            foreach (var day in Utils.LoopDay(FromDate, ToDate))
            {
                foreach (var item in data)
                {
                    if (!item.Data.Any(x => x.OrderDate.Date == day.Date))
                    {
                        item.Data.Add(new tblVehicleOrderTotalDto()
                        {
                            OrderDate = day.Date,
                        });
                    }
                    item.Data = item.Data.OrderBy(x => x.OrderDate).ToList();
                }
            }

            var totalsValue = new tblVehicleOrderExport()
            {
                OrderTotals = data
            };

            return totalsValue;
        }

        public async Task<byte[]> ExportVehicleDownload(DateTime FromDate, DateTime ToDate, string VehicleCode)
        {

            var raw_data = await ExportVehicle(FromDate, ToDate, VehicleCode);

            var data = raw_data.OrderTotals.Select((x, i) => new tblVehicleOrderTotal()
            {
                VehicleCode = x.VehicleCode,
                OrdinalNumber = i + 1,
                Data = x.Data.OrderBy(x => x.OrderDate).ToList()
            }).ToList();

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(ToDate.ToShortDateString());

            worksheet.Cells.Style.Font.Size = 13;
            worksheet.Cells[2, 1, 2, 22].Merge = true;
            worksheet.Cells[2, 1, 2, 22].Value = "BẢNG TỔNG HỢP SỐ CHUYẾN CÁC XE VẬN CHUYỂN DĂM TỪ HÒA NHƠN VỀ TIÊN SA";
            worksheet.Cells[2, 1, 2, 22].Style.Font.Bold = true;
            worksheet.Cells[2, 1, 2, 22].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[2, 1, 2, 22].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[3, 1, 3, 22].Merge = true;
            worksheet.Cells[3, 1, 3, 22].Value = $"từ ngày {FromDate.Day} tháng {FromDate.Month} năm {FromDate.Year}";
            worksheet.Cells[3, 1, 3, 22].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[3, 1, 3, 22].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[4, 1, 4, 22].Merge = true;
            worksheet.Cells[4, 1, 4, 22].Value = $"ĐƠN VỊ: VẬN TẢI DUNG QUẤT";
            worksheet.Cells[4, 1, 4, 22].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[4, 1, 4, 22].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[6, 1, 8, 1].Merge = true;
            worksheet.Cells[6, 1, 8, 1].Value = "TT";
            worksheet.Cells[6, 1, 8, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[6, 1, 8, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[6, 2, 8, 2].Merge = true;
            worksheet.Cells[6, 2, 8, 2].Value = "Số xe";
            worksheet.Cells[6, 2, 8, 2].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[6, 2, 8, 2].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            var totalDay = (ToDate - FromDate).Days;

            worksheet.Cells[6, 3, 6, 6 + (totalDay * 4)].Merge = true;
            worksheet.Cells[6, 3, 6, 6 + (totalDay * 4)].Value = "Số chuyến trong mỗi ca";
            worksheet.Cells[6, 3, 6, 6 + (totalDay * 4)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[6, 3, 6, 6 + (totalDay * 4)].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            int col = 3;
            int row = 7;
            foreach (var day in Utils.LoopDay(FromDate, ToDate))
            {
                row = 7;
                worksheet.Cells[row, col, row, col + 3].Merge = true;
                worksheet.Cells[row, col, row, col + 3].Value = $"{day:dd/MM/yyyy}";
                worksheet.Cells[row, col, row, col + 3].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[row, col, row, col + 3].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                row++;
                worksheet.Cells[row, col].Value = "0h-6h";
                col++;
                worksheet.Cells[row, col].Value = "6h-12h";
                col++;
                worksheet.Cells[row, col].Value = "12h-18h";
                col++;
                worksheet.Cells[row, col].Value = "18h-24h";
                col++;
            }
            worksheet.Cells[row - 1, col, row, col].Value = "Tổng cộng";
            worksheet.Cells[row - 1, col, row, col].Merge = true;
            worksheet.Cells[row - 1, col, row, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row - 1, col, row, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            col++;
            row++;

            foreach (var item in data)
            {
                col = 1;

                // Kiểm tra nếu đây không phải là hàng đầu tiên và OrdinalNumber, VehicleCode giống với hàng trước đó
                if (row > 1 && IsNumeric(worksheet.Cells[row - 1, 1].Value) && Convert.ToInt32(worksheet.Cells[row - 1, 1].Value) == item.OrdinalNumber &&
                    worksheet.Cells[row - 1, 2].Value?.ToString() == item.VehicleCode.ToUpper())
                {
                    // Nếu không phải hàng đầu tiên và giống với hàng trước đó, sử dụng Merge để nhập chung ô
                    worksheet.Cells[row - 1, 1, row, 1].Merge = true;
                    worksheet.Cells[row - 1, 2, row, 2].Merge = true;

                    worksheet.Cells[row - 1, 1, row, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row - 1, 1, row, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                    worksheet.Cells[row - 1, 2, row, 2].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row - 1, 2, row, 2].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                }
                else
                {
                    // Nếu là hàng đầu tiên hoặc không giống với hàng trước đó, đặt giá trị cho OrdinalNumber và VehicleCode
                    worksheet.Cells[row, col].Value = item.OrdinalNumber;
                    col++;
                    worksheet.Cells[row, col].Value = item.VehicleCode.ToUpper();
                    col++;
                }

                // Đặt giá trị cho Data
                bool IsNumeric(object value)
                {
                    int number;
                    return int.TryParse(value?.ToString(), out number);
                }
                foreach (var i in item.Data)
                {
                    worksheet.Cells[row, col].Value = i.Value0To6;
                    col++;
                    worksheet.Cells[row, col].Value = i.Value6To12;
                    col++;
                    worksheet.Cells[row, col].Value = i.Value12To18;
                    col++;
                    worksheet.Cells[row, col].Value = i.Value18To24;
                    col++;
                }
                // Đặt giá trị cho Total
                worksheet.Cells[row, col].Value = item.Total;
                row++;
                // Reset cột về 3 để bắt đầu cho phần Weight
                col = 3;
                // Kiểm tra nếu đây không phải là hàng đầu tiên và giống với hàng trước đó, sử dụng Merge để nhập chung ô
                if (row > 1 && IsNumeric(worksheet.Cells[row - 1, 1].Value) && Convert.ToInt32(worksheet.Cells[row - 1, 1].Value) == item.OrdinalNumber &&
                    worksheet.Cells[row - 1, 2].Value?.ToString() == item.VehicleCode.ToUpper())
                {
                    worksheet.Cells[row - 1, 1, row, 1].Merge = true;
                    worksheet.Cells[row - 1, 2, row, 2].Merge = true;

                    worksheet.Cells[row - 1, 1, row, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row - 1, 1, row, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                    worksheet.Cells[row - 1, 2, row, 2].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row - 1, 2, row, 2].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                }
                else
                {
                    // Nếu là hàng đầu tiên hoặc không giống với hàng trước đó, đặt giá trị cho OrdinalNumber và VehicleCode
                    worksheet.Cells[row, col].Value = item.OrdinalNumber;
                    col++;
                    worksheet.Cells[row, col].Value = item.VehicleCode.ToUpper();
                    col++;
                }
                // Đặt giá trị cho Weight
                foreach (var i in item.Data)
                {
                    worksheet.Cells[row, col].Value = i.Weight0To6;
                    col++;
                    worksheet.Cells[row, col].Value = i.Weight6To12;
                    col++;
                    worksheet.Cells[row, col].Value = i.Weight12To18;
                    col++;
                    worksheet.Cells[row, col].Value = i.Weight18To24;
                    col++;
                }
                // Đặt giá trị cho TotalWeight
                worksheet.Cells[row, col].Value = item.TotalWeight;
                row++;
            }

            var totalsValue = new tblVehicleOrderExport()
            {
                OrderTotals = data
            };
            col = 1;
            worksheet.Cells[row, col].Value = "Số chuyến";
            worksheet.Cells[row, col].Style.Font.Bold = true;
            worksheet.Cells[row, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[row + 1, col].Value = "Khối lượng (tấn)";
            worksheet.Cells[row + 1, col].Style.Font.Bold = true;
            worksheet.Cells[row + 1, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row + 1, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            worksheet.Cells[row + 2, col].Value = "KLTB (tấn/xe)";
            worksheet.Cells[row + 2, col].Style.Font.Bold = true;
            worksheet.Cells[row + 2, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row + 2, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            col++;
            col++;

            foreach (var item in totalsValue.TotalValues)
            {
                worksheet.Cells[row, col].Value = item.Value0To6;
                worksheet.Cells[row + 1, col].Value = item.Weight0To6;
                worksheet.Cells[row + 2, col].Value = item.Average0To6;
                col++;
                worksheet.Cells[row, col].Value = item.Value6To12;
                worksheet.Cells[row + 1, col].Value = item.Weight6To12;
                worksheet.Cells[row + 2, col].Value = item.Average6To12;
                col++;
                worksheet.Cells[row, col].Value = item.Value12To18;
                worksheet.Cells[row + 1, col].Value = item.Weight12To18;
                worksheet.Cells[row + 2, col].Value = item.Average12To18;
                col++;
                worksheet.Cells[row, col].Value = item.Value18To24;
                worksheet.Cells[row + 1, col].Value = item.Weight18To24;
                worksheet.Cells[row + 2, col].Value = item.Average18To24;
                col++;
            }
            worksheet.Cells[row, col].Value = totalsValue.TotalValue;
            worksheet.Cells[row + 1, col].Value = totalsValue.TotalWeight;
            worksheet.Cells[row + 2, col].Value = totalsValue.TotalAverage;

            row += 3;
            row++;
            col = 1;

            worksheet.Cells[row, col].Value = "*";
            worksheet.Cells[row + 1, col].Value = "*";
            worksheet.Cells[row + 2, col].Value = "*";

            col++;
            worksheet.Cells[row, col].Value = "Tổng số chuyến đã vận chuyển:";
            worksheet.Cells[row + 1, col].Value = "Tổng khối lượng dăm đã vận chuyển:";
            worksheet.Cells[row + 2, col].Value = "Khối lượng trung bình";

            col++;
            col++;
            col++;
            col++;

            worksheet.Cells[row, col].Value = totalsValue.TotalValue;
            worksheet.Cells[row + 1, col].Value = totalsValue.TotalWeight;
            worksheet.Cells[row + 2, col].Value = totalsValue.TotalAverage;
            col++;

            return package.GetAsByteArray();
        }

        public async Task<tblOrderShipExportDto> ExportCargo(DateTime FromDate, DateTime ToDate)
        {
            TimeSpan ZeroSpan = new(0, 0, 0);

            TimeSpan SixSpan = new(5, 59, 59);

            TimeSpan TwelveSpan = new(11, 59, 59);

            TimeSpan EightTeenSpan = new(17, 59, 59);

            TimeSpan Twelve4Span = new(23, 59, 59);

            var raw_data = await _dbContext.tblSoOrder
                .Include(x => x.OrderDetails)
                .Include(x => x.Berth)
                .Where(x => x.Type == OrderType.XUAT_HANG.ToString())

                .Where(x => x.State == OrderState.DO_HANG.ToString())

                .Where(x => x.GetOffTime.Value.Date >= FromDate.Date)

                .Where(x => x.GetOffTime.Value.Date <= ToDate.Date)

                .Where(x => !string.IsNullOrWhiteSpace(x.BerthCode))

                .Where(x => x.CargoCompartmentNumber != null && x.CargoCompartmentNumber != 0)

                .Select(x => new tblCargoOrderTmpDto
                {
                    GetOffTime = x.GetOffTime.Value,
                    Weight = x.OrderDetails.Sum(y => y.OrderNumber),
                    Vehicle = x.VehicleCode,
                    Bridge = x.Berth.Name,
                    Tunel = x.CargoCompartmentNumber.Value,
                }).ToListAsync();

            var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Ship).Where(x => x.StartDate.Value.Date <= FromDate.Date)
                .Where(x => x.EndDate.Value.Date >= ToDate.Date).FirstOrDefaultAsync();

            if (raw_data == null || !raw_data.Any())
            {
                return new tblOrderShipExportDto(new List<tblCargoOrderDateDto>(), orderBatch?.Ship?.Name);
            }

            foreach (var item in Utils.LoopDay(FromDate.Date, ToDate.Date))
            {
                if (!raw_data.Any(x => x.GetOffTime.Date == item))
                {
                    raw_data.Add(new tblCargoOrderTmpDto()
                    {
                        GetOffTime = item,
                        Bridge = raw_data.FirstOrDefault().Bridge,
                        Tunel = raw_data.FirstOrDefault().Tunel,
                        Weight = 0
                    });
                }
            }
            raw_data = raw_data.OrderBy(x => x.GetOffTime).ToList();

            int minTunel = raw_data.Min(x => x.Tunel);
            int maxTunel = raw_data.Max(x => x.Tunel);

            if (minTunel < maxTunel)
            {
                for (int i = minTunel; i < maxTunel; i++)
                {
                    if (!raw_data.Any(x => x.Tunel == i))
                    {
                        raw_data.Add(new tblCargoOrderTmpDto
                        {
                            Tunel = i,
                            Bridge = string.Empty,
                            GetOffTime = FromDate.Date
                        });
                    }
                }
            }

            var data = raw_data.GroupBy(x => x.GetOffTime.Date)
                .Select(x => new tblCargoOrderDateDto()
                {
                    Date = x.Key.Date,
                    Shift0To6 = x.Where(y => y.GetOffTime >= (y.GetOffTime.Date + ZeroSpan) && y.GetOffTime <= (y.GetOffTime.Date + SixSpan))
                    .GroupBy(y => new
                    {
                        Tunel = y.Tunel,
                        Bridge = y.Bridge,
                    })
                    .Select(y => new tblCargoOrderShiftDto()
                    {
                        Time = "1",
                        Tunel = new List<tblCargoOrderBaseDto>() { new() {
                            Tunel = y.Key.Tunel,
                            Bridge = y.Key.Bridge,
                            Vehicle = y.Count(k => !string.IsNullOrWhiteSpace(k.Vehicle)),
                            Weight = y.Sum(k => k.Weight)
                        } }
                    }).ToList(),
                    Shift6To12 = x.Where(y => y.GetOffTime >= (y.GetOffTime.Date + SixSpan) && y.GetOffTime <= (y.GetOffTime.Date + TwelveSpan))
                    .GroupBy(y => new
                    {
                        Tunel = y.Tunel,
                        Bridge = y.Bridge,
                    })
                    .Select(y => new tblCargoOrderShiftDto()
                    {
                        Time = "2",
                        Tunel = new List<tblCargoOrderBaseDto>() { new() {
                            Tunel = y.Key.Tunel,
                            Bridge = y.Key.Bridge,
                            Vehicle = y.Count(k => !string.IsNullOrWhiteSpace(k.Vehicle)),
                            Weight = y.Sum(k => k.Weight)
                        } }
                    }).ToList(),
                    Shift12To18 = x.Where(y => y.GetOffTime >= (y.GetOffTime.Date + TwelveSpan) && y.GetOffTime <= (y.GetOffTime.Date + EightTeenSpan))
                    .GroupBy(y => new
                    {
                        Tunel = y.Tunel,
                        Bridge = y.Bridge,
                    })
                    .Select(y => new tblCargoOrderShiftDto()
                    {
                        Time = "3",
                        Tunel = new List<tblCargoOrderBaseDto>() { new() {
                            Tunel = y.Key.Tunel,
                            Bridge = y.Key.Bridge,
                            Vehicle = y.Count(k => !string.IsNullOrWhiteSpace(k.Vehicle)),
                            Weight = y.Sum(k => k.Weight)
                        } }
                    }).ToList(),
                    Shift18To24 = x.Where(z => z.GetOffTime >= (z.GetOffTime.Date + EightTeenSpan) && z.GetOffTime <= (z.GetOffTime.Date + Twelve4Span))
                     .GroupBy(y => new
                     {
                         Tunel = y.Tunel,
                         Bridge = y.Bridge,
                     })
                    .Select(y => new tblCargoOrderShiftDto()
                    {
                        Time = "4",
                        Tunel = new List<tblCargoOrderBaseDto>() { new() {
                            Tunel = y.Key.Tunel,
                            Bridge = y.Key.Bridge,
                            Vehicle = y.Count(k => !string.IsNullOrWhiteSpace(k.Vehicle)),
                            Weight = y.Sum(k => k.Weight)
                        } }
                    }).ToList(),
                }).ToList();

            var listTime = new List<string>() { "1", "2", "3", "4" };

            foreach (var item in data)
            {
                if (item.Shift0To6 == null || !item.Shift0To6.Any())
                {
                    item.Shift0To6 = new List<tblCargoOrderShiftDto>() { new tblCargoOrderShiftDto() { Time = "1", Tunel = new() { new tblCargoOrderBaseDto() { Bridge = raw_data.FirstOrDefault()?.Bridge, Tunel = raw_data.FirstOrDefault()?.Tunel ?? 0 } } } };
                }
                foreach (var shift in item.Shift0To6)
                {
                    var tunel = raw_data.Where(x => !shift.Tunel.Any(y => y.Tunel == x.Tunel) || !shift.Tunel.Any(y => y.Bridge == x.Bridge)).DistinctBy(x => new { x.Tunel, x.Bridge }).ToList();

                    if (tunel != null)
                    {
                        shift.Tunel.AddRange(tunel.Select(x => new tblCargoOrderBaseDto()
                        {
                            Tunel = x.Tunel,
                            Bridge = x.Bridge,
                            Vehicle = 0,
                            Weight = 0,
                        }));
                        shift.Tunel = shift.Tunel.OrderBy(x => x.Tunel).ToList();
                    }
                }

                if (item.Shift6To12 == null || !item.Shift6To12.Any())
                {
                    item.Shift6To12 = new List<tblCargoOrderShiftDto>() { new tblCargoOrderShiftDto() { Time = "2", Tunel = new() { new tblCargoOrderBaseDto() { Bridge = raw_data.FirstOrDefault()?.Bridge, Tunel = raw_data.FirstOrDefault()?.Tunel ?? 0 } } } };
                }
                foreach (var shift in item.Shift6To12)
                {
                    var tunel = raw_data.Where(x => !shift.Tunel.Any(y => y.Tunel == x.Tunel) || !shift.Tunel.Any(y => y.Bridge == x.Bridge)).DistinctBy(x => new { x.Tunel, x.Bridge }).ToList();

                    if (tunel != null)
                    {
                        shift.Tunel.AddRange(tunel.Select(x => new tblCargoOrderBaseDto()
                        {
                            Tunel = x.Tunel,
                            Bridge = x.Bridge,
                            Vehicle = 0,
                            Weight = 0,
                        }));
                        shift.Tunel = shift.Tunel.OrderBy(x => x.Tunel).ToList();
                    }
                }

                if (item.Shift12To18 == null || !item.Shift12To18.Any())
                {
                    item.Shift12To18 = new List<tblCargoOrderShiftDto>() { new tblCargoOrderShiftDto() { Time = "3", Tunel = new() { new tblCargoOrderBaseDto() { Bridge = raw_data.FirstOrDefault()?.Bridge, Tunel = raw_data.FirstOrDefault()?.Tunel ?? 0 } } } };
                }
                foreach (var shift in item.Shift12To18)
                {
                    var tunel = raw_data.Where(x => !shift.Tunel.Any(y => y.Tunel == x.Tunel) || !shift.Tunel.Any(y => y.Bridge == x.Bridge)).DistinctBy(x => new { x.Tunel, x.Bridge }).ToList();

                    if (tunel != null)
                    {
                        shift.Tunel.AddRange(tunel.Select(x => new tblCargoOrderBaseDto()
                        {
                            Tunel = x.Tunel,
                            Bridge = x.Bridge,
                            Vehicle = 0,
                            Weight = 0,
                        }));
                        shift.Tunel = shift.Tunel.OrderBy(x => x.Tunel).ToList();
                    }
                }

                if (item.Shift18To24 == null || !item.Shift18To24.Any())
                {
                    item.Shift18To24 = new List<tblCargoOrderShiftDto>() { new tblCargoOrderShiftDto() { Time = "4", Tunel = new() { new tblCargoOrderBaseDto() { Bridge = raw_data.FirstOrDefault()?.Bridge, Tunel = raw_data.FirstOrDefault()?.Tunel ?? 0 } } } };
                }
                foreach (var shift in item.Shift18To24)
                {
                    var tunel = raw_data.Where(x => !shift.Tunel.Any(y => y.Tunel == x.Tunel) || !shift.Tunel.Any(y => y.Bridge == x.Bridge)).DistinctBy(x => new { x.Tunel, x.Bridge }).ToList();

                    if (tunel != null)
                    {
                        shift.Tunel.AddRange(tunel.Select(x => new tblCargoOrderBaseDto()
                        {
                            Tunel = x.Tunel,
                            Bridge = x.Bridge,
                            Vehicle = 0,
                            Weight = 0,
                        }));
                        shift.Tunel = shift.Tunel.OrderBy(x => x.Tunel).ToList();
                    }
                }
            }

            return new tblOrderShipExportDto(data, orderBatch?.Ship?.Name);
        }

        public async Task<byte[]> ExportCargoDownload(DateTime FromDate, DateTime ToDate)
        {
            var data = await ExportCargo(FromDate, ToDate);
            var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Ship).Where(x => x.StartDate.Value.Date <= FromDate.Date)
                .Where(x => x.EndDate.Value.Date >= ToDate.Date).FirstOrDefaultAsync();

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(DateTime.Now.ToShortDateString());

            #region Header
            int row = 8;
            int col = 1;
            worksheet.Cells[row, col].Value = "Ngày";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            col++;
            worksheet.Cells[row, col].Value = "Ca";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            col++;

            foreach (var item in data.ColData)
            {
                worksheet.Cells[row, col].Value = item.Name;
                worksheet.Cells[row, col, row, col + 1].Merge = true;
                worksheet.Cells[row + 1, col].Value = item.Bridge;
                worksheet.Cells[row + 1, col, row + 1, col + 1].Merge = true;
                worksheet.Cells[row + 2, col].Value = "KL";
                worksheet.Cells[row + 2, col + 1].Value = "SL Xe";
                col += 2;
            }

            worksheet.Cells[row, col].Value = "Tổng GMT";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            col++;
            worksheet.Cells[row, col].Value = "Tổng SL Xe";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            col++;
            worksheet.Cells[row, col].Value = "GMT/Xe";
            worksheet.Cells[row, col, row + 2, col].Merge = true;
            worksheet.Cells[row - 1, col].Value = "ĐVT: Tấn";

            int maxCol = col;

            row = 1;
            col = 1;
            worksheet.Cells[row, col].Value = "VIJACHIP";
            worksheet.Cells[row, col].Style.Font.Size = 10;
            row++;
            worksheet.Cells[row, col].Value = "BÁO CÁO VẬN CHUYỂN DĂM XUỐNG TÀU";
            worksheet.Cells[row, col, row, maxCol].Merge = true;
            worksheet.Cells[row, col].Style.Font.Size = 14;
            row++;
            row++;
            worksheet.Cells[row, col].Value = "TÊN TÀU: ";
            worksheet.Cells[row, col, row, col + 2].Merge = true;
            worksheet.Cells[row, col + 3].Value = data?.Ship;
            worksheet.Cells[row, col].Style.Font.Size = 10;
            worksheet.Cells[row, col + 3].Style.Font.Size = 11;
            row++;
            worksheet.Cells[row, col].Value = "NGÀY CẬP BẾN: ";
            worksheet.Cells[row, col, row, col + 2].Merge = true;
            worksheet.Cells[row, col + 3].Value = string.Empty;
            worksheet.Cells[row, col].Style.Font.Size = 10;
            worksheet.Cells[row, col + 3].Style.Font.Size = 11;
            row++;
            worksheet.Cells[row, col].Value = "THỜI GIAN BẮT ĐẦU LÀM HÀNG: ";
            worksheet.Cells[row, col, row, col + 2].Merge = true;
            worksheet.Cells[row, col + 3].Value = $"{orderBatch?.StartDate?.ToString("HH dd/MM/yyyy")}";
            worksheet.Cells[row, col].Style.Font.Size = 10;
            worksheet.Cells[row, col + 3].Style.Font.Size = 11;

            worksheet.Cells[1, 1, 10, maxCol].Style.Font.Bold = true;
            worksheet.Cells[1, 1, 10, maxCol].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 10, maxCol].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            #endregion

            #region GenerateData
            col = 1;
            row = 11;
            worksheet.Column(1).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Column(1).Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Column(2).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Column(2).Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            foreach (var item in data.RowData)
            {
                col = 1;
                worksheet.Cells[row, col].Value = $"{item.Date: dd/MM/yyyy}";
                worksheet.Cells[row, col, row + 3, col].Merge = true;
                col++;

                worksheet.Cells[row, col].Value = "1";
                col++;

                foreach (var shift in item.Shift1)
                {
                    foreach (var tunel in shift.Tunel)
                    {
                        worksheet.Cells[row, col].Value = tunel.Weight;
                        col++;
                        worksheet.Cells[row, col].Value = tunel.Vehicle;
                        col++;
                    }
                    worksheet.Cells[row, col].Value = shift.TotalWeight;
                    col++;
                    worksheet.Cells[row, col].Value = shift.TotalVehicle;
                    col++;
                    worksheet.Cells[row, col].Value = shift.GMTPerVehicle;
                }
                col = 2;
                row++;
                worksheet.Cells[row, col].Value = "2";
                col++;
                foreach (var shift in item.Shift2)
                {
                    foreach (var tunel in shift.Tunel)
                    {
                        worksheet.Cells[row, col].Value = tunel.Weight;
                        col++;
                        worksheet.Cells[row, col].Value = tunel.Vehicle;
                        col++;
                    }
                    worksheet.Cells[row, col].Value = shift.TotalWeight;
                    col++;
                    worksheet.Cells[row, col].Value = shift.TotalVehicle;
                    col++;
                    worksheet.Cells[row, col].Value = shift.GMTPerVehicle;
                }
                col = 2;
                row++;
                worksheet.Cells[row, col].Value = "3";
                col++;
                foreach (var shift in item.Shift3)
                {
                    foreach (var tunel in shift.Tunel)
                    {
                        worksheet.Cells[row, col].Value = tunel.Weight;
                        col++;
                        worksheet.Cells[row, col].Value = tunel.Vehicle;
                        col++;
                    }
                    worksheet.Cells[row, col].Value = shift.TotalWeight;
                    col++;
                    worksheet.Cells[row, col].Value = shift.TotalVehicle;
                    col++;
                    worksheet.Cells[row, col].Value = shift.GMTPerVehicle;
                }
                col = 2;
                row++;
                worksheet.Cells[row, col].Value = "4";
                col++;
                foreach (var shift in item.Shift4)
                {
                    foreach (var tunel in shift.Tunel)
                    {
                        worksheet.Cells[row, col].Value = tunel.Weight;
                        col++;
                        worksheet.Cells[row, col].Value = tunel.Vehicle;
                        col++;
                    }
                    worksheet.Cells[row, col].Value = shift.TotalWeight;
                    col++;
                    worksheet.Cells[row, col].Value = shift.TotalVehicle;
                    col++;
                    worksheet.Cells[row, col].Value = shift.GMTPerVehicle;
                }
                row++;
            }
            row--;
            col = 1;
            row++;
            worksheet.Cells[row, col].Value = "TC";
            col++;
            col++;
            foreach (var total in data.ColData)
            {
                worksheet.Cells[row, col].Value = total.Weight;
                col++;
                worksheet.Cells[row, col].Value = total.Vehicle;
                col++;
            }
            worksheet.Cells[row, col].Value = data.TotalWeight;
            col++;
            worksheet.Cells[row, col].Value = data.TotalVehicle;
            col++;
            worksheet.Cells[row, col].Value = data.GMTPerVehicle;
            #endregion

            return package.GetAsByteArray();
        }

        public async Task<List<tblOrderTrackingDto>> GetTracking(OrderTrackingFilter filter)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();
            try
            {
                var data = await _dbContext.tblSoOrder
                        .Include(x => x.OrderDetails)
                        .Where(x => filter.States == null
                                 || !filter.States.Any()
                                 || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))
                        .Where(x => x.Type == OrderType.XUAT_HANG.ToString())
                        .Where(x => string.IsNullOrWhiteSpace(filter.CompanyCode) || x.CompanyCode == filter.CompanyCode)
                        .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode) || x.VehicleCode == filter.VehicleCode)
                        .Where(x => string.IsNullOrWhiteSpace(filter.BatchCode) || x.OrderBatchCode == filter.BatchCode)
                        .Where(x => filter.HaveTrackingData != true || (x.Trackings != null && x.Trackings.Any()))
                        .Where(x => x.OrderDetails.Any(y => y.ItemCode == defaultValue.DefaultProductItemCode))
                        .Select(x => new tblOrderTrackingDto()
                        {
                            Code = x.Code,
                            VehicleCode = x.VehicleCode,
                            State = x.State,
                            Weight = x.OrderDetails.Sum(y => y.OrderNumber),
                            HaveTrackingData = x.Trackings != null && x.Trackings.Any()
                        }).ToListAsync();

                return data;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
