using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_tblPosition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyCode",
                table: "tblMdDepartment",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdPosition",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPosition", x => x.Code);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblMdDepartment_CompanyCode",
                table: "tblMdDepartment",
                column: "CompanyCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblMdDepartment_tblMdCompany_CompanyCode",
                table: "tblMdDepartment",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblMdDepartment_tblMdCompany_CompanyCode",
                table: "tblMdDepartment");

            migrationBuilder.DropTable(
                name: "tblMdPosition");

            migrationBuilder.DropIndex(
                name: "IX_tblMdDepartment_CompanyCode",
                table: "tblMdDepartment");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "tblMdDepartment");
        }
    }
}
