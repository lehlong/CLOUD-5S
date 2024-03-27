using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_system_parameter_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultCementCode",
                table: "tblAdSystemParameter");

            migrationBuilder.DropColumn(
                name: "DefaultStockCode",
                table: "tblAdSystemParameter");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultCementCode",
                table: "tblAdSystemParameter",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultStockCode",
                table: "tblAdSystemParameter",
                type: "varchar(50)",
                nullable: true);
        }
    }
}
