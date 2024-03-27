namespace DMS.BUSINESS.Dtos.Common
{
    public class SoftDeleteBaseDto : BaseDto
    {
        public bool? IsDeleted { get; set; }
    }
}
