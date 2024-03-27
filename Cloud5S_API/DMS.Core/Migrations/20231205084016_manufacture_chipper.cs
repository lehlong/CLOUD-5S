using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class manufacture_chipper : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblMdChipper",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdChipper", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblBuManufactureChipper",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShiftCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ChipperCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ProcessDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuManufactureChipper", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuManufactureChipper_tblMdChipper_ChipperCode",
                        column: x => x.ChipperCode,
                        principalTable: "tblMdChipper",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuManufactureChipper_tblMdWorkingShift_ShiftCode",
                        column: x => x.ShiftCode,
                        principalTable: "tblMdWorkingShift",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufactureChipper_ChipperCode",
                table: "tblBuManufactureChipper",
                column: "ChipperCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufactureChipper_ShiftCode",
                table: "tblBuManufactureChipper",
                column: "ShiftCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuManufactureChipper");

            migrationBuilder.DropTable(
                name: "tblMdChipper");
        }
    }
}
