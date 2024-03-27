using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Comment
{
    public interface ICommentService : IGenericService<tblBuComment, tblCommentDto>
    {
        Task<PagedResponseDto> GetCommentsByReference(CommentFilter filter);
        Task<tblCommentDto> Add(tblCommentCreateDto dto);
        Task Update(tblCommentUpdateDto dto);
        Task Delete(Guid Id);
    }

    public class CommentService : GenericService<tblBuComment, tblCommentDto>, ICommentService
    {
        public CommentService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> GetCommentsByReference(CommentFilter filter)
        {
            try
            {
                var objComments = filter.refId != null ?
                    _dbContext.tblBuModuleComment.Where(x => x.ReferenceId == filter.refId).ToList() :
                    _dbContext.tblBuModuleComment.ToList();

                var commentIds = objComments.Select(x => x.CommentId);

                var comments = _dbContext.tblBuComment
                                .Include(x => x.Replies)
                                    .ThenInclude(x => x.Attachment)
                                .Include(x => x.Replies)
                                    .ThenInclude(x => x.Creator)
                                .Include(x => x.Attachment)
                                .Include(x => x.Creator)
                                .Where(x => commentIds.Contains(x.Id))
                                .Where(x => x.PId == null)
                                .OrderByDescending(x => x.CreateDate);

                return await Paging(comments, filter);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<tblCommentDto> Add(tblCommentCreateDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var entity = _mapper.Map<tblBuComment>(dto);

                entity.Replies = new List<tblBuComment>();

                var entityResult = await _dbContext.tblBuComment.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                var newCommentModule = new tblBuModuleComment
                {
                    ReferenceId = dto.ReferenceId,
                    CommentId = entity.Id
                };

                await _dbContext.tblBuModuleComment.AddAsync(newCommentModule);
                await _dbContext.SaveChangesAsync();

                var dtoResult = _mapper.Map<tblCommentDto>(entityResult.Entity);
                await _dbContext.Database.CommitTransactionAsync();

                return dtoResult;
            }
            catch(Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task Update(tblCommentUpdateDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var entityInDB = _dbContext.tblBuComment
                                .Include(x => x.Replies)
                                .Include(x => x.Attachment)
                                .Include(x => x.Creator)
                                .FirstOrDefault(x => x.Id == dto.Id);

                if (entityInDB == null)
                {
                    Status = false;
                    MessageObject.Code = "0003";
                    return;
                }

                _mapper.Map(dto, entityInDB);

                _dbContext.tblBuComment.Update(entityInDB);
                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return;
            }
        }

        public async Task Delete(Guid Id)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var lstAllComment = _dbContext.tblBuComment
                                    .Include(x => x.Replies)
                                    .Include(x => x.Attachment)
                                    .Include(x => x.Creator);

                var commentToDelete = _dbContext.tblBuComment
                                    .Include(x => x.Replies)
                                    .Include(x => x.Attachment)
                                    .Include(x => x.Creator)
                                    .FirstOrDefault(x => x.Id == Id);

                if (commentToDelete == null)
                {
                    Status = false;
                    MessageObject.Code = "0003";
                    return;
                }

                RemoveReplies(lstAllComment, Id, commentToDelete.PId);
                await _dbContext.SaveChangesAsync();

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return;
            }
        }

        private void RemoveReplies(IQueryable<tblBuComment> lstAllComment, Guid Id, Guid? PId)
        {
            var comment = lstAllComment.FirstOrDefault(x => x.Id == Id && x.PId == PId);

            foreach (var reply in comment.Replies)
            {
                if (reply == null)
                {
                    return;
                }
                else
                {
                    RemoveReplies(lstAllComment, reply.Id, reply.PId);
                    _dbContext.tblBuComment.Remove(reply);
                }
            }

            _dbContext.tblBuComment.Remove(comment);
        }
    }
}
