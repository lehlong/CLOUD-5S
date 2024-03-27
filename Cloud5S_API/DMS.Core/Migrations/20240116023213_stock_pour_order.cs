using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class stock_pour_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "tblBuStockItemTransferLog",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "tblBuStockItemDetail",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderCodeFromStock",
                table: "tblBuManufacture",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_OrderCode",
                table: "tblBuStockItemTransferLog",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_OrderCode",
                table: "tblBuStockItemDetail",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCodeFromStock",
                table: "tblBuManufacture",
                column: "OrderCodeFromStock");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCodeFromStock",
                table: "tblBuManufacture",
                column: "OrderCodeFromStock",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItemDetail_tblSoOrder_OrderCode",
                table: "tblBuStockItemDetail",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItemTransferLog_tblSoOrder_OrderCode",
                table: "tblBuStockItemTransferLog",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCodeFromStock",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItemDetail_tblSoOrder_OrderCode",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItemTransferLog_tblSoOrder_OrderCode",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItemTransferLog_OrderCode",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItemDetail_OrderCode",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_OrderCodeFromStock",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropColumn(
                name: "OrderCodeFromStock",
                table: "tblBuManufacture");
        }
    }
}
