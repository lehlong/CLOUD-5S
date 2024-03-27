using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_import_export_orderstock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderCodeFromStock",
                table: "tblBuStockImport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderCodeFromStock",
                table: "tblBuStockExport",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderCodeFromStock",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "OrderCodeFromStock",
                table: "tblBuStockExport");
        }
    }
}
