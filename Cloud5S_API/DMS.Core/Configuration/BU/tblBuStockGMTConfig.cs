using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblBuStockItemDetailConfig : IEntityTypeConfiguration<tblBuStockItemDetail>
    {
        public void Configure(EntityTypeBuilder<tblBuStockItemDetail> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
