using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DMS.BUSINESS.Services.HB
{
    public class TrackingServiceHub : Hub
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly AppDbContext _dbContext;
        private List<Claim> _Claims;

        public TrackingServiceHub(IHttpContextAccessor contextAccessor, AppDbContext dbContext)
        {
            _contextAccessor = contextAccessor;
            _dbContext = dbContext;
            try
            {
                var token = _contextAccessor?.HttpContext?.Request?.Query["access_token"];
                if (!string.IsNullOrWhiteSpace(token))
                {
                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                    _Claims = securityToken.Claims.ToList();
                }
            }
            catch (Exception)
            {
                _Claims = new();
            }
        }

        private string UserName
        {
            get
            {
                try
                {
                    return _Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        protected string FullName
        {
            get
            {
                try
                {
                    return _Claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        public override Task OnConnectedAsync()
        {
            if (!string.IsNullOrEmpty(UserName))
            {
                Groups.AddToGroupAsync(Context.ConnectionId, UserName);
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (!string.IsNullOrEmpty(UserName))
            {
                Groups.RemoveFromGroupAsync(Context.ConnectionId, UserName);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task GetLocation(TrackingFilter filter)
        {
            var raw_data = _dbContext.tblBuTracking.Include(x => x.Order).ThenInclude(x => x.Scale)
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
              x.SentTime,
              x.Speed,
              x.TimeStamp,
              x.Latitude,
              x.Longitude,
              Vehicle = x.Order.VehicleCode,
              x.Heading,
              x.Order.Scale.Weight
          });

            var data = await raw_data.GroupBy(x => new { x.OrderCode, x.Vehicle, x.Weight })
                 .Select(x => new
                 {
                     x.Key.Vehicle,
                     x.Key.OrderCode,
                     x.Key.Weight,
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


            await Clients.Client(Context.ConnectionId).SendAsync("Location", data);
            return;
        }
    }
}
