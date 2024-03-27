using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblscale_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale",
                column: "AreaCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblSoScale");
        }
    }
}
