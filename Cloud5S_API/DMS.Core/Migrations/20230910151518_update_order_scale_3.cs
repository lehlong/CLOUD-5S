using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_order_scale_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblSoOrder_OrderCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_OrderCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "tblSoScale");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode",
                unique: true,
                filter: "[ScaleCode] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_OrderCode",
                table: "tblSoScale",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblSoOrder_OrderCode",
                table: "tblSoScale",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");
        }
    }
}
