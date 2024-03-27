using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_db_261023 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultItemExportCode",
                table: "tblAdSystemParameter");

            migrationBuilder.DropColumn(
                name: "DefaultItemImportCode",
                table: "tblAdSystemParameter");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
