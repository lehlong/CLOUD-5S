namespace DMS.CORE.Common
{
    public class ReferenceEntity : BaseEntity, IReferenceEntity
    {
        public Guid? ReferenceId { get; set; } = Guid.NewGuid();
    }
}
