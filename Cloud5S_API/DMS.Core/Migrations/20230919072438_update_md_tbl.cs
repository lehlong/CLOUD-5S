using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_md_tbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdVehicleType");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdVehicleType");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdVehicleType");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdVehicle");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdVehicle");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdVehicle");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdUnit");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdUnit");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdUnit");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdTransportAgency");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdTransportAgency");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdTransportAgency");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdStock");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdStock");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdStock");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdShip");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdShip");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdShip");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdRfid");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdRfid");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdRfid");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdPricePolicy");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdPricePolicy");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdPricePolicy");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdPourSection");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdPourSection");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdPourSection");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdPourLine");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdPourLine");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdPourLine");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdPayType");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdPayType");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdPayType");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdPartner");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdPartner");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdPartner");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdOrderType");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdOrderType");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdOrderType");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdItemType");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdItemType");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdItemType");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdItem");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdItem");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdItem");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdDeviceType");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdDeviceType");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdDeviceType");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdDeviceGroup");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdDeviceGroup");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdDeviceGroup");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdDevice");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdDevice");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdDevice");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdDepartment");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdDepartment");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdDepartment");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdCompanyInfo");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdCompanyInfo");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdCompanyInfo");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdChipper");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdChipper");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdChipper");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdBerth");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdBerth");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdBerth");

            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblMdArea");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblMdArea");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblMdArea");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdWorkingShift",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdWorkingShift",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdWorkingShift",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdVehicleType",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdVehicleType",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdVehicleType",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdVehicle",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdVehicle",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdVehicle",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdUnit",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdUnit",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdUnit",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdTransportAgency",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdTransportAgency",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdTransportAgency",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdStock",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdStock",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdStock",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdShip",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdShip",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdShip",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdRfid",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdRfid",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdRfid",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdPricePolicy",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdPricePolicy",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdPricePolicy",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdPourSection",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdPourSection",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdPourSection",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdPourLine",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdPourLine",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdPourLine",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdPayType",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdPayType",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdPayType",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdPartner",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdPartner",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdPartner",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdOrderType",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdOrderType",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdOrderType",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdItemType",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdItemType",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdItemType",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdItem",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdItem",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdItem",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdDeviceType",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdDeviceType",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdDeviceType",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdDeviceGroup",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdDeviceGroup",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdDeviceGroup",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdDevice",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdDevice",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdDevice",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdDepartment",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdDepartment",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdDepartment",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdCompanyInfo",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdCompanyInfo",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdCompanyInfo",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdCompany",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdCompany",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdCompany",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdChipper",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdChipper",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdChipper",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdBerth",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdBerth",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdBerth",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblMdArea",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblMdArea",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblMdArea",
                type: "bit",
                nullable: true);
        }
    }
}
