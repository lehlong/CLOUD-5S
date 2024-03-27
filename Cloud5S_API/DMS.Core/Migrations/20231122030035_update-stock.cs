using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class updatestock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockExport");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockImportDetail",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockExport",
                type: "rowversion",
                rowVersion: true,
                nullable: true);
        }
    }
}
