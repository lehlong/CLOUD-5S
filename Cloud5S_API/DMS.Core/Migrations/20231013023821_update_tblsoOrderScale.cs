using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblsoOrderScale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BillNumber",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceSymbol",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceTemplate",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillNumber",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "InvoiceSymbol",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "InvoiceTemplate",
                table: "tblSoScale");
        }
    }
}
