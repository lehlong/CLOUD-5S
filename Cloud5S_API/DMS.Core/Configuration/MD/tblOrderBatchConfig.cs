using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.MD
{
    public class tblOrderBatchConfig : IEntityTypeConfiguration<tblSoOrderBatch>
    {
        public void Configure(EntityTypeBuilder<tblSoOrderBatch> builder)
        {
            builder.Property(x => x.ReferenceId).HasDefaultValueSql("NEWID()");
        }
    }
}
