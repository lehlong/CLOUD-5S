using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.SO
{
    public class tblSoOrderDetailConfig : IEntityTypeConfiguration<tblSoOrderDetail>
    {
        public void Configure(EntityTypeBuilder<tblSoOrderDetail> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
