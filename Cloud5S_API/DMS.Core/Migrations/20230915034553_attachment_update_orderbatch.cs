using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class attachment_update_orderbatch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "tblSoOrder");

            migrationBuilder.AddColumn<Guid>(
                name: "ReferenceId",
                table: "tblSoOrderBatch",
                type: "uniqueidentifier",
                nullable: true,
                defaultValueSql: "NEWID()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "tblSoOrderBatch");

            migrationBuilder.AddColumn<Guid>(
                name: "ReferenceId",
                table: "tblSoOrder",
                type: "uniqueidentifier",
                nullable: true,
                defaultValueSql: "NEWID()");
        }
    }
}
