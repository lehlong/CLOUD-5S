using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblFolderConfig : IEntityTypeConfiguration<tblBuFolder>
    {
        public void Configure(EntityTypeBuilder<tblBuFolder> builder)
        {
            builder.Property(x => x.ReferenceId).HasDefaultValueSql("NEWID()");
        }
    }
}
