using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;

namespace DMS.CORE.Configuration.AD
{
    public class tblAdAccount_AccountGroupConfig : IEntityTypeConfiguration<tblAdAccount_AccountGroup>
    {
        public void Configure(EntityTypeBuilder<tblAdAccount_AccountGroup> builder)
        {
            builder.HasKey(x => new { x.UserName, x.GroupId });
        }
    }
}
