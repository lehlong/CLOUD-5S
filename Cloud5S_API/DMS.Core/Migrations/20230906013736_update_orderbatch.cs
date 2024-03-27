using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_orderbatch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomsDeclarationNumber",
                table: "tblSoOrderBatch",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeliveryNumber",
                table: "tblSoOrderBatch",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ShipCode",
                table: "tblSoOrderBatch",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VehicleNumber",
                table: "tblSoOrderBatch",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "tblSoOrderBatchVehicle",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderBatchCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderBatchVehicle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchVehicle_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchVehicle_tblSoOrderBatch_OrderBatchCode",
                        column: x => x.OrderBatchCode,
                        principalTable: "tblSoOrderBatch",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_ShipCode",
                table: "tblSoOrderBatch",
                column: "ShipCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchVehicle_OrderBatchCode",
                table: "tblSoOrderBatchVehicle",
                column: "OrderBatchCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchVehicle_VehicleCode",
                table: "tblSoOrderBatchVehicle",
                column: "VehicleCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatch_tblMdShip_ShipCode",
                table: "tblSoOrderBatch",
                column: "ShipCode",
                principalTable: "tblMdShip",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatch_tblMdShip_ShipCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropTable(
                name: "tblSoOrderBatchVehicle");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatch_ShipCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "CustomsDeclarationNumber",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "DeliveryNumber",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "ShipCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "VehicleNumber",
                table: "tblSoOrderBatch");
        }
    }
}
