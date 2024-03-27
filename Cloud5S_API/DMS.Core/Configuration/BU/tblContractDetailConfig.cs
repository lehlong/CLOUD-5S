using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblContractDetailConfig : IEntityTypeConfiguration<tblBuContractDetail>
    {
        public void Configure(EntityTypeBuilder<tblBuContractDetail> builder)
        {
            builder.Property(e => e.SumMoney).HasComputedColumnSql("OrderNumber*Price");
        }
    }

    public class tblContractConfig : IEntityTypeConfiguration<tblBuContract>
    {
        public void Configure(EntityTypeBuilder<tblBuContract> builder)
        {
            builder.HasMany(x=>x.Details).WithOne(x=>x.Contract).HasForeignKey(x=>x.ContractCode).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.ReferenceId).HasDefaultValueSql("NEWID()");
        }
    }

}
