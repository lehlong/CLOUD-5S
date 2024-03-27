using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.MD;
using DMS.BUSINESS.Services.HB;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IVehicleService : IGenericService<tblMdVehicle, tblVehicleDto>
    {
        Task<PagedResponseDto> Search(VehicleFilter filter);
        Task<IList<tblVehicleDto>> GetAll(VehicleFilterLite filter);
        //Task<VehicleTracking> GetTrackingVehicle(string KeyWord);
        Task<byte[]> Export(VehicleExportFilter filter);

    }
    public class VehicleService : GenericService<tblMdVehicle, tblVehicleDto>, IVehicleService
    {
        private readonly IHubContext<RefreshServiceHub> _hubContext;
        public VehicleService(AppDbContext dbContext, IMapper mapper, IHubContext<RefreshServiceHub> hubContext) : base(dbContext, mapper)
        {
            _hubContext = hubContext;
        }

        public async Task<PagedResponseDto> Search(VehicleFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdVehicle
                    .Include(x => x.Unit)
                .Include(x => x.VehicleType)
                .Include(x => x.DefaultDriver)
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.DefaultDriver.FullName.Contains(filter.KeyWord)
                    );
                }

                if (!string.IsNullOrWhiteSpace(filter.TypeCode))
                {
                    query = query.Where(x => x.TypeCode.Contains(filter.TypeCode));
                }

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }

                query = query.OrderByDescending(x => x.CreateDate);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblVehicleDto>> GetAll(VehicleFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblMdVehicle
                    .Include(x => x.Unit)
                .Include(x => x.VehicleType)
                .Include(x => x.DefaultDriver)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                         || x.Code.Contains(filter.KeyWord))
                .AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderByDescending(x => x.CreateDate);
                return _mapper.Map<IList<tblVehicleDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        //public async Task<VehicleTracking> GetTrackingVehicle(string KeyWord)
        //{
        //    var activeVehicle = await _dbContext.tblSoOrderRelease.Include(x => x.Vehicle).ThenInclude(x=>x.DefaultDriver).Include(x => x.Trackings)
        //        .Where(x => x.State == OrderReleaseState.DA_HOAN_THANH.ToString())
        //        .Select(x => new VehicleTrackingDto()
        //        {
        //            Code = x.MixVehicleCode,
        //            DriverName = x.Vehicle.DefaultDriver.FullName,
        //            TrackingData = x.Trackings.OrderByDescending(y => y.CreateDate).Select(y => new TrackingData()
        //            {
        //                Heading = y.Heading,
        //                Latitude = y.Latitude,
        //                Longitude = y.Longitude,
        //                Speed = y.Speed,
        //                TimeStamp = y.TimeStamp
        //            }).FirstOrDefault()
        //        }).Where(x => string.IsNullOrEmpty(KeyWord) || x.Code.Contains(KeyWord) || x.DriverName.Contains(KeyWord)).ToListAsync();

        //    var deactiveVehicle = await _dbContext.tblMdVehicle
        //        .Include(x=>x.DefaultDriver)
        //        .Where(x => !activeVehicle.Select(y => y.Code).Contains(x.Code))
        //        .Select(x => new VehicleTrackingDto()
        //        {
        //            Code = x.Code,
        //            DriverName = x.DefaultDriver.FullName
        //        }).Where(x => string.IsNullOrEmpty(KeyWord) || x.Code.Contains(KeyWord) || x.DriverName.Contains(KeyWord)).ToListAsync();

        //    return new VehicleTracking()
        //    {
        //        ActiveVehicle = activeVehicle.DistinctBy(x => x.Code).ToList(),
        //        DeActiveVehicle = deactiveVehicle.DistinctBy(x => x.Code).ToList()
        //    };
        //}

        public override async Task<tblVehicleDto> Add(IDto dto)
        {
            var result = await base.Add(dto);
            if (this.Status)
            {
                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.VEHICLE.ToString(), result.Code);
            }
            return result;
        }

        public override async Task Delete(object code)
        {
            await base.Delete(code);
            if (this.Status)
            {
                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.VEHICLE.ToString(), (string)code);
            }
        }

        public override async Task Update(IDto dto)
        {
            var model = dto as tblVehicleUpdateDto;
            await base.Update(dto);
            if (this.Status)
            {
                var groups = await _dbContext.tblAdAccountGroup.Where(x =>
                    x.RoleCode == Roles.PHONG_KINH_DOANH.ToString() ||
                    x.RoleCode == Roles.BAN_GIAM_DOC.ToString() ||
                    x.RoleCode == Roles.BAN_DIEU_HANH.ToString())
                .Select(x => x.Id.ToString().ToLower()).ToListAsync();

                await _hubContext.Clients.Groups(groups).SendAsync(SignalRNotificationType.VEHICLE.ToString(), model.Code);
            }
        }

        public override async Task<tblVehicleDto> GetById(object id)
        {
            try
            {
                var data = await this._dbContext.tblMdVehicle
                    .Include(x => x.Unit)
                .Include(x => x.VehicleType)
                .Include(x => x.DefaultDriver)
                .FirstOrDefaultAsync(x => x.Code == (string)id);

                return _mapper.Map<tblVehicleDto>(data);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(VehicleExportFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdVehicle
                .Include(x => x.VehicleType)
                .Include(x => x.DefaultDriver)
                .AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.DefaultDriver.FullName.Contains(filter.KeyWord)
                    );
                }

                if (!string.IsNullOrWhiteSpace(filter.TypeCode))
                {
                    query = query.Where(x => x.TypeCode.Contains(filter.TypeCode));
                }

                query = query.OrderByDescending(x => x.CreateDate);

                var raw_data = await query.ToListAsync();

                var data = raw_data.Select((x, i) => new tblVehicleExportDto()
                {
                    OrdinalNumber = i + 1,
                    IsActive = x?.IsActive,
                    DriverName = x?.DriverUserName,
                    Tonnage = x?.Tonnage ?? 0,
                    UnladenWeight = x?.UnladenWeight ?? 0,
                    VehicleCode = x?.Code,
                    VehicleType = x?.VehicleType?.Name,
                    UnitCode = x?.UnitCode
                });

                var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.PHUONG_TIEN);

                return result;
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
