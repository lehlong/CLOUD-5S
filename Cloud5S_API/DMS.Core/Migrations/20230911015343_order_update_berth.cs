using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class order_update_berth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BerthCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CargoCompartmentNumber",
                table: "tblSoOrder",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShipCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_BerthCode",
                table: "tblSoOrder",
                column: "BerthCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ShipCode",
                table: "tblSoOrder",
                column: "ShipCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdBerth_BerthCode",
                table: "tblSoOrder",
                column: "BerthCode",
                principalTable: "tblMdBerth",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdShip_ShipCode",
                table: "tblSoOrder",
                column: "ShipCode",
                principalTable: "tblMdShip",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdBerth_BerthCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdShip_ShipCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_BerthCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ShipCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "BerthCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "CargoCompartmentNumber",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "ShipCode",
                table: "tblSoOrder");
        }
    }
}
