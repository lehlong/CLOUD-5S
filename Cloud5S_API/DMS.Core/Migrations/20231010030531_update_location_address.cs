using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_location_address : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DefaultPortName",
                table: "tblAdSystemParameter",
                newName: "PortName");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "tblMdCompany",
                type: "nvarchar(500)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PortAddress",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "PortAddress",
                table: "tblAdSystemParameter");

            migrationBuilder.RenameColumn(
                name: "PortName",
                table: "tblAdSystemParameter",
                newName: "DefaultPortName");
        }
    }
}
