using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblSoExport_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StationCode",
                table: "tblSoExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_StationCode",
                table: "tblSoExport",
                column: "StationCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoExport_tblMdPurchasingStation_StationCode",
                table: "tblSoExport",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoExport_tblMdPurchasingStation_StationCode",
                table: "tblSoExport");

            migrationBuilder.DropIndex(
                name: "IX_tblSoExport_StationCode",
                table: "tblSoExport");

            migrationBuilder.DropColumn(
                name: "StationCode",
                table: "tblSoExport");
        }
    }
}
