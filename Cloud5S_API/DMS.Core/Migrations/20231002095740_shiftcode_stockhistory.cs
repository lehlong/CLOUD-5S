using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class shiftcode_stockhistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkingShiftCode",
                table: "tblBuStockItemHistory",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemHistory_WorkingShiftCode",
                table: "tblBuStockItemHistory",
                column: "WorkingShiftCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItemHistory_tblMdWorkingShift_WorkingShiftCode",
                table: "tblBuStockItemHistory",
                column: "WorkingShiftCode",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItemHistory_tblMdWorkingShift_WorkingShiftCode",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItemHistory_WorkingShiftCode",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropColumn(
                name: "WorkingShiftCode",
                table: "tblBuStockItemHistory");
        }
    }
}
