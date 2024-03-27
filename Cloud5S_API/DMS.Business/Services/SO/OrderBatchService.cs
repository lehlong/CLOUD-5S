using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Dtos.SO.OrderBatch;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Filter.SO;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common.Util;
using Microsoft.AspNetCore.SignalR;
using DMS.BUSINESS.Services.HB;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderBatchService : IGenericService<tblSoOrderBatch, tblOrderBatchDto>
    {
        Task<OrderPagedResponseDto> Search(OrderBatchFilter filter);
        Task<tblOrderBatchDto> Add(tblOrderBatchCreateDto dto);
        Task<PagedResponseDto> GetVehicle(OrderBatchVehicleFilter filter);
        Task<byte[]> Export(OrderBatchExportExcelFilter OrderBatchExportFilter);
        Task UpdateStep(IDto dto);
        Task RefreshNumber();
    }

    public class OrderBatchService : GenericService<tblSoOrderBatch, tblOrderBatchDto>, IOrderBatchService
    {
        private readonly IHubContext<RefreshServiceHub> _refreshHubContext;
        public OrderBatchService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> refreshHubContext) : base(dbContext, mapper)
        {
            _refreshHubContext = refreshHubContext;
        }

        public async Task<OrderPagedResponseDto> Search(OrderBatchFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrderBatch
                    .IgnoreQueryFilters()
                    .Include(x => x.Partner)
                    .Include(x => x.Creator)
                    .Include(x => x.Ship)
                    .Include(x=>x.Vehicles)
                    .ThenInclude(x=>x.Vehicle)
                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Item)

                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Unit)

                .Where(x => filter.FromDate == null
                         || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => string.IsNullOrWhiteSpace(filter.ShipCode)
                         || x.ShipCode == filter.ShipCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.Vehicles.Any(y => y.VehicleCode == filter.ShipCode))

                .Where(x => string.IsNullOrWhiteSpace(filter.State)
                         || x.State == filter.State)

                .OrderByDescending(x => x.CreateDate);

                var result = await Paging(query, filter);
                var number = await query.CountAsync();
                var quantity = await query.SelectMany(x => x.OrderBatchDetails).SumAsync(x => x.OrderNumber);
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

        public async Task<tblOrderBatchDto> Add(tblOrderBatchCreateDto dto)
        {
            try
            {
                if (dto.OrderBatchDetails == null || !dto.OrderBatchDetails.Any())
                {
                    this.Status = false;
                    this.MessageObject.Code = "2022";
                    return null;
                }

                if (dto.EndDate < dto.StartDate)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2025";
                    return null;
                }

                if (await _dbContext.tblSoOrderBatch.Where(x => x.State != OrderBatchState.DA_HUY.ToString())
                    .AnyAsync(x => (x.StartDate.Value.Date <= dto.StartDate.Date && x.EndDate.Value.Date >= dto.StartDate.Date)
                                                                    || (x.StartDate.Value.Date <= dto.EndDate.Date && x.EndDate.Value.Date >= dto.EndDate.Date)))
                {
                    this.Status = false;
                    this.MessageObject.Code = "2025";
                    return null;
                }

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                await _dbContext.Database.BeginTransactionAsync();
                var entity = _mapper.Map<tblSoOrderBatch>(dto);
                entity.State = OrderBatchState.KHOI_TAO.ToString();
                entity.OrderBatchDetails.ForEach(x =>
                {
                    x.ItemCode = defaultValue?.DefaultProductItemCode;
                    x.Price = 0;
                    x.UnitCode = defaultValue?.UnitCode;
                });

                entity.Code = await new CodeManager(_dbContext).GenerateOrderBatchCode();


                var orders = await _dbContext.tblSoOrder.Include(x=>x.OrderDetails)
                  .Where(x => x.Type == OrderType.XUAT_HANG.ToString())
                  .Where(x => x.OrderDate.Value.Date >= entity.StartDate.Value.Date && x.OrderDate.Value.Date <= entity.EndDate.Value.Date)
                  .ToListAsync();

                if (orders != null && orders.Any())
                {
                    entity.State = OrderBatchState.DANG_XUAT_HANG.ToString();
                }

                entity.ReleaseNumber = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString() ||
                x.State == OrderState.DEN_CANG.ToString() ||
                x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);

                entity.CompleteNumber = orders.Where(x => x.State == OrderState.DO_HANG.ToString())
                    .SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);

                entity.DeliveryNumber = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString() ||
                x.State == OrderState.DEN_CANG.ToString() ||
                x.State == OrderState.DO_HANG.ToString()).Count();

                entity.CompleteDeliveryNumber = orders.Where(x => x.State == OrderState.DO_HANG.ToString()).Count();

                entity.DeliveringNumber = entity.DeliveryNumber = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString()).Count();

                var entityResult = await _dbContext.tblSoOrderBatch.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                var dtoResult = _mapper.Map<tblOrderBatchDto>(entityResult.Entity);
                await AddProcess(null, entity.Code, OrderBatchState.KHOI_TAO);

                orders.ForEach(x =>
                {
                    x.OrderBatchCode = entity.Code;
                });

                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();

                return dtoResult;
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblOrderBatchDto> GetById(object id)
        {

            var data = await _dbContext.tblSoOrderBatch
                        .IgnoreQueryFilters()
                        .Include(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                                .ThenInclude(x => x.ItemFormula)
                        .Include(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)

                        .Include(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Unit)

                        .Include(x => x.OrderBatchDetails)
                            .ThenInclude(x => x.Item)
                                .ThenInclude(x => x.ItemType)
                        .Include(x => x.Partner)
                        .Include(x => x.Creator)
                        .Include(x => x.Processes)
                        .Include(x => x.Vehicles)
                        .ThenInclude(x => x.Vehicle)
                        .Include(x => x.Creator)
                        .FirstOrDefaultAsync(x => x.Code == id.ToString());

            return _mapper.Map<tblOrderBatchDto>(data);
        }

        public async Task<PagedResponseDto> GetVehicle(OrderBatchVehicleFilter filter)
        {
            var query = _dbContext.tblSoOrderBatch.Where(x => x.Code == filter.BatchCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.Vehicles.Any(y => y.VehicleCode.Contains(filter.KeyWord)))
                .Include(x => x.Vehicles).ThenInclude(x => x.Vehicle).SelectMany(x => x.Vehicles);

            var pagedResponseDto = new PagedResponseDto
            {
                TotalRecord = await query.CountAsync(),
                CurrentPage = filter.CurrentPage,
                PageSize = filter.PageSize
            };

            pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
            var result = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToList();
            pagedResponseDto.Data = _mapper.Map<List<tblOrderBatchVehicleDto>>(result);
            return pagedResponseDto;
        }

        public async Task UpdateStep(IDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var model = dto as tblOrderBatchUpdateStateDto;
                var currentObj = await _dbContext.tblSoOrderBatch.FirstOrDefaultAsync(x => x.Code == model.Code);

                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "0003";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                var stateParse = Enum.TryParse(model.State, out OrderBatchState result);

                if (!stateParse)
                {
                    this.Status = false;
                    this.MessageObject.Code = "0000";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                if (currentObj.State == OrderBatchState.DA_HUY.ToString())
                {
                    this.Status = false;
                    this.MessageObject.Code = "2008";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                if (currentObj.State == OrderBatchState.DA_KET_THUC.ToString())
                {
                    this.Status = false;
                    this.MessageObject.Code = "2008";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                _dbContext.ChangeTracker.Clear();
                await base.Update(dto);
                if (!this.Status)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                await AddProcess(currentObj.State, model.Code, result);
                await _dbContext.Database.CommitTransactionAsync();

            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        private async Task AddProcess(string oldState, string orderBatchCode, OrderBatchState? newState = null, string action = null)
        {
            string prevState = oldState;
            string state;
            switch (newState)
            {
                case OrderBatchState.KHOI_TAO:
                    action = OrderBatchAction.TAO_MOI.ToString();
                    state = OrderBatchState.KHOI_TAO.ToString();
                    break;
                case OrderBatchState.DANG_XUAT_HANG:
                    action = OrderBatchAction.XUAT_HANG.ToString();
                    state = OrderBatchState.DANG_XUAT_HANG.ToString();
                    break;
                case OrderBatchState.DA_HUY:
                    action = OrderBatchAction.HUY.ToString();
                    state = OrderBatchState.DA_HUY.ToString();
                    break;
                case OrderBatchState.DA_KET_THUC:
                    action = OrderBatchAction.HOAN_THANH.ToString();
                    state = OrderBatchState.DA_KET_THUC.ToString();
                    break;
                default:
                    action ??= string.Empty;
                    state = oldState;
                    break;
            }
            var process = new tblOrderBatchProcessCreateDto()
            {
                ActionCode = action,
                OrderBatchCode = orderBatchCode,
                PrevState = prevState,
                State = state,
            };

            var processObj = _mapper.Map<tblSoOrderBatchProcess>(process);
            await _dbContext.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        public override async Task Update(IDto dto)
        {
            var model = dto as tblOrderBatchUpdateDto;

            if (model.OrderBatchDetails == null || !model.OrderBatchDetails.Any())
            {
                this.Status = false;
                this.MessageObject.Code = "2022";
                return;
            }

            if (model.Vehicles == null || !model.Vehicles.Any())
            {
                this.Status = false;
                this.MessageObject.Code = "2023";
                return;
            }

            if (await _dbContext.tblSoOrderBatch.Where(x => x.State != OrderBatchState.DA_HUY.ToString() && x.Code != model.Code)
                                    .AnyAsync(x => (x.StartDate.Value.Date <= model.StartDate.Value.Date && x.EndDate.Value.Date >= model.StartDate.Value.Date)
                                     || (x.StartDate.Value.Date <= model.EndDate.Value.Date && x.EndDate.Value.Date >= model.EndDate.Value.Date)))
            {
                this.Status = false;
                this.MessageObject.Code = "2025";
                return;
            }

            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var currentObj = await _dbContext.tblSoOrderBatch
                    .Include(x => x.Vehicles)
                    .Include(x => x.OrderBatchDetails)
                    .FirstOrDefaultAsync(x => x.Code == model.Code);

                if (currentObj == null)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    this.Status = false;
                    this.MessageObject.Code = "0003";
                    return;
                }

                _mapper.Map(model, currentObj);

                currentObj.OrderBatchDetails.ForEach(x =>
                {
                    x.OrderNumber = model.OrderBatchDetails.FirstOrDefault()?.OrderNumber ?? 0;
                });

                var addVehicles = model.Vehicles.Where(x => !currentObj.Vehicles.Select(y => y.VehicleCode).Contains(x.VehicleCode)).ToList();
                var deleteVehicles = currentObj.Vehicles.Where(x => !model.Vehicles.Select(y => y.VehicleCode).Contains(x.VehicleCode)).ToList();
                var updateVehicles = model.Vehicles.Where(x => currentObj.Vehicles.Select(y => y.VehicleCode).Contains(x.VehicleCode)).ToList();

                if (addVehicles != null && addVehicles.Any())
                {
                    currentObj.Vehicles.AddRange(_mapper.Map<List<tblSoOrderBatchVehicle>>(addVehicles));
                }

                if (deleteVehicles != null && deleteVehicles.Any())
                {
                    deleteVehicles.ForEach(x =>
                    {
                        currentObj.Vehicles.Remove(x);
                    });
                }

                if (updateVehicles != null && updateVehicles.Any())
                {
                    updateVehicles.ForEach(x =>
                    {
                        _mapper.Map(x, currentObj.Vehicles.FirstOrDefault(y => y.VehicleCode == x.VehicleCode));
                    });
                }

                await AddProcess(currentObj.State, currentObj.Code, action: OrderBatchAction.CHINH_SUA.ToString());

                await _dbContext.SaveChangesAsync();

                var orders = await _dbContext.tblSoOrder
                    .Where(x => x.Type == OrderType.XUAT_HANG.ToString())
                    .Where(x => x.OrderDate.Value.Date >= currentObj.StartDate.Value.Date && x.OrderDate.Value.Date <= currentObj.EndDate.Value.Date)
                    .ToListAsync();

                if(orders != null && orders.Any())
                {
                    currentObj.State = OrderBatchState.DANG_XUAT_HANG.ToString();
                }

                currentObj.ReleaseNumber = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString() ||
                x.State == OrderState.DEN_CANG.ToString() ||
                x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);

                currentObj.CompleteNumber = orders.Where(x => x.State == OrderState.DO_HANG.ToString())
                    .SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);

                currentObj.DeliveryNumber = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString() ||
                x.State == OrderState.DEN_CANG.ToString() ||
                x.State == OrderState.DO_HANG.ToString()).Count();

                currentObj.CompleteDeliveryNumber = orders.Where(x => x.State == OrderState.DO_HANG.ToString()).Count();

                currentObj.DeliveringNumber  = orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() ||
                x.State == OrderState.RA_CONG.ToString()).Count();

                orders.ForEach(x =>
                {
                    x.OrderBatchCode = currentObj.Code;
                });

                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();
                await _refreshHubContext.Clients.All.SendAsync("ORDER_BATCH");
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task<byte[]> Export(OrderBatchExportExcelFilter filter)
        {
            try
            {
                var raw_data = await _dbContext.tblSoOrderBatch
                    .IgnoreQueryFilters()
                    .Include(x => x.Orders)
                    .Include(x => x.Partner)
                    .Include(x => x.Creator)
                    .Include(x => x.Ship)
                    .Include(x => x.Vehicles)
                    .ThenInclude(x => x.Vehicle)
                    .Include(x => x.Processes)
                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemFormula)

                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Item)

                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Unit)

                    .Include(x => x.OrderBatchDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.ItemType)

                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))

                .Where(x => filter.FromDate == null
                         || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)

                .Where(x => filter.ToDate == null
                         || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)

                .Where(x => string.IsNullOrWhiteSpace(filter.ShipCode)
                         || x.ShipCode == filter.ShipCode)

                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode)
                         || x.Vehicles.Any(y => y.VehicleCode == filter.ShipCode))

                .Where(x => string.IsNullOrWhiteSpace(filter.State)
                         || x.State == filter.State)

                .OrderByDescending(x => x.CreateDate).ToListAsync();

                var data = raw_data.Select((x, i) => new ExportExcelOrderBatchDto()
                {
                    OrdinalNumber = i + 1,
                    Code = x.Code,
                    StartDate = x.StartDate.ToString(),
                    EndDate = x.EndDate.ToString(),
                    ItemName = x?.OrderBatchDetails?.FirstOrDefault().Item.Name,
                    ShipCode = x.ShipCode,
                    TotalVehicle = x.TotalVehicle,
                    ExpectNumber = x.ExpectNumber,
                    ReleaseNumber = x.ReleaseNumber,
                    DeliveryNumber = x.DeliveryNumber,
                    UnitName = x?.OrderBatchDetails?.FirstOrDefault()?.Unit?.Name,
                    State = x.State,
                }).ToList();

                return await new ExcelExporter(_dbContext).ExportToExcel(data, ExcelExportType.DOT_XUAT_HANG);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.MessageObject.Message = ex.Message;
                this.Exception = ex;
                return null;
            }
        }

        public async Task RefreshNumber()
        {
            var orderBatch = await _dbContext.tblSoOrderBatch.Include(x => x.Orders).ThenInclude(x => x.OrderDetails).FirstOrDefaultAsync(x => x.State == OrderBatchState.DANG_XUAT_HANG.ToString());
            orderBatch.ReleaseNumber = orderBatch.Orders.Where(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString() || x.State == OrderState.DEN_CANG.ToString() || x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);
            orderBatch.DeliveryNumber = orderBatch.Orders.Count(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString() || x.State == OrderState.DEN_CANG.ToString() || x.State == OrderState.DO_HANG.ToString());
            orderBatch.DeliveringNumber = orderBatch.Orders.Count(x => x.State == OrderState.CAN_LAN_2.ToString() || x.State == OrderState.RA_CONG.ToString());
            orderBatch.CompleteNumber = orderBatch.Orders.Where(x => x.State == OrderState.DO_HANG.ToString()).SelectMany(x => x.OrderDetails).Sum(x => x.OrderNumber);
            orderBatch.CompleteDeliveryNumber = orderBatch.Orders.Count(x => x.State == OrderState.DO_HANG.ToString() || x.State == OrderState.DEN_CANG.ToString());

            _dbContext.Update(orderBatch);
            await _dbContext.SaveChangesAsync();
        }
    }
}
