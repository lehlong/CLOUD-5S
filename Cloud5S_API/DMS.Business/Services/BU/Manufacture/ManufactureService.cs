using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.MD.Tracking;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Filter.SO;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DMS.BUSINESS.Services.BU.Manufacture
{
    public interface IManufactureService : IGenericService<tblBuManufacture, tblManufactureDto>
    {
        Task<PagedResponseDto> Search(ManufactureFilter filter);
        Task<PagedResponseDto> SearchByShift(ManufactureShiftFilter filter);
        Task BatchUpdate(List<tblManufactureBatchUpdateDto> models);
        Task BatchUpdateShift(tblManufactureBatchUpdateShiftDto model);
        Task LatchData(DateTime Date, string ShiftCode);
        Task<tblManufactureByShiftDto> GetByShift(ManufactureGetByShiftFilter filter);
        Task UnLatchData(DateTime LatchDate, string ShiftCode);
        Task<OrderPagedResponseDto> SearchOrder(OrderFilter filter);
        Task<byte[]> Export(DateTime date);
    }

    public class ManufactureService : GenericService<tblBuManufacture, tblManufactureDto>, IManufactureService
    {
        public ManufactureService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<OrderPagedResponseDto> SearchOrder(OrderFilter filter)
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
                    .Include(x => x.Manufactures).ThenInclude(x => x.PourLine)
                    .Include(x => x.Manufactures).ThenInclude(x => x.PourSection)
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

                .Where(x => x.OrderDetails.Any(y => y.Item.IsManufacture == true))

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

                .Where(x => string.IsNullOrWhiteSpace(filter.DriverUserName)
                         || x.Vehicle.DriverUserName == filter.DriverUserName)

                 .Where(x => string.IsNullOrWhiteSpace(filter.WorkingShiftCode)
                         || x.WorkingShiftCode == filter.WorkingShiftCode)

                 .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))

                 .Where(x=> x.State != OrderState.DA_HUY.ToString())

                .Where(x => filter.IsPaid == null
                         || (filter.IsPaid.Value ? (x.IsPaid == true) : (x.IsPaid == false || x.IsPaid == null)))

                .OrderBy(x => x.OrderDate);

                var pagedResponseDto = new PagedResponseDto
                {
                    TotalRecord = await query.CountAsync(),
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize
                };
                pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
                var rs = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToList();
                pagedResponseDto.Data = _mapper.Map<List<tblOrderDto>>(rs);

                var result = pagedResponseDto;
                var number = await query.CountAsync();
                var quantity = await query.SelectMany(x => x.OrderDetails).SumAsync(x => x.OrderNumber);

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                var results = result.Data as List<tblOrderDto>;

                var latchs = await _dbContext.tblBuManufactureLatch.Where(x => results.Select(y => y.OrderDate.Value.Date).Contains(x.LatchDate.Value.Date)).ToListAsync();

                foreach (var x in results)
                {
                    x.EndLocation = new LocationStationDto()
                    {
                        Address = defaultValue?.PortAddress,
                        Latitude = defaultValue?.PortLatitude,
                        Longitude = defaultValue?.PortLongitude,
                        Name = defaultValue?.PortName,
                    };
                    x.LatchState = latchs?
                        .FirstOrDefault(y => y.LatchDate.Value.Date == x.OrderDate.Value.Date && y.LatchShiftCode == x.WorkingShiftCode)?.State ?? LatchState.CHUA_CHOT.ToString();
                }

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

        public override async Task<tblManufactureDto> GetById(object id)
        {
            var data = await _dbContext.tblBuManufacture
                .Include(x => x.Order)
                .ThenInclude(x => x.Partner)
                .Include(x => x.Order)
                .ThenInclude(x => x.Area)
                .Include(x => x.Order)
                .ThenInclude(x => x.OrderDetails)
                .ThenInclude(x => x.Item)
                .ThenInclude(x => x.Unit)
                .Include(x => x.ProcessWorkingShift)
                .FirstOrDefaultAsync(x => x.Id == (Guid)id);

            return _mapper.Map<tblManufactureDto>(data);
        }

        public Task<PagedResponseDto> Search(ManufactureFilter filter)
        {
            var query = _dbContext.tblBuManufacture
                .Include(x => x.Order)
                    .ThenInclude(x => x.Partner)
                .Include(x => x.Order)
                    .ThenInclude(x => x.Area)
                .Include(x => x.Order)
                    .ThenInclude(x => x.OrderDetails)
                        .ThenInclude(x => x.Item)
                            .ThenInclude(x => x.Unit)
                .Include(x => x.Order)
                    .ThenInclude(x => x.WorkingShift)
                .Include(x => x.ProcessWorkingShift)
                .Where(x => x.Order.Type == OrderType.NHAP_HANG.ToString())
                .Where(x => filter.ImportFromDate == null || x.Order.OrderDate.Value.Date >= filter.ImportFromDate.Value.Date)
                .Where(x => filter.ImportToDate == null || x.Order.OrderDate.Value.Date <= filter.ImportToDate.Value.Date)
                .Where(x => filter.ExportFromDate == null || x.ProcessDate.Value.Date >= filter.ExportFromDate.Value.Date)
                .Where(x => filter.ExportToDate == null || x.ProcessDate.Value.Date <= filter.ExportToDate.Value.Date)
                .Where(x => filter.ImportWorkingShiftCode == null || x.Order.WorkingShiftCode == filter.ImportWorkingShiftCode)
                .Where(x => filter.ExportWorkingShiftCode == null || x.ProcessWorkingShiftCode == filter.ExportWorkingShiftCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.VehicleCode) || x.Order.VehicleCode == filter.VehicleCode)
                .Where(x => filter.State == null || !filter.State.Any() || filter.State.Contains(x.Order.State))
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode) || x.Order.PartnerCode == filter.PartnerCode)
                .Where(x => filter.IsOnShift == null || (filter.IsOnShift.Value ? !(string.IsNullOrEmpty(x.ProcessWorkingShiftCode) && x.ProcessDate == null) : (string.IsNullOrEmpty(x.ProcessWorkingShiftCode) && x.ProcessDate == null)))
                .OrderByDescending(x => x.Order.OrderDate);

            return base.Paging(query, filter);
        }

        public async Task<PagedResponseDto> SearchByShift(ManufactureShiftFilter filter)
        {
            try
            {
                var shifts = await _dbContext.tblMdWorkingShift.Where(x => string.IsNullOrEmpty(filter.WorkingShiftCode) || x.Code == filter.WorkingShiftCode).ToListAsync();

                var raw_query = _dbContext.tblBuManufacture
                                    .Include(x => x.Order)
                                    .Include(x => x.ProcessWorkingShift)
                                    .Include(x => x.Latch)
                                    .Where(x => filter.FromDate == null || x.ProcessDate.Value.Date >= filter.FromDate.Value.Date)
                                    .Where(x => filter.ToDate == null || x.ProcessDate.Value.Date <= filter.ToDate.Value.Date)
                                    .Where(x => string.IsNullOrEmpty(filter.WorkingShiftCode) || x.ProcessWorkingShiftCode == filter.WorkingShiftCode)
                                    .Select(x => new
                                    {
                                        x.ProcessDate.Value.Date,
                                        x.ProcessWorkingShiftCode,
                                        WorkingShiftName = x.ProcessWorkingShift.Name,
                                        WorkingShiftFromHour = x.ProcessWorkingShift.FromHour,
                                        WorkingShiftToHour = x.ProcessWorkingShift.ToHour,
                                        x.ProcessWorkingShift.OrdinalNumber,
                                        x.Amount,
                                        x.Order,
                                        x.Latch.State,
                                        x.Latch.Note,
                                        x.ProcessType
                                    })
                                    .AsQueryable();

                var query = raw_query.GroupBy(x => new
                {
                    x.Date,
                    x.ProcessWorkingShiftCode,
                    x.WorkingShiftName,
                    x.WorkingShiftFromHour,
                    x.WorkingShiftToHour,
                    x.OrdinalNumber,
                    x.State,
                    x.Note,
                }).Select(x => new tblManufactureShiftDto()
                {
                    OrderNumber = x.Where(y => y.ProcessType == ManufactureType.SX_TT.ToString()).Sum(y => y.Amount ?? 0),
                    PourNumber = x.Where(y => y.ProcessType == ManufactureType.HA_BAI.ToString()).Sum(y => y.Amount ?? 0),
                    OrderQuantity = x.Where(x => x.Order != null).Count(),
                    ProcessDate = x.Key.Date,
                    LatchState = string.IsNullOrEmpty(x.Key.State) ? LatchState.CHUA_CHOT.ToString() : x.Key.State,
                    Note = x.Key.Note,
                    WorkingShift = new tblWorkingShiftDto()
                    {
                        Code = x.Key.ProcessWorkingShiftCode,
                        Name = x.Key.WorkingShiftName,
                        FromHour = x.Key.WorkingShiftFromHour,
                        ToHour = x.Key.WorkingShiftToHour,
                        OrdinalNumber = x.Key.OrdinalNumber
                    }
                });

                var pagedResponseDto = new PagedResponseDto
                {
                    TotalRecord = await query.CountAsync(),
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize
                };
                pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));

                var result = await query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();

                var latchs = await _dbContext.tblBuManufactureLatch
                     .Where(x => x.LatchDate.Value.Date >= filter.FromDate.Value.Date)
                     .Where(x => x.LatchDate.Value.Date <= filter.ToDate.Value.Date).ToListAsync();

                if (filter.FromDate != null && filter.ToDate != null)
                {
                    foreach (var item in Utils.LoopDay(filter.FromDate.Value, filter.ToDate.Value))
                    {
                        if (result.Any(x => x.ProcessDate.Value.Date == item.Date))
                        {
                            var missShift = shifts.Where(x => !result.Where(y => y.ProcessDate.Value.Date == item.Date).Select(y => y.WorkingShift.Code).Contains(x.Code)).ToList();
                            result.AddRange(missShift.Select(x => new tblManufactureShiftDto()
                            {
                                OrderNumber = 0,
                                OrderQuantity = 0,
                                PourNumber = 0,
                                ProcessDate = item.Date,
                                LatchState = latchs.FirstOrDefault(y => y.LatchDate == item.Date && y.LatchShiftCode == x.Code)?.State ?? LatchState.CHUA_CHOT.ToString(),
                                WorkingShift = new tblWorkingShiftDto()
                                {
                                    Code = x.Code,
                                    Name = x.Name,
                                    OrdinalNumber = x.OrdinalNumber
                                }
                            }));
                        }
                        else
                        {
                            result.AddRange(shifts.Select(x => new tblManufactureShiftDto()
                            {
                                OrderNumber = 0,
                                OrderQuantity = 0,
                                PourNumber = 0,
                                ProcessDate = item.Date,
                                LatchState = latchs.FirstOrDefault(y => y.LatchDate == item.Date && y.LatchShiftCode == x.Code)?.State ?? LatchState.CHUA_CHOT.ToString(),
                                WorkingShift = new tblWorkingShiftDto()
                                {
                                    Code = x.Code,
                                    Name = x.Name,
                                    OrdinalNumber = x.OrdinalNumber
                                }
                            }));
                        }
                    }
                }

                pagedResponseDto.Data = result.OrderByDescending(x => x.ProcessDate).ThenBy(x => x.WorkingShift.OrdinalNumber);

                return pagedResponseDto;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblManufactureByShiftDto> GetByShift(ManufactureGetByShiftFilter filter)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            if (filter.ProcessDate == null)
            {
                return new();
            }

            var data = await _dbContext.tblBuManufacture.Include(x => x.Order)
                                .Include(x => x.Order).ThenInclude(x => x.Partner)
                                .Include(x => x.Order).ThenInclude(x => x.OrderDetails)
                                .Include(x => x.Order).ThenInclude(x => x.WorkingShift)
                                .Include(x => x.Item)
                                .Include(x => x.Unit)
                                .Include(x => x.Area)
                                .Include(x => x.PourLine)
                                .Include(x => x.PourSection)
                                .Include(x => x.OrderFromStock).ThenInclude(x => x.WorkingShift)
                              .Where(x => x.ProcessDate.Value.Date == filter.ProcessDate.Value.Date)
                              .Where(x => (x.Amount ?? 0) != 0)
                              .Where(x => string.IsNullOrEmpty(filter.WorkingShiftCode) || x.ProcessWorkingShiftCode == filter.WorkingShiftCode)
                              .ToListAsync();

            var choppings = data.Where(x => x.ProcessType == ManufactureType.SX_TT.ToString() && x.OrderCode != null && string.IsNullOrEmpty(x.PourLineCode) && string.IsNullOrEmpty(x.PourSectionCode))
                            .GroupBy(x => new
                            {
                                AreaName = x.Order.Area.Name,
                                ItemName = x.Item.Name,
                                UnitName = x.Unit.Name,
                                OrderCode = x.Order.Code,
                                OrderDate = x.Order.OrderDate,
                                OrderDetails = x.Order.OrderDetails,
                                OrderShift = x.Order.WorkingShift.Name,
                                PartnerName = x.Order.Partner.Name,
                                State = x.Order.State,
                                VehicleCode = x.Order.VehicleCode,
                            })
                            .Select(x => new ManufactureChoppingDto()
                            {
                                ChoppingNumber = x.Where(y => y.ProcessType == ManufactureType.SX_TT.ToString()).Sum(y => y.Amount ?? 0),
                                PourNumber = x.Where(y => y.ProcessType == ManufactureType.HA_BAI.ToString()).Sum(y => y.Amount ?? 0),
                                AreaName = x.Key.AreaName,
                                ItemName = x.Key.ItemName,
                                OrderCode = x.Key.OrderCode,
                                OrderDate = x.Key.OrderDate.Value,
                                OrderNumber = x.Key.OrderDetails.Sum(x => x.OrderNumber),
                                OrderShift = x.Key.OrderShift,
                                PartnerName = x.Key.PartnerName,
                                State = x.Key.State,
                                UnitName = x.Key.UnitName,
                                VehicleCode = x.Key.VehicleCode,
                            }).Where(x => x.ChoppingNumber != 0).OrderByDescending(x => x.OrderDate).ToList();

            var LandZone = data.Where(x => x.Order != null && x.PourLine != null && x.PourSection != null)
                           .GroupBy(x => new
                           {
                               AreaName = x.Order.Area?.Name,
                               ItemName = x.Item?.Name,
                               UnitName = x.Unit?.Name,
                               OrderCode = x.Order?.Code,
                               OrderDate = x.Order.OrderDate,
                               OrderDetails = x.Order.OrderDetails,
                               OrderShift = x.Order.WorkingShift?.Name,
                               PartnerName = x.Order.Partner?.Name,
                               State = x.Order.State,
                               VehicleCode = x.Order.VehicleCode,
                               PourLineCode = x.PourLine?.Code,
                               PourLineName = x.PourLine?.Name,
                               PourSectionCode = x.PourSection.Code,
                               PourSectionName = x.PourSection.Name,
                           })
                           .Select(x => new ManufactureLandZoneDto()
                           {
                               ChoppingNumber = x.Where(y => y.ProcessType == ManufactureType.SX_TT.ToString()).Sum(y => y.Amount ?? 0),
                               PourNumber = x.Where(y => y.ProcessType == ManufactureType.HA_BAI.ToString()).Sum(y => y.Amount ?? 0),
                               AreaName = x.Key.AreaName,
                               ItemName = x.Key.ItemName,
                               OrderCode = x.Key.OrderCode,
                               OrderDate = x.Key.OrderDate.Value,
                               OrderNumber = x.Key.OrderDetails.Sum(x => x.OrderNumber),
                               OrderShift = x.Key.OrderShift,
                               PartnerName = x.Key.PartnerName,
                               State = x.Key.State,
                               UnitName = x.Key.UnitName,
                               VehicleCode = x.Key.VehicleCode,
                               PourLineCode = x.Key.PourLineCode,
                               PourLineName = x.Key.PourLineName,
                               PourSectionCode = x.Key.PourSectionCode,
                               PourSectionName = x.Key.PourSectionName
                           }).Where(x => x.PourNumber != 0).OrderByDescending(x => x.OrderDate).ToList();


            var pours = data.Where(x => x.OrderCode == null && !string.IsNullOrEmpty(x.PourLineCode) && !string.IsNullOrEmpty(x.PourSectionCode))
                             .GroupBy(x => new { x.PourSection.Name, x.PourSectionCode })
                             .Select(x => new ManufacturePourDto()
                             {
                                 PourSectionName = x.Key.Name,
                                 PourSectionCode = x.Key.PourSectionCode,
                                 PourLines = x.GroupBy(y => new { y.PourLine.Name, y.PourLineCode }).Select(y => new ManufactureLineDto()
                                 {
                                     PourLineName = y.Key.Name,
                                     PourLineCode = y.Key.PourLineCode,
                                     Items = y.GroupBy(z => new
                                     {
                                         AreaName = z.Area.Name,
                                         UnitName = z.Unit.Name,
                                         ItemName = z.Item.Name,
                                         ItemCode = z.ItemCode,
                                         AreaCode = z.AreaCode,
                                         UnitCode = z.UnitCode,
                                     }).Select(z => new ManufactureItemDto()
                                     {
                                         AreaName = z.Key.AreaName,
                                         UnitName = z.Key.UnitName,
                                         ItemName = z.Key.ItemName,
                                         ItemCode = z.Key.ItemCode,
                                         AreaCode = z.Key.AreaCode,
                                         UnitCode = z.Key.UnitCode,
                                         IsShow = true,
                                         Orders = z.Select(k => new ManufactureOrderDto()
                                         {
                                             OrderCode = k.OrderCodeFromStock,
                                             OrderDate = k?.OrderFromStock?.OrderDate,
                                             ShiftCode = k?.OrderFromStock?.WorkingShiftCode,
                                             ShiftName = k?.OrderFromStock?.WorkingShift?.Name,
                                             VehicleCode = k?.OrderFromStock?.VehicleCode,
                                             Amount = k.Amount ?? 0,
                                             PrevAmount = k.PrevAmount ?? 0,
                                         }).ToList()
                                     }).ToList()
                                 }).ToList()
                             }).ToList();

            var poursSt = await (from section in _dbContext.tblMdPourSection
                                 join l in _dbContext.tblMdPourLine
                                 on section.Code equals l.SectionCode
                                 into lines
                                 from line in lines.DefaultIfEmpty()

                                 join s in _dbContext.tblBuStockItemDetail.Include(x => x.Order).ThenInclude(x => x.WorkingShift).Where(x => x.CompanyCode == defaultValue.DefaultCompanyCode)
                                 on line.Code equals s.PourLineCode into stocks
                                 from stock in stocks.DefaultIfEmpty()

                                 join i in _dbContext.tblMdItem
                                 on stock.ItemCode equals i.Code
                                 into items
                                 from item in items.DefaultIfEmpty()

                                 join u in _dbContext.tblMdUnit
                                 on stock.UnitCode equals u.Code
                                 into units
                                 from unit in units.DefaultIfEmpty()

                                 join a in _dbContext.tblMdArea
                                 on stock.AreaCode equals a.Code
                                 into areas
                                 from area in areas.DefaultIfEmpty()
                                 where (stock != null && stock.Amount > 0)
                                 select new
                                 {
                                     PourSectionCode = section.Code,
                                     PourSectionName = section.Name,
                                     PourLineCode = line.Code,
                                     PourLineName = line.Name,
                                     ItemCode = stock.ItemCode,
                                     UnitCode = stock.UnitCode,
                                     UnitName = unit.Name,
                                     AreaCode = stock.AreaCode,
                                     AreaName = area.Name,
                                     Amount = stock.Amount,
                                     ItemName = item.Name,
                                     OrderCode = stock.OrderCode,
                                     VehicleCode = stock.Order.VehicleCode,
                                     OrderDate = stock.Order.OrderDate,
                                     ShiftCode = stock.Order.WorkingShiftCode,
                                     ShiftName = stock.Order.WorkingShift.Name
                                 }).ToListAsync();

            var pourStocks = poursSt
                        .Where(x => !data.Where(x => x.Order == null).Any(y => y.PourLineCode == x.PourLineCode
                                  && y.PourSectionCode == x.PourSectionCode
                                  && y.ItemCode == x.ItemCode
                                  && y.UnitCode == x.UnitCode
                                  && y.AreaCode == x.AreaCode))
                             .GroupBy(x => new { x.PourSectionName, x.PourSectionCode })
                             .Select(x => new ManufacturePourDto()
                             {
                                 PourSectionName = x.Key.PourSectionName,
                                 PourSectionCode = x.Key.PourSectionCode,
                                 PourLines = x.GroupBy(y => new { y.PourLineName, y.PourLineCode }).Select(y => new ManufactureLineDto()
                                 {
                                     PourLineName = y.Key.PourLineName,
                                     PourLineCode = y.Key.PourLineCode,
                                     Items = y.GroupBy(z => new
                                     {
                                         AreaName = z.AreaName,
                                         UnitName = z.UnitName,
                                         ItemName = z.ItemName,
                                         ItemCode = z.ItemCode,
                                         AreaCode = z.AreaCode,
                                         UnitCode = z.UnitCode,
                                     }).Select(z => new ManufactureItemDto()
                                     {
                                         AreaName = z.Key.AreaName,
                                         UnitName = z.Key.UnitName,
                                         ItemName = z.Key.ItemName,
                                         ItemCode = z.Key.ItemCode,
                                         AreaCode = z.Key.AreaCode,
                                         UnitCode = z.Key.UnitCode,
                                         IsShow = false,
                                         Orders = z.Select(k => new ManufactureOrderDto()
                                         {
                                             OrderCode = k.OrderCode,
                                             OrderDate = k?.OrderDate,
                                             ShiftCode = k?.ShiftCode,
                                             ShiftName = k?.ShiftName,
                                             VehicleCode = k?.VehicleCode,
                                             Amount = k.Amount,
                                             PrevAmount = k.Amount
                                         }).ToList()
                                     }).ToList()
                                 }).ToList()
                             }).ToList();

            var latch = await _dbContext.tblBuManufactureLatch.FirstOrDefaultAsync(x => x.LatchDate == filter.ProcessDate.Value.Date && x.LatchShiftCode == filter.WorkingShiftCode);

            var chippers = await _dbContext.tblBuManufactureChipper.Include(x => x.Chipper)
                .Where(x => x.ProcessDate == filter.ProcessDate.Value.Date)
                .Where(x => x.ShiftCode == filter.WorkingShiftCode)
                .Select(x => new tblManufactureChipperByShiftDto()
                {
                    Code = x.ChipperCode,
                    Name = x.Chipper.Name,
                    Amount = x.Amount
                })
                .ToListAsync();

            return new tblManufactureByShiftDto()
            {
                Choppings = choppings,
                LandZone = LandZone,
                PourStocks = pourStocks,
                PourDatas = pours,
                Note = latch?.Note,
                LatchState = string.IsNullOrEmpty(latch?.State) ? LatchState.CHUA_CHOT.ToString() : latch?.State,
                CanReverse = latch != null && latch.CanReverse,
                PourNumber = data.Where(x => x.ProcessType == ManufactureType.HA_BAI.ToString()).Sum(x => x.Amount),
                Chippers = chippers
            };
        }

        public async Task BatchUpdate(List<tblManufactureBatchUpdateDto> models)
        {
            try
            {
                var orders = await _dbContext.tblSoOrder
                .Include(x => x.Manufactures)
                .Include(x => x.OrderDetails)
                .Include(x => x.Exports)
                .Include(x => x.Imports)
                .ThenInclude(x => x.ImportDetails)
                .Where(x => models.Select(y => y.OrderCode).Contains(x.Code))
                .ToListAsync();

                orders.RemoveAll(x => x.State == OrderState.CAN_LAN_1.ToString());

                await _dbContext.Database.BeginTransactionAsync();

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                List<tblBuManufacture> manufactures = new();

                foreach (var x in models)
                {
                    if (x.Pours != null && x.Pours.Any())
                    {
                        x.Pours = x.Pours.GroupBy(y => new { y.PourLineCode, y.PourSectionCode, y.AreaCode, y.PrevAmount, y.ItemCode, y.UnitCode })
                            .Select(y => new tblManufactureBatchUpdatePourDto()
                            {
                                PourLineCode = y.Key.PourLineCode,
                                PourSectionCode = y.Key.PourSectionCode,
                                Amount = y.Sum(z => z.Amount),
                                AreaCode = y.Key.AreaCode,
                                ItemCode = y.Key.ItemCode,
                                UnitCode = y.Key.UnitCode,
                                PrevAmount = y.Key.PrevAmount,
                            }).ToList();
                    }

                    var order = orders.FirstOrDefault(y => y.Code == x.OrderCode);

                    if (order == null) continue;

                    var latch = await _dbContext.tblBuManufactureLatch
                            .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == order.OrderDate.Value.Date && x.LatchShiftCode == order.WorkingShiftCode);
                    var latchId = latch?.Id;
                    if (latch == null)
                    {
                        var latchObj = new tblBuManufactureLatch()
                        {
                            LatchDate = order.OrderDate.Value.Date,
                            LatchShiftCode = order.WorkingShiftCode,
                            State = LatchState.CHUA_CHOT.ToString(),
                            CanReverse = true
                        };

                        await _dbContext.tblBuManufactureLatch.AddAsync(latchObj);
                        await _dbContext.SaveChangesAsync();
                        latchId = latchObj?.Id;
                    }
                    else
                    {
                        if (latch.State == LatchState.DA_CHOT.ToString())
                        {
                            this.Status = false;
                            this.MessageObject.Code = "3004";
                            await _dbContext.Database.RollbackTransactionAsync();
                            return;
                        }
                    }

                    if (((x.PourNumber ?? 0) == 0 && (x.ChoppingNumber ?? 0) == 0))
                    {
                        continue;
                    }
                    if (((x.PourNumber ?? 0) + (x.ChoppingNumber ?? 0)) != order.OrderDetails.Sum(x => x.OrderNumber))
                    {
                        this.Status = false;
                        this.MessageObject.Code = "3003";
                        await _dbContext.Database.RollbackTransactionAsync();
                        return;
                    }

                    if (order.Manufactures == null || !order.Manufactures.Any())
                    {
                        if (x.ChoppingNumber != null && x.ChoppingNumber > 0)
                        {
                            var addObj = new tblManufactureBatchUpdateTempDto()
                            {
                                ProcessDate = order?.OrderDate,
                                ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                Amount = x.ChoppingNumber,
                                OrderCode = order?.Code,
                                ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                AreaCode = order.AreaCode,
                                CompanyCode = order?.CompanyCode,
                                UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                ProcessType = ManufactureType.SX_TT.ToString(),
                                OrderCodeFromStock = order?.Code
                            };
                            var obj = _mapper.Map<tblBuManufacture>(addObj);
                            obj.LatchId = latchId;
                            obj.OrderCodeFromStock = order?.Code;
                            manufactures.Add(obj);
                            await AddExportIngredient(obj, defaultValue, order.CompanyCode);
                            await AddImportProduct(obj, defaultValue, order.CompanyCode);
                        }

                        if (x.PourNumber != null && x.PourNumber > 0)
                        {
                            var import = order.Imports.FirstOrDefault(y => y.ItemCode == order?.OrderDetails?.FirstOrDefault()?.ItemCode && x.OrderCode == order.Code);

                            if (string.IsNullOrEmpty(import.OrderCodeFromStock))
                            {
                                import.OrderCodeFromStock = order?.Code;
                            }

                            var importDetails = import.ImportDetails;

                            x.Pours.ForEach(y =>
                            {
                                var addObj = new tblManufactureBatchUpdateTempDto()
                                {
                                    ProcessDate = order?.OrderDate,
                                    ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                    Amount = y.Amount,
                                    OrderCode = order?.Code,
                                    ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                    AreaCode = order.AreaCode,
                                    CompanyCode = order?.CompanyCode,
                                    UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                    ProcessType = ManufactureType.HA_BAI.ToString(),
                                    PourLineCode = y.PourLineCode,
                                    PourSectionCode = y.PourSectionCode,
                                };
                                var obj = _mapper.Map<tblBuManufacture>(addObj);
                                obj.LatchId = latchId;
                                obj.OrderCodeFromStock = order?.Code;
                                manufactures.Add(obj);

                                importDetails.Add(new tblBuStockImportDetail()
                                {
                                    Amount = y.Amount,
                                    PourLineCode = y.PourLineCode,
                                    PourSectionCode = y.PourSectionCode,
                                    IsLast = false,
                                });
                                import.Amount = importDetails.Sum(x => x.Amount);
                            });
                        }
                    }

                    else
                    {
                        var manufacture = order.Manufactures.FirstOrDefault(x => x.ProcessType == ManufactureType.SX_TT.ToString());

                        if (x.ChoppingNumber != null && x.ChoppingNumber > 0)
                        {
                            if (manufacture == null)
                            {
                                var addObj = new tblManufactureBatchUpdateTempDto()
                                {
                                    ProcessDate = order?.OrderDate,
                                    ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                    Amount = x.ChoppingNumber,
                                    PickUpMethod = x.PickUpMethod,
                                    OrderCode = order?.Code,
                                    ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                    AreaCode = order.AreaCode,
                                    CompanyCode = order?.CompanyCode,
                                    UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                    ProcessType = ManufactureType.SX_TT.ToString(),
                                    OrderCodeFromStock = order?.Code
                                };
                                var obj = _mapper.Map<tblBuManufacture>(addObj);
                                obj.LatchId = latchId;
                                obj.OrderCodeFromStock = order?.Code;
                                manufactures.Add(obj);
                                await AddExportIngredient(obj, defaultValue, order.CompanyCode);
                                await AddImportProduct(obj, defaultValue, order.CompanyCode);
                            }
                            else
                            {
                                var obj = new tblManufactureBatchUpdateTempDto()
                                {
                                    ProcessDate = order?.OrderDate,
                                    ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                    Amount = x.ChoppingNumber,
                                    PickUpMethod = x.PickUpMethod,
                                    OrderCode = order?.Code,
                                    ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                    AreaCode = order.AreaCode,
                                    CompanyCode = order?.CompanyCode,
                                    UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                    ProcessType = ManufactureType.SX_TT.ToString(),
                                };
                                _mapper.Map(obj, manufacture);
                                manufacture.OrderCodeFromStock = order?.Code;
                                await UpdateImportProduct(manufacture, defaultValue);
                                await UpdateExportIngredient(manufacture, defaultValue);
                            }
                        }
                        else
                        {
                            var deleteObj = order.Manufactures.Where(y => y.ProcessType == ManufactureType.SX_TT.ToString()).ToList();

                            if (deleteObj != null && deleteObj.Any())
                            {
                                _dbContext.tblBuManufacture.RemoveRange(deleteObj);

                                await DeleteImportProduct(manufacture, defaultValue);
                                await DeleteExportIngredient(manufacture, defaultValue);

                                await _dbContext.SaveChangesAsync();
                            }
                        }

                        var import = order.Imports.FirstOrDefault(y => y.ItemCode == order?.OrderDetails?.FirstOrDefault()?.ItemCode && x.OrderCode == order.Code);

                        if (string.IsNullOrEmpty(import.OrderCodeFromStock))
                        {
                            import.OrderCodeFromStock = order?.Code;
                        }

                        var importDetails = import.ImportDetails;

                        if (x.PourNumber != null && x.PourNumber > 0)
                        {
                            x.Pours.ForEach(y =>
                            {
                                if (!order.Manufactures.Any(z => z.PourLineCode == y.PourLineCode && z.PourSectionCode == y.PourSectionCode))
                                {
                                    var addObj = new tblManufactureBatchUpdateTempDto()
                                    {
                                        ProcessDate = order?.OrderDate,
                                        ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                        Amount = y.Amount,
                                        OrderCode = order?.Code,
                                        ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                        AreaCode = order.AreaCode,
                                        CompanyCode = order?.CompanyCode,
                                        UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                        ProcessType = ManufactureType.HA_BAI.ToString(),
                                        PourLineCode = y.PourLineCode,
                                        PourSectionCode = y.PourSectionCode,
                                    };
                                    var obj = _mapper.Map<tblBuManufacture>(addObj);
                                    obj.LatchId = latchId;
                                    obj.OrderCodeFromStock = order?.Code;
                                    manufactures.Add(obj);
                                }
                                else
                                {
                                    var updateObj = new tblManufactureBatchUpdateTempDto()
                                    {
                                        ProcessDate = order?.OrderDate,
                                        ProcessWorkingShiftCode = order?.WorkingShiftCode,
                                        Amount = y.Amount,
                                        OrderCode = order?.Code,
                                        ItemCode = order.OrderDetails.FirstOrDefault()?.ItemCode,
                                        AreaCode = order.AreaCode,
                                        CompanyCode = order?.CompanyCode,
                                        UnitCode = order.OrderDetails.FirstOrDefault()?.UnitCode,
                                        ProcessType = ManufactureType.HA_BAI.ToString(),
                                        PourLineCode = y.PourLineCode,
                                        PourSectionCode = y.PourSectionCode,
                                        OrderCodeFromStock = order?.Code
                                    };
                                    _mapper.Map(updateObj, order.Manufactures.FirstOrDefault(z => z.PourLineCode == y.PourLineCode && z.PourSectionCode == y.PourSectionCode));
                                }

                                var importDetail = importDetails?.FirstOrDefault(z => z.PourLineCode == y.PourLineCode
                                                            && z.PourSectionCode == y.PourSectionCode);
                                if (importDetail != null)
                                {
                                    importDetail.Amount = y.Amount;
                                    importDetail.IsLast = false;
                                }
                                else
                                {
                                    importDetails.Add(new tblBuStockImportDetail()
                                    {
                                        Amount = y.Amount,
                                        PourLineCode = y.PourLineCode,
                                        PourSectionCode = y.PourSectionCode,
                                        IsLast = false
                                    });
                                }
                            });
                            _dbContext.UpdateRange(importDetails);

                            var deleteObj = order.Manufactures.Where(y => y.ProcessType != ManufactureType.SX_TT.ToString() && !x.Pours.Any(z => z.PourLineCode == y.PourLineCode && z.PourSectionCode == y.PourSectionCode)).ToList();

                            _dbContext.tblBuManufacture.RemoveRange(deleteObj);

                            var deleteImport = importDetails.Where(y => !x.Pours.Any(z => z.PourLineCode == y.PourLineCode && z.PourSectionCode == y.PourSectionCode)).ToList();

                            _dbContext.tblBuStockImportDetail.RemoveRange(deleteImport);
                            await _dbContext.SaveChangesAsync();
                        }
                        else
                        {
                            var deleteObj = order.Manufactures.Where(y => y.ProcessType != ManufactureType.SX_TT.ToString()).ToList();

                            _dbContext.tblBuManufacture.RemoveRange(deleteObj);

                            _dbContext.tblBuStockImportDetail.RemoveRange(importDetails);
                            await _dbContext.SaveChangesAsync();
                        }
                    }
                }

                _dbContext.UpdateRange(manufactures);

                await _dbContext.SaveChangesAsync();
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Exception = ex;
                this.Status = false;
            }
        }

        public async Task BatchUpdateShift(tblManufactureBatchUpdateShiftDto model)
        {
            var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

            var workingshifts = await _dbContext.tblMdWorkingShift.ToListAsync();

            var shift = workingshifts.FirstOrDefault(y => y.Code == model.ProcessWorkingShiftCode);
            model.ProcessDate = model.ProcessDate.Value.Date + shift.FromHour;

            var shiftCode7H = model?.ProcessWorkingShiftCode;

            var date7H = model?.ProcessDate;

            if (model?.ProcessWorkingShiftCode == "C4")
            {
                shiftCode7H = "C3";
                date7H = model?.ProcessDate.Value.AddDays(-1);
            }
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                if (model.Pours != null && model.Pours.Any())
                {
                    model.Pours = model.Pours.Where(x=>x.Orders.Sum(y=>y.Amount) != 0).GroupBy(y => new { y.PourLineCode, y.PourSectionCode, y.AreaCode, y.ItemCode, y.UnitCode })
                        .Select(y => new tblManufactureBatchUpdateShiftPourDto()
                        {
                            PourLineCode = y.Key.PourLineCode,
                            PourSectionCode = y.Key.PourSectionCode,
                            AreaCode = y.Key.AreaCode,
                            ItemCode = y.Key.ItemCode,
                            UnitCode = y.Key.UnitCode,
                            Orders = y.SelectMany(z => z.Orders).Select(z => new tblManufactureBatchUpdateShiftOrderDto()
                            {
                                Amount = z.Amount,
                                OrderCode = z.OrderCode,
                                PrevAmount = z.PrevAmount
                            }).Where(x => x.Amount != 0).ToList()
                        }).ToList();

                    var stocks = await _dbContext.tblBuStockItemDetail.Where(x => x.CompanyCode == defaultValue.DefaultCompanyCode).ToListAsync();

                    foreach (var pour in model.Pours)
                    {
                        foreach (var item in pour.Orders)
                        {
                            item.PrevAmount = stocks?.FirstOrDefault(y => y.PourLineCode == pour.PourLineCode
                                           && y.PourSectionCode == pour.PourSectionCode
                                           && y.ItemCode == pour.ItemCode
                                           && y.AreaCode == pour.AreaCode
                                           && y.UnitCode == pour.UnitCode
                                           && y.OrderCode == item.OrderCode)?.Amount ?? 0;
                        }
                    }
                }

                var manufactures = await _dbContext.tblBuManufacture
                    .Include(x => x.Order).ThenInclude(x => x.OrderDetails)
                    .Include(x => x.Order).ThenInclude(x => x.Exports)
                    .Include(x => x.Order).ThenInclude(x => x.Imports)
                    .Where(x => x.ProcessDate.Value.Date == model.ProcessDate.Value.Date
                    && x.ProcessWorkingShiftCode == model.ProcessWorkingShiftCode)
                    .ToListAsync();

                var deleteObjs = manufactures.Where(x => x.ProcessType == ManufactureType.SX_TT.ToString() && x.OrderCode == null)
                        .Where(x => !model.Pours.Any(y => y.PourLineCode == x.PourLineCode && y.PourSectionCode == x.PourSectionCode && y.AreaCode == x.AreaCode && y.UnitCode == x.UnitCode)
                        || model.Pours.Where(x => x.Orders.Sum(y=>y.Amount) == 0).Any(y => y.PourLineCode == x.PourLineCode && y.PourSectionCode == x.PourSectionCode && y.AreaCode == x.AreaCode && y.UnitCode == x.UnitCode))
                        .ToList();

                _dbContext.tblBuManufacture.RemoveRange(deleteObjs);

                foreach (var item in deleteObjs)
                {
                    await DeleteExportIngredient(item, defaultValue);
                    await DeleteImportProduct(item, defaultValue);
                }

                var latch = await _dbContext.tblBuManufactureLatch
               .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == model.ProcessDate.Value.Date && x.LatchShiftCode == model.ProcessWorkingShiftCode);
                var latchId = latch?.Id;
                if (latch == null)
                {
                    var latchObj = new tblBuManufactureLatch()
                    {
                        LatchDate = model.ProcessDate.Value.Date,
                        LatchShiftCode = model.ProcessWorkingShiftCode,
                        Note = model.Note,
                        State = LatchState.CHUA_CHOT.ToString(),
                        CanReverse = true
                    };

                    await _dbContext.tblBuManufactureLatch.AddAsync(latchObj);
                    await _dbContext.SaveChangesAsync();
                    latchId = latchObj?.Id;
                }
                else
                {
                    if (latch.State == LatchState.DA_CHOT.ToString())
                    {
                        this.Status = false;
                        this.MessageObject.Code = "3004";
                        return;
                    }
                    latch.Note = model.Note;
                    await _dbContext.SaveChangesAsync();
                }

                foreach (var x in model.Pours)
                {
                    var orders = x.Orders.Where(y => y.Amount > 0).ToList();
                    if (orders == null || !orders.Any()) continue;
                    foreach (var item in orders)
                    {
                        var manufacture = manufactures.Where(x => x.ProcessType == ManufactureType.SX_TT.ToString() && x.OrderCode == null && x.OrderCodeFromStock == item.OrderCode)
                       .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                                           && y.PourSectionCode == x.PourSectionCode
                                           && y.ItemCode == x.ItemCode
                                           && y.AreaCode == x.AreaCode
                                           && y.UnitCode == x.UnitCode
                   );

                        if (manufacture != null)
                        {
                            _mapper.Map(x, manufacture);
                            manufacture.Amount = item.Amount;
                            _dbContext.Update(manufacture);
                        }
                        else
                        {
                            var addObj = new tblBuManufacture()
                            {
                                PourLineCode = x.PourLineCode,
                                PourSectionCode = x.PourSectionCode,
                                AreaCode = x.AreaCode,
                                Amount = item.Amount,
                                ItemCode = defaultValue?.DefaultIngredientItemCode,
                                ProcessDate = model.ProcessDate,
                                ProcessWorkingShiftCode = model.ProcessWorkingShiftCode,
                                ProcessType = ManufactureType.SX_TT.ToString(),
                                UnitCode = x.UnitCode,
                                PrevAmount = item.PrevAmount,
                                LatchId = latchId,
                                OrderCodeFromStock = item.OrderCode
                            };
                            await _dbContext.AddAsync(addObj);
                            await _dbContext.SaveChangesAsync();
                        }

                        #region addexport
                        var exportIngredients = _dbContext.tblBuStockExport.Where(x => x.Order == null)
                                        .Include(x => x.ExportDetails)
                                        .Where(y => y.ShiftCode == model.ProcessWorkingShiftCode
                                        && y.ExportDate.Value.Date == model.ProcessDate.Value.Date
                                        && y.ItemCode == x.ItemCode
                                        && y.AreaCode == x.AreaCode
                                        && y.UnitCode == x.UnitCode
                                        && y.OrderCodeFromStock == item.OrderCode)
                                        .FirstOrDefault();

                        if (exportIngredients == null)
                        {
                            var exportCode = await new CodeManager(_dbContext).GenerateExportCode();
                            _dbContext.tblBuStockExport.Add(new tblBuStockExport()
                            {
                                Code = exportCode,
                                ShiftCode = model.ProcessWorkingShiftCode,
                                ExportDate = model.ProcessDate.Value.Date,
                                ItemCode = defaultValue?.DefaultIngredientItemCode,
                                AreaCode = x.AreaCode,
                                UnitCode = x.UnitCode,
                                CompanyCode = defaultValue?.DefaultCompanyCode,
                                StockCode = defaultValue.DefaultIngredientStock,
                                ShiftCode7H = shiftCode7H,
                                ExportDate7H = date7H,
                                OrderCodeFromStock = item.OrderCode,
                                Amount = item.Amount,
                                ExportDetails = new List<tblBuStockExportDetail>() {new tblBuStockExportDetail()
                                {
                                    Amount = item.Amount,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    PrevAmount = item.PrevAmount,
                                    IsLast = false
                                } }
                            });
                        }
                        else
                        {
                            if (exportIngredients.ExportDetails == null || !exportIngredients.ExportDetails.Any())
                            {
                                exportIngredients.ExportDetails = new List<tblBuStockExportDetail>() {new tblBuStockExportDetail()
                                {
                                    Amount = item.Amount,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    PrevAmount = item.PrevAmount,
                                    IsLast= false,
                                } };
                            }

                            var export = exportIngredients.ExportDetails.FirstOrDefault(y => y.PourSectionCode == x.PourSectionCode && y.PourLineCode == x.PourLineCode);
                            if (export == null)
                            {
                                exportIngredients.ExportDetails.Add(new tblBuStockExportDetail()
                                {
                                    Amount = item.Amount,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    IsLast = false,
                                });
                                exportIngredients.Amount = exportIngredients.ExportDetails.Sum(x => x.Amount);
                            }
                            else
                            {
                                export.IsLast = false;
                                export.Amount = item.Amount;
                            }
                            exportIngredients.Amount = exportIngredients.ExportDetails.Sum(x => x.Amount);
                        }
                        await _dbContext.SaveChangesAsync();
                        #endregion
                        #region addimport
                        var importProducts = _dbContext.tblBuStockImport.Where(x => x.OrderCode == null)
                          .Include(x => x.ImportDetails)
                          .Where(y => y.ShiftCode == model.ProcessWorkingShiftCode
                          && y.ImportDate.Value.Date == model.ProcessDate.Value.Date
                          && y.ItemCode == defaultValue.DefaultProductItemCode
                          && y.AreaCode == x.AreaCode
                          && y.UnitCode == x.UnitCode
                          && y.OrderCodeFromStock == item.OrderCode)
                         .FirstOrDefault();

                        if (importProducts == null)
                        {
                            var importCode = await new CodeManager(_dbContext).GenerateImportCode();
                            _dbContext.tblBuStockImport.Add(new tblBuStockImport()
                            {
                                Code = importCode,
                                ShiftCode = model.ProcessWorkingShiftCode,
                                ImportDate = model.ProcessDate.Value,
                                ItemCode = defaultValue?.DefaultProductItemCode,
                                AreaCode = x.AreaCode,
                                UnitCode = x.UnitCode,
                                CompanyCode = defaultValue?.DefaultCompanyCode,
                                StockCode = defaultValue.DefaultProductStock,
                                ShiftCode7H = shiftCode7H,
                                ImportDate7H = date7H,
                                ImportDetails = new List<tblBuStockImportDetail>() {new tblBuStockImportDetail()
                                {
                                    Amount = item.Amount * defaultValue?.DefaultTransferValue,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    IsLast = false
                                } },
                                Amount = item.Amount * defaultValue?.DefaultTransferValue,
                                OrderCodeFromStock = item.OrderCode
                            });
                        }
                        else
                        {
                            if (importProducts.ImportDetails == null || !importProducts.ImportDetails.Any())
                            {
                                importProducts.ImportDetails = new List<tblBuStockImportDetail>() {new tblBuStockImportDetail()
                                {
                                    Amount = item.Amount * defaultValue?.DefaultTransferValue,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    IsLast= false,
                                } };
                            }

                            var export = importProducts.ImportDetails.FirstOrDefault(y => y.PourSectionCode == x.PourSectionCode && y.PourLineCode == x.PourLineCode);
                            if (export == null)
                            {
                                importProducts.ImportDetails.Add(new tblBuStockImportDetail()
                                {
                                    Amount = item.Amount * defaultValue?.DefaultTransferValue,
                                    PourLineCode = x.PourLineCode,
                                    PourSectionCode = x.PourSectionCode,
                                    IsLast = false,
                                });
                                importProducts.Amount = importProducts.ImportDetails.Sum(x => x.Amount);
                            }
                            else
                            {
                                export.IsLast = false;
                                export.Amount = item.Amount * defaultValue?.DefaultTransferValue;
                                importProducts.Amount = importProducts.ImportDetails.Sum(x => x.Amount);
                            }
                        }
                        #endregion
                    }
                };

                await _dbContext.SaveChangesAsync();

                if (model.Chippers != null && model.Chippers.Any())
                {
                    var manufactureChippers = await _dbContext.tblBuManufactureChipper
                        .Where(x => x.ProcessDate.Value.Date == model.ProcessDate.Value.Date)
                        .Where(x => x.ShiftCode == model.ProcessWorkingShiftCode)
                        .ToListAsync();

                    foreach (var item in model.Chippers)
                    {
                        var deleteChippers = manufactureChippers.Where(x => !model.Chippers.Select(x => x.ChipperCode).Contains(x.ChipperCode)).ToList();

                        _dbContext.tblBuManufactureChipper.RemoveRange(deleteChippers);

                        var manufactureChipper = manufactureChippers.FirstOrDefault(x => x.ChipperCode == item.ChipperCode);

                        if (manufactureChipper != null)
                        {
                            manufactureChipper.Amount = item.Amount;
                        }
                        else
                        {
                            await _dbContext.tblBuManufactureChipper.AddAsync(new tblBuManufactureChipper()
                            {
                                ChipperCode = item.ChipperCode,
                                Amount = item.Amount,
                                ProcessDate = model.ProcessDate.Value.Date,
                                ShiftCode = model.ProcessWorkingShiftCode,
                            });
                        }

                        await _dbContext.SaveChangesAsync();
                    }
                }

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Exception = ex;
                this.Status = false;
            }
        }

        public async Task LatchData(DateTime LatchDate, string ShiftCode)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                DateTime oldDate = LatchDate;

                string oldShift = ShiftCode;

                DateTime newDate = LatchDate;

                string newShift = ShiftCode;

                switch (ShiftCode)
                {
                    case "C1":
                        oldShift = "C4";
                        newShift = "C2";
                        break;
                    case "C2":
                        oldShift = "C1";
                        newShift = "C3";
                        break;
                    case "C3":
                        oldShift = "C2";
                        newDate = LatchDate.AddDays(1);
                        newShift = "C4";
                        break;
                    case "C4":
                        oldShift = "C3";
                        newShift = "C1";
                        oldDate = LatchDate.AddDays(-1);
                        break;
                }

                var totalManufacture = await _dbContext.tblBuManufacture
                    .Where(x => x.ProcessDate.Value.Date == LatchDate.Date)
                    .Where(x => x.ProcessWorkingShiftCode == ShiftCode)
                    .Where(x => x.ProcessType == ManufactureType.SX_TT.ToString())
                    .SumAsync(x => x.Amount ?? 0);

                var totalChipper = await _dbContext.tblBuManufactureChipper.Where(x => x.ProcessDate == LatchDate.Date)
                    .Where(x => x.ShiftCode == ShiftCode)
                    .SumAsync(x => x.Amount);

                //if(totalManufacture != totalChipper)
                //{
                //    this.Status = false;
                //    this.MessageObject.Code = "3010";
                //    await _dbContext.Database.RollbackTransactionAsync();
                //    return;
                //}

                var oldLatch = await _dbContext.tblBuManufactureLatch
                   .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == oldDate.Date && x.LatchShiftCode == oldShift);

                if (oldLatch == null || oldLatch.State != LatchState.DA_CHOT.ToString())
                {
                    this.Status = false;
                    this.MessageObject.Code = "3005";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }
                else if (oldLatch.State == LatchState.DA_CHOT.ToString())
                {
                    oldLatch.CanReverse = false;
                }

                var latch = await _dbContext.tblBuManufactureLatch
                  .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == LatchDate.Date && x.LatchShiftCode == ShiftCode);

                if (latch != null)
                {
                    if (latch.State == LatchState.DA_CHOT.ToString())
                    {
                        this.Status = false;
                        this.MessageObject.Code = "3008";
                        await _dbContext.Database.RollbackTransactionAsync();
                        return;
                    }

                    latch.State = LatchState.DA_CHOT.ToString();
                    latch.CanReverse = true;
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    latch = new tblBuManufactureLatch()
                    {
                        CanReverse = true,
                        LatchDate = LatchDate,
                        LatchShiftCode = ShiftCode,
                        State = LatchState.DA_CHOT.ToString()
                    };
                    _dbContext.Add(latch);
                    await _dbContext.SaveChangesAsync();
                }

                var oldImports = await _dbContext.tblBuStockImportDetail
                   .Include(x => x.Import)
                   .Where(x => x.Import.ImportDate.Value.Date == oldDate.Date)
                   .Where(x => x.Import.ShiftCode == oldShift)
                   .ToListAsync();

                var oldExports = await _dbContext.tblBuStockExportDetail
                   .Include(x => x.Export)
                   .Where(x => x.Export.ExportDate.Value.Date == oldDate.Date)
                   .Where(x => x.Export.ShiftCode == oldShift)
                   .ToListAsync();

                oldImports.ForEach(x =>
                {
                    x.IsLast = true;
                });

                oldExports.ForEach(x =>
                {
                    x.IsLast = true;
                });

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();

                var importDetails = await _dbContext.tblBuStockImportDetail
                    .Include(x => x.Import).ThenInclude(x => x.Item)
                    .Where(x => x.Import.ItemCode == defaultValue.DefaultIngredientItemCode)
                    .Where(X => !string.IsNullOrEmpty(X.PourSectionCode) && !string.IsNullOrEmpty(X.PourLineCode))
                    .Where(x => x.Import.ImportDate.Value.Date == LatchDate.Date)
                    .Where(x => x.Import.ShiftCode == ShiftCode)
                    .ToListAsync();

                var exportDetails = await _dbContext.tblBuStockExportDetail
                   .Include(x => x.Export).ThenInclude(x => x.Item)
                   .Where(x => x.Export.ItemCode == defaultValue.DefaultIngredientItemCode)
                   .Where(X => !string.IsNullOrEmpty(X.PourSectionCode) && !string.IsNullOrEmpty(X.PourLineCode))
                   .Where(x => x.Export.ExportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.Export.ShiftCode == ShiftCode)
                   .ToListAsync();

                var imports = await _dbContext.tblBuStockImport.Include(x => x.ImportDetails)
                        .Where(x => x.ImportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.ShiftCode == ShiftCode).ToListAsync();

                var exports = await _dbContext.tblBuStockExport.Include(x => x.ExportDetails)
                    .Where(x => x.ExportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.ShiftCode == ShiftCode)
                    .ToListAsync();

                imports.ForEach(x =>
                {
                    if (string.IsNullOrEmpty(x.OrderCode))
                    {
                        x.Amount = x.ImportDetails.Sum(z => z.Amount);
                    }
                });

                exports.ForEach(x =>
                {
                    if (x.ExportDetails != null && x.ExportDetails.Any())
                        x.Amount = x.ExportDetails.Sum(z => z.Amount);
                });

                var stocks = await _dbContext.tblBuStockItem.Where(x => x.CompanyCode == defaultValue.DefaultCompanyCode).ToListAsync();
                var stockDetails = await _dbContext.tblBuStockItemDetail.ToListAsync();

                var importProduct = imports.Where(x => x.ItemCode == defaultValue?.DefaultProductItemCode).Sum(x => x.Amount ?? 0);
                var productStock = stocks?.FirstOrDefault(x => x.ItemCode == defaultValue?.DefaultProductItemCode);
                productStock.Amount += importProduct;

                var ingredientStock = stocks?.FirstOrDefault(x => x.ItemCode == defaultValue?.DefaultIngredientItemCode);
                var exportIngredient = exports.Where(x => x.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(x => x.Amount ?? 0);

                ingredientStock.Amount -= exportIngredient;

                _dbContext.tblBuStockItem.Update(productStock);
                _dbContext.tblBuStockItem.Update(ingredientStock);

                await _dbContext.SaveChangesAsync();

                var importGroups = importDetails.Where(x => !x.IsLast)
                    .GroupBy(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.Import.AreaCode,
                        x.Import.CompanyCode,
                        x.Import.ItemCode,
                        x.Import.UnitCode,
                        x.Import.OrderCodeFromStock
                    })
                   .Select(x => new
                   {
                       x.Key.PourLineCode,
                       x.Key.PourSectionCode,
                       x.Key.AreaCode,
                       x.Key.CompanyCode,
                       x.Key.ItemCode,
                       x.Key.UnitCode,
                       x.Key.OrderCodeFromStock,
                       ImportAmount = x.Sum(y => y.Amount)
                   }).ToList();

                var exportGroups = exportDetails.Where(x => !x.IsLast)
                    .GroupBy(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.Export.AreaCode,
                        x.Export.CompanyCode,
                        x.Export.ItemCode,
                        x.Export.UnitCode,
                        x.Export.OrderCodeFromStock
                    })
                    .Select(x => new
                    {
                        x.Key.PourLineCode,
                        x.Key.PourSectionCode,
                        x.Key.AreaCode,
                        x.Key.CompanyCode,
                        x.Key.ItemCode,
                        x.Key.UnitCode,
                        x.Key.OrderCodeFromStock,
                        ExportAmount = x.Sum(y => y.Amount)
                    }).ToList();

                var listPours = importGroups
                    .Select(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.AreaCode,
                        x.CompanyCode,
                        x.ItemCode,
                        x.UnitCode,
                        x.OrderCodeFromStock
                    })
                    .Concat(exportGroups.Select(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.AreaCode,
                        x.CompanyCode,
                        x.ItemCode,
                        x.UnitCode,
                        x.OrderCodeFromStock
                    }))
                    .Distinct().ToList();

                foreach (var x in listPours)
                {
                    var importAmount = importGroups
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.OrderCodeFromStock == x.OrderCodeFromStock
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.UnitCode == x.UnitCode)?.ImportAmount ?? 0;

                    var exportAmount = exportGroups
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.UnitCode == x.UnitCode
                    && y.OrderCodeFromStock == x.OrderCodeFromStock
                    )?.ExportAmount ?? 0;

                    var stock = stockDetails
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.OrderCode == x.OrderCodeFromStock
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.UnitCode == x.UnitCode);

                    if (stock == null)
                    {
                        if ((importAmount - exportAmount) < 0)
                        {
                            this.Status = false;
                            this.MessageObject.Code = "3009";
                            await _dbContext.Database.RollbackTransactionAsync();
                            return;
                        }

                        stockDetails.Add(new tblBuStockItemDetail()
                        {
                            Amount = importAmount - exportAmount,
                            AreaCode = x.AreaCode,
                            PourLineCode = x.PourLineCode,
                            PourSectionCode = x.PourSectionCode,
                            ItemCode = x.ItemCode,
                            StockCode = defaultValue?.DefaultIngredientStock,
                            CompanyCode = x.CompanyCode,
                            UnitCode = x.UnitCode,
                            OrderCode = x.OrderCodeFromStock
                        });
                    }
                    else
                    {
                        var amount = stock.Amount + importAmount - exportAmount;
                        if (amount < 0)
                        {
                            this.Status = false;
                            this.MessageObject.Code = "3009";
                            await _dbContext.Database.RollbackTransactionAsync();
                            return;
                        }

                        stock.Amount = stock.Amount + importAmount - exportAmount;
                    }
                };

                var manufactures = await _dbContext.tblBuManufacture
                    .Where(x => x.ProcessWorkingShiftCode == newShift)
                    .Where(x => x.ProcessDate.Value.Date == newDate.Date)
                    .Where(x => x.OrderCode == null)
                    .Where(x => x.ProcessType == ManufactureType.SX_TT.ToString()).ToListAsync();

                manufactures.ForEach(x =>
                {
                    x.PrevAmount = stockDetails?.FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                                            && y.PourSectionCode == x.PourSectionCode
                                            && y.ItemCode == x.ItemCode
                                            && y.AreaCode == x.AreaCode
                                            && y.UnitCode == x.UnitCode)?.Amount ?? 0;
                });

                importDetails.ForEach(x =>
                {
                    x.IsLast = true;
                });

                exportDetails.ForEach(x =>
                {
                    x.IsLast = true;
                });

                _dbContext.UpdateRange(stockDetails);
                _dbContext.UpdateRange(importDetails);
                _dbContext.UpdateRange(exportDetails);

                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task UnLatchData(DateTime LatchDate, string ShiftCode)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                DateTime oldDate = LatchDate;

                string oldShift = ShiftCode;

                switch (ShiftCode)
                {
                    case "C1":
                        oldShift = "C4";
                        break;
                    case "C2":
                        oldShift = "C1";
                        break;
                    case "C3":
                        oldShift = "C2";
                        break;
                    case "C4":
                        oldShift = "C3";
                        oldDate = LatchDate.AddDays(-1);
                        break;
                }

                var oldLatch = await _dbContext.tblBuManufactureLatch
                   .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == oldDate.Date && x.LatchShiftCode == oldShift);

                if (oldLatch != null)
                {
                    oldLatch.CanReverse = true;
                }

                var latch = await _dbContext.tblBuManufactureLatch
                 .FirstOrDefaultAsync(x => x.LatchDate.Value.Date == LatchDate.Date && x.LatchShiftCode == ShiftCode);

                if (latch == null || latch.State == LatchState.CHUA_CHOT.ToString())
                {
                    this.Status = false;
                    this.MessageObject.Code = "3007";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                if (!latch.CanReverse)
                {
                    this.Status = false;
                    this.MessageObject.Code = "3006";
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                if (latch != null)
                {
                    latch.State = LatchState.CHUA_CHOT.ToString();
                    await _dbContext.SaveChangesAsync();
                }

                var imports = await _dbContext.tblBuStockImportDetail
                    .Include(x => x.Import)
                    .Where(x => x.Import.ImportDate.Value.Date == LatchDate.Date)
                    .Where(x => x.Import.ShiftCode == ShiftCode)
                    .ToListAsync();

                var defaultValue = await _dbContext.tblAdSystemParameter.FirstOrDefaultAsync();
                var stockItems = await _dbContext.tblBuStockItem.Where(x => x.CompanyCode == defaultValue.DefaultCompanyCode).ToListAsync();

                var productStock = stockItems.FirstOrDefault(x => x.StockCode == defaultValue.DefaultProductStock);
                var stockDetails = await _dbContext.tblBuStockItemDetail.ToListAsync();

                var importProduct = await _dbContext.tblBuStockImport.Include(x => x.ImportDetails)
                        .Where(x => x.ImportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.ShiftCode == ShiftCode).ToListAsync();
                var importProductAmount = importProduct.Where(x => x.ItemCode == defaultValue?.DefaultProductItemCode).Sum(x => x.Amount ?? 0);
                productStock.Amount -= importProductAmount;

                var exports = await _dbContext.tblBuStockExportDetail
                   .Include(x => x.Export)
                   .Where(x => x.Export.ExportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.Export.ShiftCode == ShiftCode)
                   .ToListAsync();

                var exportIngredient = await _dbContext.tblBuStockExport
                        .Where(x => x.ExportDate.Value.Date == LatchDate.Date)
                   .Where(x => x.ShiftCode == ShiftCode).ToListAsync();
                var ingredientStock = stockItems?.FirstOrDefault(x => x.ItemCode == defaultValue?.DefaultIngredientItemCode);
                var exportIngredientAmount = exportIngredient.Where(x => x.ItemCode == defaultValue?.DefaultIngredientItemCode).Sum(x => x.Amount ?? 0);

                ingredientStock.Amount += exportIngredientAmount;

                var stocks = await _dbContext.tblBuStockItemDetail.ToListAsync();

                var importGroups = imports.Where(x => x.IsLast)
                    .GroupBy(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.Import.AreaCode,
                        x.Import.CompanyCode,
                        x.Import.ItemCode,
                        x.Import.UnitCode,
                        x.Import.OrderCodeFromStock
                    })
                   .Select(x => new
                   {
                       x.Key.PourLineCode,
                       x.Key.PourSectionCode,
                       x.Key.AreaCode,
                       x.Key.CompanyCode,
                       x.Key.ItemCode,
                       x.Key.UnitCode,
                       x.Key.OrderCodeFromStock,
                       ImportAmount = x.Sum(y => y.Amount)
                   }).ToList();

                var exportGroups = exports.Where(x => x.IsLast)
                    .GroupBy(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.Export.AreaCode,
                        x.Export.CompanyCode,
                        x.Export.ItemCode,
                        x.Export.UnitCode,
                        x.Export.OrderCodeFromStock
                    })
                    .Select(x => new
                    {
                        x.Key.PourLineCode,
                        x.Key.PourSectionCode,
                        x.Key.AreaCode,
                        x.Key.CompanyCode,
                        x.Key.ItemCode,
                        x.Key.UnitCode,
                        x.Key.OrderCodeFromStock,
                        ExportAmount = x.Sum(y => y.Amount)
                    }).ToList();

                var listPours = importGroups
                    .Select(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.AreaCode,
                        x.CompanyCode,
                        x.ItemCode,
                        x.UnitCode,
                        x.OrderCodeFromStock
                    })
                    .Concat(exportGroups.Select(x => new
                    {
                        x.PourLineCode,
                        x.PourSectionCode,
                        x.AreaCode,
                        x.CompanyCode,
                        x.ItemCode,
                        x.UnitCode,
                        x.OrderCodeFromStock
                    }))
                    .Distinct().ToList();

                foreach (var x in listPours)
                {
                    var importAmount = importGroups
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.OrderCodeFromStock == x.OrderCodeFromStock
                    && y.UnitCode == x.UnitCode)?.ImportAmount ?? 0;

                    var exportAmount = exportGroups
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.UnitCode == x.UnitCode
                    && y.OrderCodeFromStock == x.OrderCodeFromStock
                    )?.ExportAmount ?? 0;

                    var stock = stocks
                    .FirstOrDefault(y => y.PourLineCode == x.PourLineCode
                    && y.PourSectionCode == x.PourSectionCode
                    && y.AreaCode == x.AreaCode
                    && y.CompanyCode == x.CompanyCode
                    && y.ItemCode == x.ItemCode
                    && y.OrderCode == x.OrderCodeFromStock
                    && y.UnitCode == x.UnitCode);

                    if(stock == null)
                    {
                        var amt = importAmount - exportAmount;

                        stock = new tblBuStockItemDetail()
                        {
                            Amount = amt,
                            AreaCode = x.AreaCode,
                            CompanyCode = x.CompanyCode,
                            ItemCode = x.ItemCode,
                            OrderCode = x.OrderCodeFromStock,
                            PourLineCode = x.PourLineCode,
                            PourSectionCode = x.PourSectionCode,
                            StockCode = defaultValue.DefaultIngredientStock,
                            UnitCode = x.UnitCode,
                        };
                        await _dbContext.tblBuStockItemDetail.AddAsync(stock);
                        await _dbContext.SaveChangesAsync();
                        continue;
                    }

                    var amount = stock.Amount - importAmount + exportAmount;
                    if (amount < 0)
                    {
                        this.Status = false;
                        this.MessageObject.Code = "3009";
                        await _dbContext.Database.RollbackTransactionAsync();
                        return;
                    }

                    if (stock != null)
                    {
                        stock.Amount = amount;
                    }
                    else
                    {
                        await _dbContext.tblBuStockItemDetail.AddAsync(new tblBuStockItemDetail()
                        {
                            Amount = amount,
                            AreaCode = x.AreaCode,
                            CompanyCode = x.CompanyCode,
                            ItemCode = x.ItemCode,
                            OrderCode = x.OrderCodeFromStock,
                            PourLineCode = x.PourLineCode,
                            PourSectionCode = x.PourSectionCode,
                            StockCode = defaultValue.DefaultIngredientStock,
                            UnitCode = x.UnitCode,
                        });
                    }
                };

                imports.ForEach(x =>
                {
                    x.IsLast = false;
                });

                exports.ForEach(x =>
                {
                    x.IsLast = false;
                });

                _dbContext.UpdateRange(stocks);
                _dbContext.UpdateRange(imports);
                _dbContext.UpdateRange(exports);

                await _dbContext.SaveChangesAsync();


                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        private async Task AddImportProduct(tblBuManufacture manufacture, tblAdSystemParameter defaultValue, string CompanyCode)
        {
            var importCode = await new CodeManager(_dbContext).GenerateImportCode();

            var shiftCode7H = manufacture?.ProcessWorkingShiftCode;

            var importDate7H = manufacture?.ProcessDate;

            if (manufacture?.ProcessWorkingShiftCode == "C4")
            {
                shiftCode7H = "C3";
                importDate7H = manufacture?.ProcessDate.Value.AddDays(-1);
            }

            var obj = new tblBuStockImport()
            {
                Code = importCode,
                ImportDate = manufacture?.ProcessDate,
                OrderCode = manufacture?.OrderCode,
                StockCode = defaultValue?.DefaultProductStock,
                ShiftCode = manufacture?.ProcessWorkingShiftCode,
                ItemCode = defaultValue?.DefaultProductItemCode,
                UnitCode = manufacture?.UnitCode,
                Amount = manufacture.Amount * defaultValue?.DefaultTransferValue,
                AreaCode = manufacture?.AreaCode,
                ShiftCode7H = shiftCode7H,
                ImportDate7H = importDate7H,
                CompanyCode = CompanyCode,
                OrderCodeFromStock = manufacture?.OrderCode
            };

            await _dbContext.tblBuStockImport.AddAsync(obj);
            await _dbContext.SaveChangesAsync();
        }

        private async Task AddExportIngredient(tblBuManufacture manufacture, tblAdSystemParameter defaultValue, string companyCode)
        {
            var exportCode = await new CodeManager(_dbContext).GenerateExportCode();

            var shiftCode7H = manufacture?.ProcessWorkingShiftCode;

            var exportDate7H = manufacture?.ProcessDate;

            if (manufacture?.ProcessWorkingShiftCode == "C4")
            {
                shiftCode7H = "C3";
                exportDate7H = manufacture?.ProcessDate.Value.AddDays(-1);
            }

            await _dbContext.tblBuStockExport.AddAsync(new tblBuStockExport()
            {
                Code = exportCode,
                ExportDate = manufacture?.ProcessDate.Value.Date,
                OrderCode = manufacture?.OrderCode,
                StockCode = defaultValue?.DefaultIngredientStock,
                ShiftCode = manufacture?.ProcessWorkingShiftCode,
                ShiftCode7H = shiftCode7H,
                ExportDate7H = exportDate7H,
                ItemCode = defaultValue?.DefaultIngredientItemCode,
                UnitCode = manufacture?.UnitCode,
                AreaCode = manufacture?.AreaCode,
                Amount = manufacture?.Amount,
                CompanyCode = companyCode,
                OrderCodeFromStock = manufacture?.OrderCode
            });
            await _dbContext.SaveChangesAsync();
        }

        private async Task DeleteImportProduct(tblBuManufacture manufacture, tblAdSystemParameter defaultValue)
        {
            var import = await _dbContext.tblBuStockImport.Where(x => string.IsNullOrEmpty(manufacture.OrderCode) || x.OrderCode == manufacture.OrderCode).FirstOrDefaultAsync(
                                    x => x.ShiftCode == manufacture.ProcessWorkingShiftCode
                                    && x.ImportDate.Value.Date == manufacture.ProcessDate.Value.Date
                                    && x.ItemCode == defaultValue.DefaultProductItemCode
                                    && x.AreaCode == manufacture.AreaCode
                                    && x.UnitCode == manufacture.UnitCode
                                    && x.StockCode == defaultValue.DefaultProductStock);
            if (import != null)
            {
                _dbContext.tblBuStockImport.Remove(import);
                await _dbContext.SaveChangesAsync();
            }
        }

        private async Task DeleteExportIngredient(tblBuManufacture manufacture, tblAdSystemParameter defaultValue)
        {
            var export = await _dbContext.tblBuStockExport.Where(x => string.IsNullOrEmpty(manufacture.OrderCode) || x.OrderCode == manufacture.OrderCode).Include(x => x.ExportDetails).FirstOrDefaultAsync(
                        x => x.ShiftCode == manufacture.ProcessWorkingShiftCode
                        && x.ExportDate.Value.Date == manufacture.ProcessDate.Value.Date
                        && x.ItemCode == manufacture.ItemCode
                        && x.AreaCode == manufacture.AreaCode
                        && x.UnitCode == manufacture.UnitCode
                        && x.StockCode == defaultValue.DefaultIngredientStock);

            if (export != null)
            {
                _dbContext.tblBuStockExport.Remove(export);
                await _dbContext.SaveChangesAsync();
            }
        }

        private async Task UpdateImportProduct(tblBuManufacture manufacture, tblAdSystemParameter defaultValue)
        {
            var import = await _dbContext.tblBuStockImport.Where(x => string.IsNullOrEmpty(manufacture.OrderCode) || x.OrderCode == manufacture.OrderCode).FirstOrDefaultAsync(
                                    x => x.ShiftCode == manufacture.ProcessWorkingShiftCode
                                    && x.ImportDate.Value.Date == manufacture.ProcessDate.Value.Date
                                    && x.ItemCode == defaultValue.DefaultProductItemCode
                                    && x.AreaCode == manufacture.AreaCode
                                    && x.UnitCode == manufacture.UnitCode
                                    && x.StockCode == defaultValue.DefaultProductStock);

            if (import != null)
            {
                if (string.IsNullOrEmpty(import.OrderCodeFromStock))
                {
                    import.OrderCodeFromStock = manufacture.OrderCode;
                }

                import.Amount = manufacture.Amount * defaultValue?.DefaultTransferValue;
                _dbContext.Update(import);
            }
            else
            {
                await AddImportProduct(manufacture, defaultValue, defaultValue?.DefaultCompanyCode);
            }

            await _dbContext.SaveChangesAsync();
        }

        private async Task UpdateExportIngredient(tblBuManufacture manufacture, tblAdSystemParameter defaultValue)
        {
            var export = await _dbContext.tblBuStockExport.Where(x => string.IsNullOrEmpty(manufacture.OrderCode) || x.OrderCode == manufacture.OrderCode).Include(x => x.ExportDetails).FirstOrDefaultAsync(
                       x => x.ShiftCode == manufacture.ProcessWorkingShiftCode
                       && x.ExportDate.Value.Date == manufacture.ProcessDate.Value.Date
                       && x.ItemCode == defaultValue.DefaultIngredientItemCode
                       && x.AreaCode == manufacture.AreaCode
                       && x.UnitCode == manufacture.UnitCode
                       && x.StockCode == defaultValue.DefaultIngredientStock
                       && x.OrderCode == manufacture.OrderCode);

            if (export != null)
            {
                export.Amount = manufacture.Amount;
                _dbContext.Update(export);
            }
            else
            {
                if (string.IsNullOrEmpty(export.OrderCodeFromStock))
                {
                    export.OrderCodeFromStock = manufacture.OrderCode;
                }

                await AddExportIngredient(manufacture, defaultValue, defaultValue?.DefaultCompanyCode);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task<byte[]> Export(DateTime date)
        {
            var listPours = await _dbContext.tblBuManufacture
                .Include(x => x.Order).ThenInclude(x => x.WorkingShift)
                .Include(x => x.Order).ThenInclude(x => x.Partner)
                .Include(x => x.Area)
                .Include(x => x.Item)
                .Include(x => x.PourLine)
                .Include(x => x.PourSection)
                .Where(x => x.ProcessType == ManufactureType.HA_BAI.ToString())
                .Select(x => new
                {
                    OrderCode = x.OrderCode,
                    AreaCode = x.AreaCode,
                    AreaName = x.Area.Name,
                    ImportDate = x.Order.OrderDate,
                    ImportShiftCode = x.Order.WorkingShiftCode,
                    ImportShiftName = x.Order.WorkingShift.Name,
                    ItemCode = x.ItemCode,
                    ItemName = x.Item.Name,
                    Note = x.Order.Note,
                    PartnerCode = x.Order.PartnerCode,
                    PartnerName = x.Order.Partner.Name,
                    PourLineCode = x.PourLineCode,
                    PourLineName = x.PourLine.Name,
                    PourSectionCode = x.PourSectionCode,
                    PoutSectionName = x.PourSection.Name,
                    VehicleCode = x.Order.VehicleCode,
                    Amount = x.Amount
                })
                .ToListAsync();

            var listPourData = new List<ManufactureExportDto>();

            var manufactures = await _dbContext.tblBuManufacture.Where(x => x.ProcessDate.Value.Date < date.Date)
                   .Where(y => y.ProcessType == ManufactureType.SX_TT.ToString() && listPours.Select(x => x.OrderCode).Contains(y.OrderCodeFromStock)).ToListAsync();

            foreach (var x in listPours)
            {
                var manufacture = manufactures
                    .Where(y => y.OrderCodeFromStock == x.OrderCode)
                    .Where(y => y.PourLineCode == x.PourLineCode)
                    .Where(y => y.PourSectionCode == x.PourSectionCode).ToList();

                var manufactureAmount = manufacture.Sum(y => y.Amount);

                if (manufactureAmount < x.Amount)
                {
                    listPourData.Add(new ManufactureExportDto()
                    {
                        Amount = x.Amount - manufactureAmount,
                        AreaCode = x.AreaCode,
                        AreaName = x.AreaName,
                        ImportDate = x.ImportDate,
                        ImportShiftCode = x.ImportShiftCode,
                        ImportShiftName = x.ImportShiftName,
                        ItemCode = x.ItemCode,
                        ItemName = x.ItemName,
                        Note = x.Note,
                        PartnerCode = x.PartnerCode,
                        PartnerName = x.PartnerName,
                        PourLineCode = x.PourLineCode,
                        PourLineName = x.PourLineName,
                        PoutSectionCode = x.PourSectionCode,
                        PoutSectionName = x.PoutSectionName,
                        VehicleCode = x.VehicleCode,
                        ChipperCode = string.Empty,
                        ChipperName = string.Empty,
                        ExportDate = null,
                        ExportShiftCode = string.Empty,
                        ExportShiftName = string.Empty,
                    });
                }
            }

            var manufactureData = await _dbContext.tblBuManufacture
                                    .Include(x => x.Item)
                                    .Include(x => x.Area)
                                    .Include(x => x.PourLine)
                                    .Include(x => x.PourSection)
                                    .Include(x => x.ProcessWorkingShift)
                                    .Include(x => x.OrderFromStock).ThenInclude(x => x.WorkingShift)
                                    .Include(x => x.OrderFromStock).ThenInclude(x => x.Partner)
                                    .Where(x => x.ProcessType == ManufactureType.SX_TT.ToString())
                                    .Where(x => x.ProcessDate.Value.Month == date.Month)
                                    .Where(x => x.ProcessDate.Value.Year == date.Year)
                                    .Where(x => x.ProcessDate.Value.Day <= date.Day)
                                    .Select(x => new ManufactureExportDto()
                                    {
                                        Amount = x.Amount,
                                        AreaCode = x.AreaCode,
                                        AreaName = x.Area.Name,
                                        ExportDate = x.ProcessDate,
                                        ExportShiftCode = x.ProcessWorkingShiftCode,
                                        ExportShiftName = x.ProcessWorkingShift.Name,
                                        ImportDate = x.OrderFromStock.OrderDate,
                                        ImportShiftCode = x.OrderFromStock.WorkingShiftCode,
                                        ImportShiftName = x.OrderFromStock.WorkingShift.Name,
                                        ItemCode = x.ItemCode,
                                        ItemName = x.Item.Name,
                                        Note = x.OrderFromStock.Note,
                                        PartnerCode = x.OrderFromStock.PartnerCode,
                                        PartnerName = x.OrderFromStock.Partner.Name,
                                        PickUpMethod = x.PickUpMethod,
                                        PourLineCode = x.PourLineCode,
                                        PourLineName = x.PourLine.Name,
                                        PoutSectionCode = x.PourSectionCode,
                                        PoutSectionName = x.PourSection.Name,
                                        VehicleCode = x.OrderFromStock.VehicleCode,
                                    }).ToListAsync();

            var manufactureChipperData = await _dbContext.tblBuManufactureChipper
                                                .Include(x => x.Chipper)
                                                .Where(x => x.ProcessDate.Value.Month == date.Month)
                                                .Where(x => x.ProcessDate.Value.Year == date.Year)
                                                .ToListAsync();

            manufactureData.ForEach(x =>
            {
                var manufactureChipper = manufactureChipperData
                        .FirstOrDefault(y => y.ShiftCode == x.ExportShiftCode
                            && y.ProcessDate.Value.Date == x.ExportDate.Value.Date);
                x.ChipperCode = manufactureChipper?.ChipperCode;
                x.ChipperName = manufactureChipper?.Chipper?.Name;
            });

            var result = listPourData.Concat(manufactureData).OrderBy(x => x.ImportDate).ThenBy(x => x.ExportDate);

            return await new ExcelExporter(_dbContext).ExportToExcel(result, ExcelExportType.NHAP_XUAT);
        }
    }
}
