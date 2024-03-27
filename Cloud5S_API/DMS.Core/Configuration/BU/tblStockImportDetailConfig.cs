using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockImportDetailConfig : IEntityTypeConfiguration<tblBuStockImportDetail>
    {
        public void Configure(EntityTypeBuilder<tblBuStockImportDetail> builder)
        {
        }
    }
}
