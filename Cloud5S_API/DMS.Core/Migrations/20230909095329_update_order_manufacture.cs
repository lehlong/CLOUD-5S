using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_order_manufacture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleId",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScaleImage_tblSoScale_ScaleId",
                table: "tblSoScaleImage");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScaleImage_ScaleId",
                table: "tblSoScaleImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblSoScale",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ScaleId",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "ScaleId",
                table: "tblSoScaleImage");

            migrationBuilder.RenameColumn(
                name: "ScaleId",
                table: "tblSoOrder",
                newName: "ManufactureId");

            migrationBuilder.AddColumn<string>(
                name: "ScaleCode",
                table: "tblSoScaleImage",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SyncCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScaleCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblSoScale",
                table: "tblSoScale",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScaleImage_ScaleCode",
                table: "tblSoScaleImage",
                column: "ScaleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ManufactureId",
                table: "tblSoOrder",
                column: "ManufactureId",
                unique: true,
                filter: "[ManufactureId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblBuManufacture_ManufactureId",
                table: "tblSoOrder",
                column: "ManufactureId",
                principalTable: "tblBuManufacture",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode",
                principalTable: "tblSoScale",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScaleImage_tblSoScale_ScaleCode",
                table: "tblSoScaleImage",
                column: "ScaleCode",
                principalTable: "tblSoScale",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblBuManufacture_ManufactureId",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScaleImage_tblSoScale_ScaleCode",
                table: "tblSoScaleImage");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScaleImage_ScaleCode",
                table: "tblSoScaleImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblSoScale",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ManufactureId",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "ScaleCode",
                table: "tblSoScaleImage");

            migrationBuilder.DropColumn(
                name: "SyncCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.RenameColumn(
                name: "ManufactureId",
                table: "tblSoOrder",
                newName: "ScaleId");

            migrationBuilder.AddColumn<Guid>(
                name: "ScaleId",
                table: "tblSoScaleImage",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblSoScale",
                table: "tblSoScale",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScaleImage_ScaleId",
                table: "tblSoScaleImage",
                column: "ScaleId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ScaleId",
                table: "tblSoOrder",
                column: "ScaleId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblSoOrder_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleId",
                table: "tblSoOrder",
                column: "ScaleId",
                principalTable: "tblSoScale",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScaleImage_tblSoScale_ScaleId",
                table: "tblSoScaleImage",
                column: "ScaleId",
                principalTable: "tblSoScale",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
