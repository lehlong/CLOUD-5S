using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class attachment_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "tblBuAttachment");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "tblBuAttachment",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "tblBuAttachment",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "tblBuAttachment",
                type: "varchar(255)",
                nullable: true);
        }
    }
}
