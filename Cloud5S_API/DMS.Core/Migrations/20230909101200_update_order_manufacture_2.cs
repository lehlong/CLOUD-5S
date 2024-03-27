using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_order_manufacture_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblBuManufacture_ManufactureId",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ManufactureId",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "ManufactureId",
                table: "tblSoOrder");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode",
                unique: true,
                filter: "[OrderCode] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.AddColumn<Guid>(
                name: "ManufactureId",
                table: "tblSoOrder",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ManufactureId",
                table: "tblSoOrder",
                column: "ManufactureId",
                unique: true,
                filter: "[ManufactureId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblBuManufacture_ManufactureId",
                table: "tblSoOrder",
                column: "ManufactureId",
                principalTable: "tblBuManufacture",
                principalColumn: "Id");
        }
    }
}
