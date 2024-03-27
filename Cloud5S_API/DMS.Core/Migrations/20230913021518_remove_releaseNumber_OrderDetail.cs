using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class remove_releaseNumber_OrderDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SumMoney",
                table: "tblSoOrderDetail");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "tblSoOrderDetail");

            migrationBuilder.DropColumn(
                name: "ReleaseNumber",
                table: "tblSoOrderDetail");

            migrationBuilder.RenameColumn(
                name: "OrderNumber",
                table: "tblSoOrderDetail",
                newName: "Number");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Number",
                table: "tblSoOrderDetail",
                newName: "OrderNumber");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "tblSoOrderDetail",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ReleaseNumber",
                table: "tblSoOrderDetail",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "SumMoney",
                table: "tblSoOrderDetail",
                type: "float",
                nullable: true,
                computedColumnSql: "ReleaseNumber*Price");
        }
    }
}
