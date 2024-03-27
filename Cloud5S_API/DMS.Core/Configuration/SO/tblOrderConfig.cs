using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.SO
{
    public class tblOrderConfig : IEntityTypeConfiguration<tblSoOrder>
    {
        public void Configure(EntityTypeBuilder<tblSoOrder> builder)
        {
            builder.Property(e => e.ConcurrencyToken).IsConcurrencyToken(true);
        }
    }
}
