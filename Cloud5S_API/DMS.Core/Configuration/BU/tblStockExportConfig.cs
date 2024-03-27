using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblStockExportConfig : IEntityTypeConfiguration<tblBuStockExport>
    {
        public void Configure(EntityTypeBuilder<tblBuStockExport> builder)
        {
            builder.HasMany(x=>x.ExportDetails).WithOne(x=>x.Export).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
