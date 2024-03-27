using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblManufactureConfig : IEntityTypeConfiguration<tblBuManufacture>
    {
        public void Configure(EntityTypeBuilder<tblBuManufacture> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
            builder.HasOne(x => x.Order).WithMany(x => x.Manufactures).HasForeignKey(x => x.OrderCode);
            builder.HasOne(x => x.OrderFromStock).WithMany(x => x.ManufactureStocks).HasForeignKey(x => x.OrderCodeFromStock);

        }
    }
}
