using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_orderbatch_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VehicleNumber",
                table: "tblSoOrderBatch",
                newName: "CompleteDeliveryNumber");

            migrationBuilder.RenameColumn(
                name: "CustomsDeclarationNumber",
                table: "tblSoOrderBatch",
                newName: "CustomsDeclaration");

            migrationBuilder.AddColumn<double>(
                name: "CompleteNumber",
                table: "tblSoOrderBatch",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ExpectNumber",
                table: "tblSoOrderBatch",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ReleaseNumber",
                table: "tblSoOrderBatch",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompleteNumber",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "ExpectNumber",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "ReleaseNumber",
                table: "tblSoOrderBatch");

            migrationBuilder.RenameColumn(
                name: "CustomsDeclaration",
                table: "tblSoOrderBatch",
                newName: "CustomsDeclarationNumber");

            migrationBuilder.RenameColumn(
                name: "CompleteDeliveryNumber",
                table: "tblSoOrderBatch",
                newName: "VehicleNumber");
        }
    }
}
