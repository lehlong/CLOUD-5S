using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblmdStockItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PourLineCode",
                table: "tblBuStockItem",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PourSectionCode",
                table: "tblBuStockItem",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItem_PourLineCode",
                table: "tblBuStockItem",
                column: "PourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItem_PourSectionCode",
                table: "tblBuStockItem",
                column: "PourSectionCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItem_tblMdPourLine_PourLineCode",
                table: "tblBuStockItem",
                column: "PourLineCode",
                principalTable: "tblMdPourLine",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItem_tblMdPourSection_PourSectionCode",
                table: "tblBuStockItem",
                column: "PourSectionCode",
                principalTable: "tblMdPourSection",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItem_tblMdPourLine_PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItem_tblMdPourSection_PourSectionCode",
                table: "tblBuStockItem");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItem_PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItem_PourSectionCode",
                table: "tblBuStockItem");

            migrationBuilder.DropColumn(
                name: "PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropColumn(
                name: "PourSectionCode",
                table: "tblBuStockItem");
        }
    }
}
