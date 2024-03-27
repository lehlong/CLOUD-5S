using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;

namespace DMS.CORE.Configuration.AD
{
    public class tblAdRightRightConfig : IEntityTypeConfiguration<tblAdRight>
    {
        public void Configure(EntityTypeBuilder<tblAdRight> builder)
        {
            builder.HasMany(x=>x.AccountGroupRights).WithOne(x=>x.Right).HasForeignKey(x=>x.RightId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(x => x.AccountRights).WithOne(x => x.Right).HasForeignKey(x => x.RightId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
