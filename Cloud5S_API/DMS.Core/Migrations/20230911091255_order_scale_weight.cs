using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class order_scale_weight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "tblSoScale",
                type: "float",
                nullable: true,
                computedColumnSql: "Weight2 - Weight1",
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "tblSoScale",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true,
                oldComputedColumnSql: "Weight2 - Weight1");
        }
    }
}
