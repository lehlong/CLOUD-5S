using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.BU
{
    public class tblCommentConfig : IEntityTypeConfiguration<tblBuComment>
    {
        public void Configure(EntityTypeBuilder<tblBuComment> builder)
        {
            builder.HasMany(x => x.Replies)
                .WithOne(x => x.PComment)
                .HasForeignKey(x => x.PId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
