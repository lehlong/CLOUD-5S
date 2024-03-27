using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblVehicle_Unit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblMdVehicle",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblMdVehicle_UnitCode",
                table: "tblMdVehicle",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblMdVehicle_tblMdUnit_UnitCode",
                table: "tblMdVehicle",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblMdVehicle_tblMdUnit_UnitCode",
                table: "tblMdVehicle");

            migrationBuilder.DropIndex(
                name: "IX_tblMdVehicle_UnitCode",
                table: "tblMdVehicle");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblMdVehicle");
        }
    }
}
