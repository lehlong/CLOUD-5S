using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class export_7h_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ProcessDate7H",
                table: "tblBuStockItemHistory",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "WorkingShiftCode7H",
                table: "tblBuStockItemHistory",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ImportDate7H",
                table: "tblBuStockImport",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftCode7H",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExportDate7H",
                table: "tblBuStockExport",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftCode7H",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemHistory_WorkingShiftCode7H",
                table: "tblBuStockItemHistory",
                column: "WorkingShiftCode7H");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_ShiftCode7H",
                table: "tblBuStockImport",
                column: "ShiftCode7H");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_ShiftCode7H",
                table: "tblBuStockExport",
                column: "ShiftCode7H");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdWorkingShift_ShiftCode7H",
                table: "tblBuStockExport",
                column: "ShiftCode7H",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdWorkingShift_ShiftCode7H",
                table: "tblBuStockImport",
                column: "ShiftCode7H",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItemHistory_tblMdWorkingShift_WorkingShiftCode7H",
                table: "tblBuStockItemHistory",
                column: "WorkingShiftCode7H",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdWorkingShift_ShiftCode7H",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdWorkingShift_ShiftCode7H",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItemHistory_tblMdWorkingShift_WorkingShiftCode7H",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItemHistory_WorkingShiftCode7H",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_ShiftCode7H",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_ShiftCode7H",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "ProcessDate7H",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropColumn(
                name: "WorkingShiftCode7H",
                table: "tblBuStockItemHistory");

            migrationBuilder.DropColumn(
                name: "ImportDate7H",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ShiftCode7H",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ExportDate7H",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "ShiftCode7H",
                table: "tblBuStockExport");
        }
    }
}
