using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.SO
{
    public class tblSoOrderBatchDetailConfig : IEntityTypeConfiguration<tblSoOrderBatchDetail>
    {
        public void Configure(EntityTypeBuilder<tblSoOrderBatchDetail> builder)
        {
            builder.Property(e => e.SumMoney).HasComputedColumnSql("Price * OrderNumber");
        }
    }
}
