using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.MD.Tracking;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Filter.MD;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Tracking
{
    public interface ITrackingService : IGenericService<tblBuTracking, tblTrackingDto>
    {
        new Task<List<tblTrackingResponseDto>> Add(IDto dto);
        Task Delete(string OrderCode, string vehicle);
        Task<byte[]> Export(string vehicle, string OrderCode);
        Task<object> GetLocation(TrackingFilter filter);
        Task<List<LocationStationDto>> GetStationLocation();
    }
    public class TrackingService : GenericService<tblBuTracking, tblTrackingDto>, ITrackingService
    {
        private readonly IHubContext<TrackingServiceHub> _hubContext;
        public TrackingService(AppDbContext dbContext, IMapper mapper, IHubContext<TrackingServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public new async Task<List<tblTrackingResponseDto>> Add(IDto dto)
        {
            try
            {
                var model = dto as tblTrackingCreateDto;

                var order = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.OrderCode);

                if (order == null || order.State != OrderState.CAN_LAN_2.ToString() && order.State != OrderState.RA_CONG.ToString())
                {
                    Status = false;
                    return null;
                }

                List<tblBuTracking> addDatas = new()
                {
                    new tblBuTracking()
                    {
                        OrderCode = model.OrderCode,
                        Latitude = model.Location.Coords.Latitude,
                        Longitude = model.Location.Coords.Longitude,
                        Heading = model.Location.Coords.Heading,
                        SentTime = DateTime.Now,
                        Speed = model.Location.Coords.Speed,
                        TimeStamp = model.Location.TimeStamp.ToLocalTime(),
                    }
                };
                await _dbContext.tblBuTracking.AddRangeAsync(addDatas);
                await _dbContext.SaveChangesAsync();
                _dbContext.ChangeTracker.Clear();

                var result = addDatas.GroupBy(x => new { x.OrderCode, x.SentTime }).Select(x => new tblTrackingResponseDto()
                {
                    OrderCode = x.Key.OrderCode,
                    SentTime = x.Key.SentTime,
                    TrackingDatas = x.Select(y => new TrackingData()
                    {
                        Heading = y.Heading,
                        Latitude = y.Latitude,
                        Longitude = y.Longitude,
                        Speed = y.Speed,
                        TimeStamp = y.TimeStamp,
                    }).ToList()
                }).ToList();

                result.ForEach(x =>
                {
                    x.Order = _mapper.Map<tblOrderDto>(order);
                });

                await _hubContext.Clients.All.SendAsync("Location", result);
                return result;
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(string vehicle, string OrderCode)
        {
            var raw_data = await _dbContext.tblBuTracking.Include(x => x.Order)
                                                .Select(x => new
                                                {
                                                    x.OrderCode,
                                                    x.Id,
                                                    x.SentTime,
                                                    x.Speed,
                                                    x.TimeStamp,
                                                    x.Latitude,
                                                    x.Longitude,
                                                    Vehicle = x.Order.VehicleCode,
                                                    x.Heading,
                                                }).Where(x => string.IsNullOrEmpty(vehicle) || x.Vehicle == vehicle)
                                                .Where(x => string.IsNullOrEmpty(OrderCode) || x.OrderCode == OrderCode)
                                                .ToListAsync();

            var data = raw_data.GroupBy(x => new { x.Id, x.SentTime, x.OrderCode, x.Vehicle })
                .Select((x, i) => new tblTrackingExportDto()
                {
                    Id = x.Key.Id,
                    Vehicle = x.Key.Vehicle,
                    OrderCode = x.Key.OrderCode,
                    OrdinalNumber = i + 1,
                    SentTime = x.Key.SentTime.ToString(),
                    TrackingDatas = x.Select(y => new TrackingDataExportDto()
                    {
                        Heading = y.Heading,
                        Latitude = y.Latitude,
                        Longitude = y.Longitude,
                        Speed = y.Speed,
                        TimeStamp = y.TimeStamp.ToString(),
                    }).ToList()
                }).ToList();

            var result = await new ExcelExporter(_dbContext).ExportToExcel(data, ExcelExportType.TRACKING);

            return result;
        }

        public async Task Delete(string orderCode, string vehicle)
        {
            var data = await _dbContext.tblBuTracking.Where(x => string.IsNullOrEmpty(vehicle) || x.Order.VehicleCode == vehicle)
                                                 .Where(x => string.IsNullOrEmpty(orderCode) || x.OrderCode == orderCode)
                                                 .ToListAsync();

            _dbContext.ChangeTracker.Clear();
            _dbContext.tblBuTracking.RemoveRange(data);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<object> GetLocation(TrackingFilter filter)
        {
            var raw_data = _dbContext.tblBuTracking.Include(x => x.Order).ThenInclude(x => x.Scale)
                .Include(x => x.Order).ThenInclude(x => x.Vehicle)
                .Where(x => x.Order.Type == OrderType.XUAT_HANG.ToString())
           .Where(x => filter == null || string.IsNullOrEmpty(filter.VehicleCode) || x.Order.VehicleCode.Contains(filter.VehicleCode))
           .Where(x => filter == null || string.IsNullOrEmpty(filter.PartnerCode) || x.Order.PartnerCode.Contains(filter.PartnerCode))
           .Where(x => filter == null || string.IsNullOrEmpty(filter.OrderCode) || x.OrderCode.Contains(filter.OrderCode))
           .Where(x => filter == null || filter.State == null || !filter.State.Any() || filter.State.Contains(x.Order.State))
           .Where(x => filter == null || string.IsNullOrEmpty(filter.BatchCode) || x.Order.OrderBatchCode == filter.BatchCode)
           .Where(x => filter == null || string.IsNullOrEmpty(filter.CompanyCode) || x.Order.CompanyCode == filter.CompanyCode)
           .Where(x => filter.FromDate == null || x.SentTime >= filter.FromDate.Value)
           .Where(x => filter.ToDate == null || x.SentTime <= filter.ToDate.Value)
           .Select(x => new
           {
               x.OrderCode,
               x.Order.Vehicle.DriverUserName,
               x.SentTime,
               x.Speed,
               x.TimeStamp,
               x.Latitude,
               x.Longitude,
               Vehicle = x.Order.VehicleCode,
               x.Heading,
               x.Order.Scale.Weight
           });

            var data = await raw_data.GroupBy(x => new { x.OrderCode, x.Vehicle, x.Weight, x.DriverUserName })
                 .Select(x => new
                 {
                     x.Key.Vehicle,
                     x.Key.OrderCode,
                     x.Key.Weight,
                     x.Key.DriverUserName,
                     TrackingDatas = x.OrderByDescending(x => x.TimeStamp)
                            .Select(y => new
                            {
                                y.Heading,
                                y.Latitude,
                                y.Longitude,
                                y.Speed,
                                y.TimeStamp,
                            }).ToList()
                 }).ToListAsync();

            return data;
        }

        public async Task<List<LocationStationDto>> GetStationLocation()
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            var companies = await _dbContext.tblMdCompany.ToListAsync();

            var locations = companies.Select((x, i) => new LocationStationDto()
            {
                Name = x.Name,
                Code = x.Code,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                Address = x.Address,
                Ordinal = i + 1
            }).ToList();

            locations.Add(new LocationStationDto()
            {
                Name = defaultValue?.PortName,
                Latitude = defaultValue?.PortLatitude,
                Longitude = defaultValue?.PortLongitude,
                Ordinal = 0,
                Address = defaultValue?.PortAddress
            });

            locations = locations.OrderBy(x => x.Ordinal).ToList();

            return locations;
        }
    }
}
