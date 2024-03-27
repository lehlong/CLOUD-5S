using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockItemHistoryConfig : IEntityTypeConfiguration<tblBuStockItemHistory>
    {
        public void Configure(EntityTypeBuilder<tblBuStockItemHistory> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
