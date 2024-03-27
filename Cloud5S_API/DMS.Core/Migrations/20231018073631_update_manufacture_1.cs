using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_manufacture_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChoppingNumber",
                table: "tblBuManufacture");

            migrationBuilder.RenameColumn(
                name: "PourNumber",
                table: "tblBuManufacture",
                newName: "Amount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "tblBuManufacture",
                newName: "PourNumber");

            migrationBuilder.AddColumn<double>(
                name: "ChoppingNumber",
                table: "tblBuManufacture",
                type: "float",
                nullable: true);
        }
    }
}
