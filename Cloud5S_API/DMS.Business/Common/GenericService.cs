using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.CORE;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.Common;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using DMS.CORE.Common;

namespace DMS.BUSINESS.Common
{
    public abstract class GenericService<TEntity, TDto> : BaseService, IGenericService<TEntity, TDto> where TDto : class where TEntity : BaseEntity
    {

        public GenericService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {

        }

        /// <summary>
        /// Lấy ra thuộc tính được thiết lập là key trong DTO
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        private PropertyInfo GetKeyField(IDto dto)
        {
            PropertyInfo keyProperty = null;
            Type t = dto.GetType();
            foreach (PropertyInfo pi in t.GetProperties())
            {
                object[] attrs = pi.GetCustomAttributes(typeof(KeyAttribute), false);
                if (attrs != null && attrs.Length == 1)
                {
                    keyProperty = pi;
                    break;
                }
            }
            return keyProperty;
        }

        /// <summary>
        /// Lấy giá trị của thuộc tính được thiết lập là key trong DTO
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        private object GetValueOfKeyField(IDto dto, PropertyInfo keyProperty)
        {
            object value = null;
            if (keyProperty != null)
            {
                value = keyProperty.GetValue(dto, null);
            }
            return value;
        }

        public virtual Task<PagedResponseDto> Search(BaseFilter filter)
        {
            return Task.FromResult<PagedResponseDto>(new());
        }

        public virtual async Task<IList<TDto>> GetAll()
        {
            try
            {
                var query = this._dbContext.Set<TEntity>();
                var lstEntity = await this._dbContext.Set<TEntity>().ToListAsync();
                return _mapper.Map<List<TDto>>(lstEntity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public virtual async Task<IList<TDto>> GetAllActive()
        {
            try
            {
                var query = this._dbContext.Set<TEntity>().AsQueryable();
                query = query.Where(x => x.IsActive == true);
                var lstEntity = await query.ToListAsync();
                return _mapper.Map<List<TDto>>(lstEntity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public virtual async Task<TDto> GetById(object id)
        {
            try
            {
                var entity = await this._dbContext.Set<TEntity>().FindAsync(id);
                return _mapper.Map<TDto>(entity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public virtual async Task<TDto> Add(IDto dto)
        {
            try
            {
                var keyField = this.GetKeyField(dto);
                if (keyField != null)
                {
                    var keyValue = this.GetValueOfKeyField(dto, keyField);
                    var entityInDB = await this._dbContext.Set<TEntity>().FindAsync(keyValue);
                    if (entityInDB != null)
                    {
                        this.Status = false;
                        this.MessageObject.Code = "0004";
                        return null;
                    }
                }
                
                var entity = _mapper.Map<TEntity>(dto);
                var entityResult = await this._dbContext.Set<TEntity>().AddAsync(entity);
                await this._dbContext.SaveChangesAsync();
                var dtoResult = _mapper.Map<TDto>(entityResult.Entity);
                return dtoResult;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
        public virtual async Task Delete(object code)
        {
            try
            {
                var entity = this._dbContext.Set<TEntity>().Find(code);
                this._dbContext.Entry(entity).State = EntityState.Deleted;
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        /// <summary>
        /// Chú ý khi sử dụng phương thức Update Generic. Nó sẽ update toàn bộ thuộc tính của TEntity
        /// Để chỉ update các thuộc tính trong DTO cần overide lại hàm này
        /// Ví dụ
        /// var saleOrderInDB = await this._dbContext.tblStoreOrderOperating.FindAsync(saleOrder.Id); --> lấy entity để tracker
        /// this._mapper.Map(saleOrder, saleOrderInDB); --> Dòng code này sẽ cập nhật dữ liệu từ DTO --> entity đang được tracker
        /// await this._dbContext.SaveChangesAsync();
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public virtual async Task Update(IDto dto)
        {
            try
            {
                var keyField = this.GetKeyField(dto);
                if (keyField == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "0002";
                    return;
                }
                var keyValue = this.GetValueOfKeyField(dto, keyField);
                var entityInDB = await this._dbContext.Set<TEntity>().FindAsync(keyValue);
                if (entityInDB == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "0003";
                    return;
                }
                this._mapper.Map(dto, entityInDB);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public virtual async Task<PagedResponseDto> Paging(IQueryable<TEntity> query, BaseFilter filter)
        {
            try
            {
                var pagedResponseDto = new PagedResponseDto
                {
                    TotalRecord = await query.CountAsync(),
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize
                };
                pagedResponseDto.TotalPage = Convert.ToInt32(Math.Ceiling((double)pagedResponseDto.TotalRecord / (double)pagedResponseDto.PageSize));
                var result = query.Skip((filter.CurrentPage - 1) * filter.PageSize).Take(filter.PageSize).ToList();
                pagedResponseDto.Data = _mapper.Map<List<TDto>>(result);
                return pagedResponseDto;
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
