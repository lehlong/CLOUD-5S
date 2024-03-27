using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAdBusinessDto : BaseAdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã doanh nghiệp")]
        public string Code { get; set; }

        [Description("Tên doanh nghiệp")]
        public string Name { get; set; }

        [Description("Tên ngắn gọn")]
        public string ShortName { get; set; }

        [Description("Mã số thuế")]
        public string TaxCode { get; set; }

        [Description("Email")]
        public string Email { get; set; }

        [Description("Số điện thoại")]
        public string Phone { get; set; }

        [Description("Địa chỉ")]
        public string Address { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdBusiness, tblAdBusinessDto>().ReverseMap();
        }
    }
}
