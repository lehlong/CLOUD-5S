using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblCheckInOutConfig : IEntityTypeConfiguration<tblBuCheckInOut>
    {
        public void Configure(EntityTypeBuilder<tblBuCheckInOut> builder)
        {
            builder.Property(x => x.ReferenceId).HasDefaultValueSql("NEWID()");
        }
    }
}
