using DMS.BUSINESS.Common.Constants;
using DMS.CORE;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Common.SO
{
    public class CodeManager
    {
        private AppDbContext _dbContext;
        public CodeManager(AppDbContext context)
        {
            _dbContext = context;
        }

        public async Task<string> GenerateOrderCode()
        {
            return await GenCode("SO");
        }

        public async Task<string> GenerateOrderBatchCode()
        {
            return await GenCode("OB");
        }

        public async Task<string> GenerateImportCode()
        {
            return await GenCode("IM");
        }

        public async Task<string> GenerateExportCode()
        {
            return await GenCode("EX");
        }

        public async Task<string> GenerateOrderScaleCode()
        {
            return await GenCode("SC");
        }

        public async Task<string> GenerateOrderStockImportCode()
        {
            return await GenCode("SI");
        }

        public async Task<string> GenerateStockExportCode()
        {
            return await GenCode("SE");
        }

        public async Task<string> GenerateIncomeBillCode()
        {
            return await GenCode("PT");
        }

        public async Task<string> GeneratePayBillCode()
        {
            return await GenCode("PC");
        }

        public async Task<string> GenerateContractCode()
        {
            return await GenCode("CT");
        }

        public async Task<string> GeneratePartnerCode(string PartnerType)
        {
            if (PartnerType == "KHACH_HANG")
            {
                return await GenCode("KH");
            }

            else if (PartnerType == "NHA_CUNG_CAP")
            {
                return await GenCode("CC");
            }

            else return await GenCode("KHCC");
        }

        private async Task<int> GetSequence(string modulType)
        {
            var parameterReturn = new SqlParameter
            {
                ParameterName = "ID",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output,
            };

            var result = await _dbContext.Database.ExecuteSqlRawAsync("[dbo].[GetSequence] @ModulType, @ID OUTPUT", new SqlParameter("@ModulType", modulType), parameterReturn);
            int returnValue = (int)parameterReturn.Value;
            return returnValue;
        }

        private async Task<string> GenCode(string modulType)
        {
            var id = await GetSequence(modulType);
            var code = string.Empty;
            switch (modulType)
            {
                case "SO":
                    code = string.Format($"{Cnst.OrderCodePrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "OB":
                    code = string.Format($"{Cnst.OrderBatchCodePrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "IM":
                    code = string.Format($"{Cnst.ImportCodePrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "EX":
                    code = string.Format($"{Cnst.ExportCodePrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "SC":
                    code = string.Format($"{Cnst.OrderScalePrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "SI":
                    code = string.Format($"{Cnst.StockImportPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "SE":
                    code = string.Format($"{Cnst.StockExportPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "PT":
                    code = string.Format($"{Cnst.IncomeBillPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "PC":
                    code = string.Format($"{Cnst.PayBillPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "KH":
                    code = string.Format($"{Cnst.CustomerPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "CC":
                    code = string.Format($"{Cnst.ProviderPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "KHCC":
                    code = string.Format($"{Cnst.CustomerProviderPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
                case "CT":
                    code = string.Format($"{Cnst.ContractPrefix}{DateTime.Now.ToString("yyMMdd")}-{id}");
                    break;
            }
            return code;
        }
    }
}
