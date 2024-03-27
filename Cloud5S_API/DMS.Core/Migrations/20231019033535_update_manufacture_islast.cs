using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_manufacture_islast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLast",
                table: "tblBuStockImportDetail",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "ReverseNumber",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsLast",
                table: "tblBuStockExportDetail",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "ReverseNumber",
                table: "tblBuStockExportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLast",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "ReverseNumber",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "IsLast",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropColumn(
                name: "ReverseNumber",
                table: "tblBuStockExportDetail");
        }
    }
}
