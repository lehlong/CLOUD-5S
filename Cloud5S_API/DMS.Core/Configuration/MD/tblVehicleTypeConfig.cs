using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblVehicleTypeConfig : IEntityTypeConfiguration<tblMdVehicleType>
    {
        public void Configure(EntityTypeBuilder<tblMdVehicleType> builder)
        {
            builder.HasMany<tblMdVehicle>(vt => vt.ListVehicle)
                .WithOne(v => v.VehicleType)
                .HasForeignKey(vt => vt.TypeCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
