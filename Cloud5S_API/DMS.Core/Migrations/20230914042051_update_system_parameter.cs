using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_system_parameter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "tblAdSystemParameter");

            migrationBuilder.AddColumn<string>(
                name: "DefaultItemExportCode",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultItemImportCode",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultItemExportCode",
                table: "tblAdSystemParameter");

            migrationBuilder.DropColumn(
                name: "DefaultItemImportCode",
                table: "tblAdSystemParameter");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblAdSystemParameter");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "tblAdSystemParameter",
                type: "nvarchar(50)",
                nullable: true);
        }
    }
}
