using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DMS.Core.Models.MD;
using System.Reflection.Emit;

namespace DMS.Core.Configuration.MD
{
    public class T_MD_VEHICLE_Config : IEntityTypeConfiguration<T_MD_VEHICLE>
    {
        public void Configure(EntityTypeBuilder<T_MD_VEHICLE> builder)
        {
            builder.HasMany(e => e.VehicleCompartment).WithOne(e => e.Vehicle)
                .HasForeignKey(e => e.VEHICLE_CODE).HasPrincipalKey(e => e.CODE);
        }
    }
}
