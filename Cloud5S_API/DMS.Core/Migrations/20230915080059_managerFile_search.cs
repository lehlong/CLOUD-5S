using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class managerFile_search : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_tblBuAttachment_CreateBy",
                table: "tblBuAttachment",
                column: "CreateBy");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuAttachment_tblAdAccount_CreateBy",
                table: "tblBuAttachment",
                column: "CreateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuAttachment_tblAdAccount_CreateBy",
                table: "tblBuAttachment");

            migrationBuilder.DropIndex(
                name: "IX_tblBuAttachment_CreateBy",
                table: "tblBuAttachment");
        }
    }
}
