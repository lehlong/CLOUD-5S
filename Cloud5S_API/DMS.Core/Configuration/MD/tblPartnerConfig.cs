using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblPartnerConfig : IEntityTypeConfiguration<tblMdPartner>
    {
        public void Configure(EntityTypeBuilder<tblMdPartner> builder)
        {
            builder.Property(x => x.Id).ValueGeneratedOnAdd().HasDefaultValueSql("NEWID()");
        }
    }
}
