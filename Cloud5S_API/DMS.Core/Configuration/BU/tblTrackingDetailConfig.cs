using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblTrackingDetailConfig : IEntityTypeConfiguration<tblBuTracking>
    {
        public void Configure(EntityTypeBuilder<tblBuTracking> builder)
        {
            builder.HasIndex(x => x.OrderCode)
            .IsUnique(false)
            .IsClustered(false);
        }
    }
}
