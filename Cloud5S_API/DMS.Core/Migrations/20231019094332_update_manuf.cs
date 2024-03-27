using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_manuf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreateBy",
                table: "tblBuStockItemDetail",
                type: "nvarchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "tblBuStockItemDetail",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "tblBuStockItemDetail",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateBy",
                table: "tblBuStockItemDetail",
                type: "nvarchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "tblBuStockItemDetail",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropColumn(
                name: "UpdateBy",
                table: "tblBuStockItemDetail");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "tblBuStockItemDetail");
        }
    }
}
