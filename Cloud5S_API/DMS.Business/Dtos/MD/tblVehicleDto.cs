using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.AD;
using System.ComponentModel;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblVehicleDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        public double UnladenWeight { get; set; }

        public string DriverUserName { get; set; }

        public string TypeCode { get; set; }

        public string UnitCode { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblAccountDto DefaultDriver { get; set; }

        public virtual tblVehicleTypeLiteDto VehicleType { get; set; }

        public virtual List<tblRfidDto> Rfids { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicle, tblVehicleDto>().ReverseMap();
        }
    }
    public class tblVehicleCreateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        public double UnladenWeight { get; set; }

        public string DriverUserName { get; set; }

        public string TypeCode { get; set; }

        public string UnitCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicle, tblVehicleCreateDto>().ReverseMap();
        }
    }

    public class tblVehicleUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public double Tonnage { get; set; }

        public double UnladenWeight { get; set; }

        public string DriverUserName { get; set; }

        public string TypeCode { get; set; }

        public string UnitCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicle, tblVehicleUpdateDto>().ReverseMap();
        }
    }

    public class tblVehicleExportDto : BaseMdDto
    {
        [Description("STT")]
        public int OrdinalNumber { get; set; }

        [Description("Loại phương tiện")]
        public string VehicleType { get; set; }

        [Description("Biển số xe")]
        public string VehicleCode { get; set; }

        [Description("Lái xe")]
        public string DriverName { get; set; }

        [Description("Trọng tải")]
        public double Tonnage { get; set; }

        [Description("Trọng lượng không tải")]
        public double UnladenWeight { get; set; }

        [Description("Đơn vị tính")]
        public string UnitCode { get; set; }

        [Description("Trạng thái")]
        public string State { get => this.IsActive == true ? "Đang hoạt động" : "Khóa"; }
    }
}
