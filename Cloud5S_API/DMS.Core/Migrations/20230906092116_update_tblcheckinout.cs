using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblcheckinout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            ////migrationBuilder.DropForeignKey(
            ////    name: "FK_tblBuCheckInOut_tblMdVehicle_VehicleCode",
            ////    table: "tblBuCheckInOut");

            //migrationBuilder.DropIndex(
            //    name: "IX_tblBuCheckInOut_VehicleCode",
            //    table: "tblBuCheckInOut");

            migrationBuilder.AddColumn<string>(
                name: "RfId",
                table: "tblBuCheckInOut",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RfId",
                table: "tblBuCheckInOut");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblBuCheckInOut_VehicleCode",
            //    table: "tblBuCheckInOut",
            //    column: "VehicleCode");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_tblBuCheckInOut_tblMdVehicle_VehicleCode",
            //    table: "tblBuCheckInOut",
            //    column: "VehicleCode",
            //    principalTable: "tblMdVehicle",
            //    principalColumn: "Code");
        }
    }
}
