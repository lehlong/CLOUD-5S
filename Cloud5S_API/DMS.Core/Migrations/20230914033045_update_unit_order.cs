using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_unit_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrderBatch",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_UnitCode",
                table: "tblSoScale",
                column: "UnitCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_UnitCode",
                table: "tblSoOrderBatch",
                column: "UnitCode");

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

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatch_tblMdUnit_UnitCode",
                table: "tblSoOrderBatch",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdUnit_UnitCode",
                table: "tblSoScale",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdUnit_UnitCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatch_tblMdUnit_UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdUnit_UnitCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_UnitCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatch_UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_UnitCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrder");
        }
    }
}
