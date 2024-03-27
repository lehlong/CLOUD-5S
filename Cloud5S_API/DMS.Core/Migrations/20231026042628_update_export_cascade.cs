using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_export_cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblBuStockExport_ExportCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropColumn(
                name: "ReverseNumber",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "ReverseNumber",
                table: "tblBuStockExportDetail");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblBuStockExport_ExportCode",
                table: "tblBuStockExportDetail",
                column: "ExportCode",
                principalTable: "tblBuStockExport",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblBuStockExport_ExportCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.AddColumn<double>(
                name: "ReverseNumber",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ReverseNumber",
                table: "tblBuStockExportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblBuStockExport_ExportCode",
                table: "tblBuStockExportDetail",
                column: "ExportCode",
                principalTable: "tblBuStockExport",
                principalColumn: "Code");
        }
    }
}
