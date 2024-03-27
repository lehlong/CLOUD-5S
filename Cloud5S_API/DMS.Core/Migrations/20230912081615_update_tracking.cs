using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "tblMdTracking",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblMdTracking_OrderCode",
                table: "tblMdTracking",
                column: "OrderCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblMdTracking_tblSoOrder_OrderCode",
                table: "tblMdTracking",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblMdTracking_tblSoOrder_OrderCode",
                table: "tblMdTracking");

            migrationBuilder.DropIndex(
                name: "IX_tblMdTracking_OrderCode",
                table: "tblMdTracking");

            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "tblMdTracking");
        }
    }
}
