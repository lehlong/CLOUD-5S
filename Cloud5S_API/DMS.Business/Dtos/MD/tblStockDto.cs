using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblStockDto : BaseMdDto, IMapFrom, IDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Key]
        [Description("Mã kho")]
        public string Code { get; set; }

        [Description("Tên kho")]
        public string Name { get; set; }

        [Description("Tên đơn vị")]
        public string CompanyCode { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }

        public virtual tblCompanyDto Company { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdStock, tblStockDto>().ReverseMap();
        }
    }
    public class tblStockCreateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string CompanyCode { get; set; }
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdStock, tblStockCreateDto>().ReverseMap();
        }
    }

    public class tblStockUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string CompanyCode { get; set; }
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdStock, tblStockUpdateDto>().ReverseMap();
        }
    }

    public class tblStockExportDto : BaseMdDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Mã")]
        public string Code { get; set; }

        [Description("Tên Kho")]
        public string Name { get; set; }

        [Description("Đơn vị")]
        public string CompanyName { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }
    }
}
