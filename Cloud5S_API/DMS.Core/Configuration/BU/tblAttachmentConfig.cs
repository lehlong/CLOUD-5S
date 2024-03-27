using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Entities.BU;

namespace DMS.CORE.Configuration.BU
{
    public class tblAttachmentConfig : IEntityTypeConfiguration<tblBuAttachment>
    {
        public void Configure(EntityTypeBuilder<tblBuAttachment> builder)
        {
        }
    }
}
