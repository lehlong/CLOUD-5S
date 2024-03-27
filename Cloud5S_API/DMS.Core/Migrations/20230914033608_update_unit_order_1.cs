using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_unit_order_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdUnit_UnitCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_UnitCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrder");

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrderDetail",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderDetail_UnitCode",
                table: "tblSoOrderDetail",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderDetail_tblMdUnit_UnitCode",
                table: "tblSoOrderDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderDetail_tblMdUnit_UnitCode",
                table: "tblSoOrderDetail");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderDetail_UnitCode",
                table: "tblSoOrderDetail");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrderDetail");

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_UnitCode",
                table: "tblSoOrder",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdUnit_UnitCode",
                table: "tblSoOrder",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }
    }
}
