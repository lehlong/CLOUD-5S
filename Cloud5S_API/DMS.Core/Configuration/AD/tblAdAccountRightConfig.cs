using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;

namespace DMS.CORE.Configuration.AD
{
    public class tblAdAccountRightConfig : IEntityTypeConfiguration<tblAdAccountRight>
    {
        public void Configure(EntityTypeBuilder<tblAdAccountRight> builder)
        {
            builder.HasKey(x => new { x.UserName, x.RightId });
        }
    }
}
