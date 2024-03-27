using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class cfg_orderbatch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "SumMoney",
                table: "tblSoOrderBatchDetail",
                type: "float",
                nullable: true,
                computedColumnSql: "Price * OrderNumber",
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "SumMoney",
                table: "tblSoOrderBatchDetail",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true,
                oldComputedColumnSql: "Price * OrderNumber");
        }
    }
}
