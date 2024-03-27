using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class updateorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "tblSoOrder",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_AreaCode",
                table: "tblSoOrder",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_CompanyCode",
                table: "tblSoOrder",
                column: "CompanyCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdArea_AreaCode",
                table: "tblSoOrder",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdPartner_CompanyCode",
                table: "tblSoOrder",
                column: "CompanyCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdArea_AreaCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdPartner_CompanyCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_AreaCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_CompanyCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "tblSoOrder");
        }
    }
}
