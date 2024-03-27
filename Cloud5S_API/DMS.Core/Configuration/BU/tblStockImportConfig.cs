using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockImportConfig : IEntityTypeConfiguration<tblBuStockImport>
    {
        public void Configure(EntityTypeBuilder<tblBuStockImport> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
            builder.HasMany(x=>x.ImportDetails).WithOne(x=>x.Import).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
