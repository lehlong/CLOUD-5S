using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class order_export_process : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblSoExportProcess",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ActionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PrevState = table.Column<string>(type: "varchar(50)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoExportProcess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoExportProcess_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblSoExportProcess_tblSoExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblSoExport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportProcess_CreateBy",
                table: "tblSoExportProcess",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportProcess_ExportCode",
                table: "tblSoExportProcess",
                column: "ExportCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblSoExportProcess");
        }
    }
}
