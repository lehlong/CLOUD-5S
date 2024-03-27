using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public interface INotificationService : IGenericService<tblBuNotification, tblNotificationDto>
    {
        Task<PagedResponseDto> GetUserNotification(BaseFilter filter, string username);
        Task<tblNotificationSearchDto> GetMessageDetail(int id, string username);
        Task UpdateSeenState(int id, string username, bool isSeen);
        Task Delete(int id, string username);
        Task<tblNotificationDto> Add(IDto dto, string senderName);
        Task<PagedResponseDto> Search(NotificationFilter filter);
        Task<NotificationQuantity> GetQuantity(string userName);
        Task<byte[]> Export(NotificationExportFilter filter);
    }
    public class NotificationService : GenericService<tblBuNotification, tblNotificationDto>, INotificationService
    {
        private readonly NotificationManager _notificationManager;
        public NotificationService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration, IConnection connection) : base(dbContext, mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            if (connection != null)
                _notificationManager = new NotificationManager(connection, dbContext, mapper, configuration);
        }

        public async Task<PagedResponseDto> Search(NotificationFilter filter)
        {
            var query = _dbContext.tblBuNotification.Include(x => x.Details)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                                                        || x.Details.Any(y => y.Account.FullName.Contains(filter.KeyWord))
                                                        || x.Details.Any(y => y.Account.UserName.Contains(filter.KeyWord)))
                .Where(x => x.Type == (int)NotificationType.DEFAULT)
                .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                                                    .OrderByDescending(x => x.CreateDate);

            var pagedResponseDto = new PagedResponseDto();
            pagedResponseDto.TotalRecord = await query.CountAsync();
            pagedResponseDto.CurrentPage = filter.CurrentPage;
            pagedResponseDto.PageSize = filter.PageSize;
            pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
            var result = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToList();
            pagedResponseDto.Data = result.Select(x => new tblNotificationDto()
            {
                Contents = x.Contents,
                CreateBy = x.CreateBy,
                CreateDate = x.CreateDate,
                Headings = x.Headings,
                Id = x.Id,
                IsDeleted = x.IsDeleted,
                SenderName = x.SenderName,
                Subtitle = x.Subtitle,
                Type = x.Type,
                Url = x.Url,
                UpdateDate = x.UpdateDate,
                UpdateBy = x.UpdateBy,
                Details = x.Details.Select(y => new tblNotificationDetailDto()
                {
                    UpdateBy = y.UpdateBy,
                    ReceiverName = y.ReceiverName,
                    UpdateDate = y.UpdateDate,
                    CreateBy = y.CreateBy,
                    CreateDate = y.CreateDate,
                    DeleteBy = y.DeleteBy,
                    DeleteDate = y.DeleteDate,
                    Id = y.Id,
                    IsActive = y.IsActive,
                    IsSeen = y.IsSeen,
                    IsSent = y.IsSent,
                    IsDeleted = y.IsDeleted,
                    NotificationId = y.NotificationId,
                }).ToList(),
                NotSeen = x.Details.Count(x => x.IsSeen != true),
                Seen = x.Details.Count(x => x.IsSeen == true),
                SentFail = x.Details.Count(y => y.IsSent != true),
                SentSuccess = x.Details.Count(y => y.IsSent == true),
            });
            return pagedResponseDto;
        }

        public override async Task<tblNotificationDto> GetById(object id)
        {
            var data = await _dbContext.tblBuNotification
                .Include(x => x.Details)
                    .ThenInclude(x => x.Account)
                .FirstOrDefaultAsync(x => x.Id == (int)id);

            return _mapper.Map<tblNotificationDto>(data);
        }

        public async Task<PagedResponseDto> GetUserNotification(BaseFilter filter, string username)
        {
            var query = _dbContext.tblBuNotificationDetail.Include(x => x.Notification).Where(x => x.ReceiverName == username && x.IsActive == filter.IsActive && (x.IsSent ?? false))
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.Notification.Subtitle.Contains(filter.KeyWord) || x.Notification.Contents.Contains(filter.KeyWord))
                .OrderByDescending(x => x.CreateDate).Select(x => new tblNotificationSearchDto()
                {
                    Id = x.Id,
                    Contents = x.Notification.Contents,
                    Headings = x.Notification.Headings,
                    IsSeen = x.IsSeen,
                    CreateBy = x.CreateBy,
                    CreateDate = x.CreateDate,
                    IsDeleted = x.IsDeleted,
                    IsSent = x.IsSent,
                    Subtitle = x.Notification.Subtitle,
                    Type = x.Notification.Type,
                    UpdateBy = x.UpdateBy,
                    UpdateDate = x.UpdateDate,
                    Url = x.Notification.Url,
                }).AsQueryable();

            var pagedResponseDto = new PagedResponseDto
            {
                TotalRecord = await query.CountAsync(),
                CurrentPage = filter.CurrentPage,
                PageSize = filter.PageSize
            };
            pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
            var result = await query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
            result.ForEach(x =>
            {
                x.HtmlContents = x.Contents;
                x.Contents = Utils.ConvertToPlainText(x.Contents);
            });
            pagedResponseDto.Data = result;

            return pagedResponseDto;
        }

        public async Task<tblNotificationSearchDto> GetMessageDetail(int id, string username)
        {
            var data = await _dbContext.tblBuNotificationDetail
                .Include(x => x.Notification)
                .Where(x => x.Id == id && x.ReceiverName == username && (x.IsSent ?? false))
                .Select(x => new tblNotificationSearchDto()
                {
                    Id = x.Id,
                    Contents = x.Notification.Contents,
                    HtmlContents = x.Notification.Contents,
                    Headings = x.Notification.Headings,
                    IsSeen = x.IsSeen,
                    CreateBy = x.CreateBy,
                    CreateDate = x.CreateDate,
                    IsDeleted = x.IsDeleted,
                    IsSent = x.IsSent,
                    Subtitle = x.Notification.Subtitle,
                    Type = x.Notification.Type,
                    UpdateBy = x.UpdateBy,
                    UpdateDate = x.UpdateDate,
                    Url = x.Notification.Url
                }).FirstOrDefaultAsync();

            return data;
        }

        public async Task UpdateSeenState(int id, string username, bool isSeen)
        {
            try
            {
                var currentObj = await _dbContext.tblBuNotificationDetail.FirstOrDefaultAsync(x => x.Id == id && x.ReceiverName == username);
                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2000";
                    return;
                }
                currentObj.IsSeen = isSeen;
                _dbContext.Entry(currentObj).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task Delete(int id, string username)
        {
            try
            {
                var currentObj = await _dbContext.tblBuNotificationDetail.FirstOrDefaultAsync(x => x.Id == id && x.ReceiverName == username);
                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "2000";
                    return;
                }
                currentObj.IsActive = false;
                _dbContext.Entry(currentObj).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task<tblNotificationDto> Add(IDto dto, string senderName)
        {
            await _dbContext.Database.BeginTransactionAsync();
            try
            {
                if (_notificationManager != null)
                {
                    var model = dto as tblNotificationCreateDto;
                    var template = await _notificationManager.GetTemplate(NotificationType.DEFAULT.ToString());

                    var obj = _mapper.Map<tblBuNotification>(model);
                    obj.Headings = template.Headings;
                    obj.Type = (int)NotificationType.DEFAULT;
                    obj.SenderName = senderName;

                    _dbContext.tblBuNotification.Add(obj);
                    await _dbContext.SaveChangesAsync();

                    var result = _mapper.Map<tblNotificationDto>(obj);
                    _notificationManager.SendByUser(result);

                    await _dbContext.Database.CommitTransactionAsync();
                    return result;
                }
                else
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    this.Status = false;
                    this.MessageObject.Code = "0005";
                    return null;
                }
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<NotificationQuantity> GetQuantity(string userName)
        {
            var data = await _dbContext.tblBuNotificationDetail.Where(x => x.ReceiverName == userName && x.IsSent == true).ToListAsync();

            return new NotificationQuantity()
            {
                Seen = data.Count(x => x.IsSeen == true),
                UnSeen = data.Count(x => x.IsSeen != true)
            };
        }

        public async Task<byte[]> Export(NotificationExportFilter filter)
        {
            var raw_data = await _dbContext.tblBuNotification.Include(x => x.Details)
               .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                                                       || x.Details.Any(y => y.Account.FullName.Contains(filter.KeyWord))
                                                       || x.Details.Any(y => y.Account.UserName.Contains(filter.KeyWord)))
               .Where(x => x.Type == (int)NotificationType.DEFAULT)
               .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
               .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                                                   .OrderByDescending(x => x.CreateDate).ToListAsync();

            var data = raw_data.Select((x, i) => new tblNotificationDto()
            {
                OrdinalNumber = i+1,
                Id = x.Id,
                Subtitle = x.Subtitle,
                NotSeen = x.Details.Count(x => x.IsSeen != true),
                Seen = x.Details.Count(x => x.IsSeen == true),
            }).ToList();

            var result = await new ExcelExporter(_dbContext).ExportToExcel(data, ExcelExportType.DSTHONG_BAO);
            return result;
        }
    }
}
