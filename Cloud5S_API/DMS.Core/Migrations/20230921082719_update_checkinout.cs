using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_checkinout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckInConfirm",
                table: "tblBuCurrentCheckIn");

            migrationBuilder.DropColumn(
                name: "CheckInNote",
                table: "tblBuCurrentCheckIn");

            migrationBuilder.DropColumn(
                name: "CheckInConfirm",
                table: "tblBuCheckInOut");

            migrationBuilder.DropColumn(
                name: "CheckInNote",
                table: "tblBuCheckInOut");

            migrationBuilder.DropColumn(
                name: "CheckOutConfirm",
                table: "tblBuCheckInOut");

            migrationBuilder.DropColumn(
                name: "CheckOutNote",
                table: "tblBuCheckInOut");

            migrationBuilder.AddColumn<string>(
                name: "RfId",
                table: "tblBuCurrentCheckIn",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RfId",
                table: "tblBuCurrentCheckIn");

            migrationBuilder.AddColumn<string>(
                name: "CheckInConfirm",
                table: "tblBuCurrentCheckIn",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckInNote",
                table: "tblBuCurrentCheckIn",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckInConfirm",
                table: "tblBuCheckInOut",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckInNote",
                table: "tblBuCheckInOut",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckOutConfirm",
                table: "tblBuCheckInOut",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckOutNote",
                table: "tblBuCheckInOut",
                type: "varchar(255)",
                nullable: true);
        }
    }
}
