using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using AutoMapper;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDeviceDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string TypeCode { get; set; }

        public string GroupCode { get; set; }

        public string IpAddress { get; set; }

        public int IpPort { get; set; }

        public int DevicePort { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public virtual tblDeviceTypeLiteDto Type { get; set; }

        public virtual tblDeviceGroupLiteDto Group { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDevice, tblDeviceDto>().ReverseMap();
        }
    }

    public class tblDeviceLiteDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string TypeCode { get; set; }

        public string GroupCode { get; set; }

        public string IpAddress { get; set; }

        public int IpPort { get; set; }

        public int DevicePort { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDevice, tblDeviceLiteDto>().ReverseMap();
        }
    }
}
