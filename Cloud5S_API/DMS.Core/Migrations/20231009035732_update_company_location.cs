using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_company_location : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "tblAdSystemParameter",
                newName: "PortLongitude");

            migrationBuilder.RenameColumn(
                name: "Latitude",
                table: "tblAdSystemParameter",
                newName: "PortLatitude");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "tblMdCompany",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "tblMdCompany",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "tblMdCompany");

            migrationBuilder.RenameColumn(
                name: "PortLongitude",
                table: "tblAdSystemParameter",
                newName: "Longitude");

            migrationBuilder.RenameColumn(
                name: "PortLatitude",
                table: "tblAdSystemParameter",
                newName: "Latitude");
        }
    }
}
