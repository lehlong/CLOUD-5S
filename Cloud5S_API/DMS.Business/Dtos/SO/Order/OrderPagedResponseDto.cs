using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class OrderPagedResponseDto : PagedResponseDto
    {
        public int Number { get; set; }
        public double Quantity { get; set; }
        public double ExportedQuantity { get; set; }
    }

    public class OrderImportResponseDto
    {
        public OrderPagedResponseDto Orders { get; set; }

        public List<tblOrderPourSectionDto> Sections { get; set; }
    }
}
