using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;


namespace DMS.BUSINESS.Services.BU.Contract
{
    public interface IContractService : IGenericService<tblBuContract, tblContractDto>
    {
        Task<PagedResponseDto> Search(ContractFilter filter);
        Task<byte[]> Export(ContractExportFilter filter);
        Task UpdateState(tblContractUpdateStateDto model);
    }
    public class ContractService : GenericService<tblBuContract, tblContractDto>, IContractService
    {
        public ContractService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<tblContractDto> Add(IDto dto)
        {
            try
            {
                var model = dto as tblContractCreateDto;

                await _dbContext.Database.BeginTransactionAsync();

                var entity = _mapper.Map<tblBuContract>(dto);

                entity.Code = await new CodeManager(_dbContext).GenerateContractCode();
                entity.State = ContractState.KHOI_TAO.ToString();

                entity.Details ??= new List<tblBuContractDetail>();

                var entityResult = await _dbContext.tblBuContract.AddAsync(entity);

                await _dbContext.SaveChangesAsync();

                var dtoResult = _mapper.Map<tblContractDto>(entityResult.Entity);
                await _dbContext.Database.CommitTransactionAsync();

                return dtoResult;
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<byte[]> Export(ContractExportFilter filter)
        {
            var raw_data = await _dbContext.tblBuContract
              .Include(x => x.Partner)
              .Include(x => x.Details)
                .ThenInclude(x => x.Item)
              .Where(x => string.IsNullOrWhiteSpace(filter.Type) || x.Type == filter.Type)
              .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode) || x.PartnerCode == filter.PartnerCode)
              .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
              .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
              .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.Partner.Name.Contains(filter.KeyWord)).ToListAsync();


            var data = raw_data?.Select((x, i) => new tblContractExportDto()
            {
                OrdinalNumber = i,
                Code = x.Code,
                EndDate = x.EndDate,
                PartnerName = x.Partner.Name,
                StartDate = x.StartDate,
                Type = x.Type,
                State = x.State,
                TotalMoney = x.Details.Sum(y=>y.SumMoney ?? 0),
                Details = x.Details.Select(y=> new tblContractDetailExportDto()
                {
                    ItemName = y.Item.Name
                }).ToList(),
                Content = x.Content
            }).ToList();

            var result = await new ExcelExporter(_dbContext).ExportToExcel(data, Common.Enum.ExcelExportType.DSHOP_DONG);
            return result;
        }

        public override async Task<tblContractDto> GetById(object id)
        {
            var data = await _dbContext.tblBuContract
               .Include(x => x.Partner)
               .Include(x => x.Details)
                 .ThenInclude(x => x.Item)
                 .ThenInclude(x=>x.Unit)
                 .FirstOrDefaultAsync(x => x.Code == (string)id);

            return _mapper.Map<tblContractDto>(data);
        }

        public Task<PagedResponseDto> Search(ContractFilter filter)
        {
            var query = _dbContext.tblBuContract
                .Include(x => x.Partner)
                .Include(x => x.Details)
                  .ThenInclude(x => x.Item)
                .Where(x => string.IsNullOrWhiteSpace(filter.Type) || x.Type == filter.Type)
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode) || x.PartnerCode == filter.PartnerCode)
                .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.Partner.Name.Contains(filter.KeyWord));

            return base.Paging(query, filter);
        }

        public override async Task Update(IDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var model = dto as tblContractUpdateDto;

                var entityInDB = await _dbContext.tblBuContract
                    .Include(x => x.Details)
                    .FirstOrDefaultAsync(x => x.Code == model.Code);

                if (entityInDB == null)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    Status = false;
                    MessageObject.Code = "0003";
                    return;
                }

                _mapper.Map(model, entityInDB);
                _dbContext.ChangeTracker.Clear();

                entityInDB.Details.ForEach(orderDetail =>
                {
                    var modelDetail = model.Details.FirstOrDefault(y => y.ItemCode == orderDetail.ItemCode);
                    if (modelDetail != null)
                    {
                        orderDetail = _mapper.Map(modelDetail, orderDetail);
                        _dbContext.Entry(orderDetail).State = EntityState.Modified;
                    }
                });

                if (model.Details.Any(x => !entityInDB.Details.Select(y => y.ItemCode).Contains(x.ItemCode)))
                {
                    var modelDetails = model.Details.Where(x => !entityInDB.Details.Select(y => y.ItemCode).Contains(x.ItemCode)).ToList();
                    foreach (var item in modelDetails)
                    {
                        var obj = _mapper.Map<tblBuContractDetail>(item);
                        entityInDB.Details.Add(_mapper.Map<tblBuContractDetail>(item));
                    }
                }

                if (entityInDB.Details.Any(x => !model.Details.Select(y => y.ItemCode).Contains(x.ItemCode)))
                {
                    var deleteData = entityInDB.Details.Where(x => !model.Details.Select(y => y.ItemCode).Contains(x.ItemCode));
                    _dbContext.tblBuContractDetail.RemoveRange(deleteData);
                }

                _dbContext.tblBuContract.Update(entityInDB);

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

        public async Task UpdateState(tblContractUpdateStateDto model)
        {
            try
            {
                var entityInDB = await _dbContext.tblBuContract
                                .Include(x => x.Details)
                                .FirstOrDefaultAsync(x => x.Code == model.Code);

                if (entityInDB == null)
                {
                    Status = false;
                    MessageObject.Code = "0003";
                    return;
                }

                _mapper.Map(model, entityInDB);

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }
    }
}
