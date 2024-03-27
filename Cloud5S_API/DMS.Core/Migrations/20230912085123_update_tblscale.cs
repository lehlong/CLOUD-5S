using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblscale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemMoney",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "CustomerAddress",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "CustomerPhone",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "Exchange",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemImpurities",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemNumber",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemPercentageOfImpurities",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemPrice",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ItemProportion",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "Seal",
                table: "tblSoScale");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerAddress",
                table: "tblSoScale",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "tblSoScale",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CustomerPhone",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Exchange",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemImpurities",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "tblSoScale",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemNumber",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemPercentageOfImpurities",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemPrice",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemProportion",
                table: "tblSoScale",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Seal",
                table: "tblSoScale",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ItemMoney",
                table: "tblSoScale",
                type: "float",
                nullable: true,
                computedColumnSql: "ItemPrice * ItemNumber");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale",
                column: "AreaCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");
        }
    }
}
