using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class OrderScalePagedResponseDto : PagedResponseDto
    {
        public double TotalWeight { get; set; }
    }
}
