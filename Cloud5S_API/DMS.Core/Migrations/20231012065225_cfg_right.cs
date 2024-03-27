using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class cfg_right : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
            //    table: "tblAdAccountGroupRight");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
                table: "tblAdAccountGroupRight",
                column: "RightId",
                principalTable: "tblAdRight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
            //    table: "tblAdAccountGroupRight");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
                table: "tblAdAccountGroupRight",
                column: "RightId",
                principalTable: "tblAdRight",
                principalColumn: "Id");
        }
    }
}
