using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_checkinout_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "tblBuCheckInOut",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_VehicleCode",
                table: "tblSoScale",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCheckInOut_OrderCode",
                table: "tblBuCheckInOut",
                column: "OrderCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuCheckInOut_tblSoOrder_OrderCode",
                table: "tblBuCheckInOut",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdVehicle_VehicleCode",
                table: "tblSoScale",
                column: "VehicleCode",
                principalTable: "tblMdVehicle",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuCheckInOut_tblSoOrder_OrderCode",
                table: "tblBuCheckInOut");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdVehicle_VehicleCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_VehicleCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblBuCheckInOut_OrderCode",
                table: "tblBuCheckInOut");

            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "tblBuCheckInOut");
        }
    }
}
