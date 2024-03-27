using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_manufacturetbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdChipper",
                table: "tblMdChipper");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "tblMdChipper");

            migrationBuilder.AddColumn<string>(
                name: "WorkingShiftCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "tblMdWorkingShift",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "tblMdChipper",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift",
                column: "Code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdChipper",
                table: "tblMdChipper",
                column: "Code");

            migrationBuilder.CreateTable(
                name: "tblBuManufacture",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ProcessType = table.Column<string>(type: "varchar(50)", nullable: true),
                    ChipperCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourSectionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourLineCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PourWorkingShiftCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ProcessDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessWorkingShiftCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuManufacture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblMdChipper_ChipperCode",
                        column: x => x.ChipperCode,
                        principalTable: "tblMdChipper",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblMdPourLine_PourLineCode",
                        column: x => x.PourLineCode,
                        principalTable: "tblMdPourLine",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblMdPourSection_PourSectionCode",
                        column: x => x.PourSectionCode,
                        principalTable: "tblMdPourSection",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblMdWorkingShift_PourWorkingShiftCode",
                        column: x => x.PourWorkingShiftCode,
                        principalTable: "tblMdWorkingShift",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblMdWorkingShift_ProcessWorkingShiftCode",
                        column: x => x.ProcessWorkingShiftCode,
                        principalTable: "tblMdWorkingShift",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufacture_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_WorkingShiftCode",
                table: "tblSoOrder",
                column: "WorkingShiftCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_ChipperCode",
                table: "tblBuManufacture",
                column: "ChipperCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_PourLineCode",
                table: "tblBuManufacture",
                column: "PourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_PourSectionCode",
                table: "tblBuManufacture",
                column: "PourSectionCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_PourWorkingShiftCode",
                table: "tblBuManufacture",
                column: "PourWorkingShiftCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_ProcessWorkingShiftCode",
                table: "tblBuManufacture",
                column: "ProcessWorkingShiftCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdWorkingShift_WorkingShiftCode",
                table: "tblSoOrder",
                column: "WorkingShiftCode",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdWorkingShift_WorkingShiftCode",
                table: "tblSoOrder");

            migrationBuilder.DropTable(
                name: "tblBuManufacture");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_WorkingShiftCode",
                table: "tblSoOrder");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdChipper",
                table: "tblMdChipper");

            migrationBuilder.DropColumn(
                name: "WorkingShiftCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "tblMdWorkingShift");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "tblMdChipper");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "tblMdWorkingShift",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "tblMdChipper",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdChipper",
                table: "tblMdChipper",
                column: "Id");
        }
    }
}
