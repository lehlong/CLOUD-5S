using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class managerFile_search_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_tblBuFolder_CreateBy",
                table: "tblBuFolder",
                column: "CreateBy");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuFolder_tblAdAccount_CreateBy",
                table: "tblBuFolder",
                column: "CreateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuFolder_tblAdAccount_CreateBy",
                table: "tblBuFolder");

            migrationBuilder.DropIndex(
                name: "IX_tblBuFolder_CreateBy",
                table: "tblBuFolder");
        }
    }
}
