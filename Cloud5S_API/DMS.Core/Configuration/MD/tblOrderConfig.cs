using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.MD
{
    public class tblOrderConfig : IEntityTypeConfiguration<tblSoOrder>
    {
        public void Configure(EntityTypeBuilder<tblSoOrder> builder)
        {
            builder.HasOne(x=>x.Partner).WithMany(x=>x.Orders)
                .HasForeignKey(x=>x.PartnerCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
