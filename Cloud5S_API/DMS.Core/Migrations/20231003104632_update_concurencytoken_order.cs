using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_concurencytoken_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblSoScale",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblSoOrderDetail",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblSoOrder",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockItemHistory",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockImportDetail",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockImport",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockExportDetail",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuStockExport",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyToken",
                table: "tblBuManufacture",
                type: "rowversion",
                rowVersion: true,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblSoOrderDetail");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "ConcurrencyToken",
                table: "tblBuManufacture");
        }
    }
}
