using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.BU;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblItemDto : BaseMdDto, IMapFrom, IDto
    {
        public int OrdinalNumber { get; set; }

        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public bool IsManufacture { get; set; }

        public virtual tblItemFormulaDto ItemFormula { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblItemTypeDto ItemType { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemDto>().ReverseMap();
        }
    }

    public class tblItemLiteDto : IMapFrom
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public bool IsManufacture { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblItemFormulaDto ItemFormula { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemLiteDto>().ReverseMap();
        }
    }

    public class tblItemCreateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public bool IsManufacture { get; set; }

        public virtual tblItemFormulaCreateDto ItemFormula { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemCreateDto>().ReverseMap();
        }
    }

    public class tblItemUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public bool IsManufacture { get; set; }

        public virtual tblItemFormulaCreateDto ItemFormula { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemUpdateDto>().ReverseMap();
        }
    }

    public class tblItemExportDto : BaseMdDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Nhóm sản phẩm")]
        public string ItemType { get; set; }

        [Description("Mã")]
        public string ItemCode { get; set; }

        [Description("Tên sản phẩm")]
        public string ItemName { get; set; }

        [Description("Đơn vị tính")]
        public string Unit { get; set; }

        [Description("Giá vốn")]
        public double CostPrice { get; set; }

        [Description("Giá bán")]
        public double? SellPrice { get; set; }

        public bool? IsMainObject { get; set; }

        [Description("TP Chính")]
        public int MainObject { get => this.IsMainObject == true ? 1 : 0; }

        public bool? IsQuantitative { get; set; }

        [Description("Định lượng")]
        public int Quantitative { get => this.IsQuantitative == true ? 1 : 0; }

        public bool? IsIngredient { get; set; }

        [Description("Nguyên liệu")]
        public int Ingredient { get => this.IsIngredient == true ? 1 : 0; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }
    }
}
