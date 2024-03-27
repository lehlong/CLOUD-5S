using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblTransferLog_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreateBy",
                table: "tblBuStockItemTransferLog",
                type: "nvarchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "tblBuStockItemTransferLog",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "tblBuStockItemTransferLog",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateBy",
                table: "tblBuStockItemTransferLog",
                type: "nvarchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "tblBuStockItemTransferLog",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropColumn(
                name: "UpdateBy",
                table: "tblBuStockItemTransferLog");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "tblBuStockItemTransferLog");
        }
    }
}
