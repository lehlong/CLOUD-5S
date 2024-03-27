using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblItemTypeConfig : IEntityTypeConfiguration<tblMdItemType>
    {
        public void Configure(EntityTypeBuilder<tblMdItemType> builder)
        {
            builder.HasMany<tblMdItem>(it => it.ListItem)
                .WithOne(i => i.ItemType)
                .HasForeignKey(i => i.TypeCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
