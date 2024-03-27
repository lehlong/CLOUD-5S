using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;

namespace DMS.CORE.Configuration.AD
{
    public class tblAdAccountConfig : IEntityTypeConfiguration<tblAdAccount>
    {
        public void Configure(EntityTypeBuilder<tblAdAccount> builder)
        {
            builder.HasMany(x => x.Account_AccountGroups)
                .WithOne(g => g.Account)
                .HasForeignKey(x => x.UserName)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
