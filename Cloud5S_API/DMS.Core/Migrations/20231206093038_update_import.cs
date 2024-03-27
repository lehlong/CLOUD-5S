using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_import : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblBuStockImport_ImportCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblBuStockImport_ImportCode",
                table: "tblBuStockImportDetail",
                column: "ImportCode",
                principalTable: "tblBuStockImport",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblBuStockImport_ImportCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblBuStockImport_ImportCode",
                table: "tblBuStockImportDetail",
                column: "ImportCode",
                principalTable: "tblBuStockImport",
                principalColumn: "Code");
        }
    }
}
