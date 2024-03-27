using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_rfid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Vehicle",
                table: "tblBuCheckInOut",
                newName: "VehicleCode");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReferenceId",
                table: "tblBuCheckInOut",
                type: "uniqueidentifier",
                nullable: true,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdRfid",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdRfid", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdRfid_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCheckInOut_VehicleCode",
                table: "tblBuCheckInOut",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdRfid_VehicleCode",
                table: "tblMdRfid",
                column: "VehicleCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuCheckInOut_tblMdVehicle_VehicleCode",
                table: "tblBuCheckInOut",
                column: "VehicleCode",
                principalTable: "tblMdVehicle",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuCheckInOut_tblMdVehicle_VehicleCode",
                table: "tblBuCheckInOut");

            migrationBuilder.DropTable(
                name: "tblMdRfid");

            migrationBuilder.DropIndex(
                name: "IX_tblBuCheckInOut_VehicleCode",
                table: "tblBuCheckInOut");

            migrationBuilder.RenameColumn(
                name: "VehicleCode",
                table: "tblBuCheckInOut",
                newName: "Vehicle");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReferenceId",
                table: "tblBuCheckInOut",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true,
                oldDefaultValueSql: "NEWID()");
        }
    }
}
