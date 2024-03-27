using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.SO
{
    public class tblSoOrderScaleConfig : IEntityTypeConfiguration<tblSoScale>
    {
        public void Configure(EntityTypeBuilder<tblSoScale> builder)
        {
            builder.Property(e => e.Weight).HasComputedColumnSql("Abs(Weight2 - Weight1)");
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
            builder.HasIndex(e => e.SyncCode).IsUnique();
        }
    }
}
