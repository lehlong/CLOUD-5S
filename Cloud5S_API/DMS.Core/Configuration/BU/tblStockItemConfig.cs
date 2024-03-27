using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockItemConfig : IEntityTypeConfiguration<tblBuStockItem>
    {
        public void Configure(EntityTypeBuilder<tblBuStockItem> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
