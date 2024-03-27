using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class contract_referenceId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeleteBy",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tblSoScale");

            migrationBuilder.AddColumn<Guid>(
                name: "ReferenceId",
                table: "tblSoScale",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReferenceId",
                table: "tblBuContract",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "tblBuContract");

            migrationBuilder.AddColumn<string>(
                name: "DeleteBy",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "tblSoScale",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tblSoScale",
                type: "bit",
                nullable: true);
        }
    }
}
