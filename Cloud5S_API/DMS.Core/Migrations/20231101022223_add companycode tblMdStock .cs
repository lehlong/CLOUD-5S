using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class addcompanycodetblMdStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyCode",
                table: "tblMdStock",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblMdStock_CompanyCode",
                table: "tblMdStock",
                column: "CompanyCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblMdStock_tblMdCompany_CompanyCode",
                table: "tblMdStock",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblMdStock_tblMdCompany_CompanyCode",
                table: "tblMdStock");

            migrationBuilder.DropIndex(
                name: "IX_tblMdStock_CompanyCode",
                table: "tblMdStock");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "tblMdStock");
        }
    }
}
