namespace DMS.CORE.Common
{
    public interface ISoftDeleteEntity
    {
        public bool? IsDeleted { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteBy { get; set; }
    }
}
