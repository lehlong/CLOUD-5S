using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class quan_ly_danhmuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingSlot",
                table: "tblMdWorkingSlot");

            migrationBuilder.RenameTable(
                name: "tblMdWorkingSlot",
                newName: "tblMdWorkingShift");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift",
                column: "Code");

            migrationBuilder.CreateTable(
                name: "tblMdChipper",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdChipper", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPourSection",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPourSection", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdShip",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Tonage = table.Column<double>(type: "float", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdShip", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPourLine",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    SectionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPourLine", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdPourLine_tblMdPourSection_SectionCode",
                        column: x => x.SectionCode,
                        principalTable: "tblMdPourSection",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblMdPourLine_SectionCode",
                table: "tblMdPourLine",
                column: "SectionCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMdChipper");

            migrationBuilder.DropTable(
                name: "tblMdPourLine");

            migrationBuilder.DropTable(
                name: "tblMdShip");

            migrationBuilder.DropTable(
                name: "tblMdPourSection");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblMdWorkingShift",
                table: "tblMdWorkingShift");

            migrationBuilder.RenameTable(
                name: "tblMdWorkingShift",
                newName: "tblMdWorkingSlot");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblMdWorkingSlot",
                table: "tblMdWorkingSlot",
                column: "Code");
        }
    }
}
