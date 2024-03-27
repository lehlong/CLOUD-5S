using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_system_parameter_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatch_tblMdUnit_UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatch_UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrderBatch");

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrderBatchDetail",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchDetail_UnitCode",
                table: "tblSoOrderBatchDetail",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatchDetail_tblMdUnit_UnitCode",
                table: "tblSoOrderBatchDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatchDetail_tblMdUnit_UnitCode",
                table: "tblSoOrderBatchDetail");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatchDetail_UnitCode",
                table: "tblSoOrderBatchDetail");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblSoOrderBatchDetail");

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblSoOrderBatch",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_UnitCode",
                table: "tblSoOrderBatch",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatch_tblMdUnit_UnitCode",
                table: "tblSoOrderBatch",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }
    }
}
