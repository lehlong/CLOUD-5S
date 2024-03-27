using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockExportDetailConfig : IEntityTypeConfiguration<tblBuStockExportDetail>
    {
        public void Configure(EntityTypeBuilder<tblBuStockExportDetail> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
