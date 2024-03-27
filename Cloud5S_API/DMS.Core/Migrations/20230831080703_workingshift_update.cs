using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class workingshift_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "FromDate",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "ToDate",
                table: "tblMdWorkingShift");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "tblMdWorkingShift",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tblMdWorkingShift",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "FromHour",
                table: "tblMdWorkingShift",
                type: "TIME",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<int>(
                name: "OrdinalNumber",
                table: "tblMdWorkingShift",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ToHour",
                table: "tblMdWorkingShift",
                type: "TIME",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "FromHour",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "OrdinalNumber",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "ToHour",
                table: "tblMdWorkingShift");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "tblMdWorkingShift",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "FromDate",
                table: "tblMdWorkingShift",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblMdWorkingShift",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ToDate",
                table: "tblMdWorkingShift",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift",
                column: "Code");
        }
    }
}
