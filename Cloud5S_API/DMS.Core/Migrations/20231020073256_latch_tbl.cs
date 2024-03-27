using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class latch_tbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LatchId",
                table: "tblBuManufacture",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblBuManufactureLatch",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LatchDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LatchShiftCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuManufactureLatch", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuManufactureLatch_tblMdWorkingShift_LatchShiftCode",
                        column: x => x.LatchShiftCode,
                        principalTable: "tblMdWorkingShift",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_LatchId",
                table: "tblBuManufacture",
                column: "LatchId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufactureLatch_LatchShiftCode",
                table: "tblBuManufactureLatch",
                column: "LatchShiftCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblBuManufactureLatch_LatchId",
                table: "tblBuManufacture",
                column: "LatchId",
                principalTable: "tblBuManufactureLatch",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblBuManufactureLatch_LatchId",
                table: "tblBuManufacture");

            migrationBuilder.DropTable(
                name: "tblBuManufactureLatch");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_LatchId",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "LatchId",
                table: "tblBuManufacture");
        }
    }
}
