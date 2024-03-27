using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_tblAccount_infor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyCode",
                table: "tblAdAccount",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartmentCode",
                table: "tblAdAccount",
                type: "nvarchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PositionCode",
                table: "tblAdAccount",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_CompanyCode",
                table: "tblAdAccount",
                column: "CompanyCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_DepartmentCode",
                table: "tblAdAccount",
                column: "DepartmentCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_PositionCode",
                table: "tblAdAccount",
                column: "PositionCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccount_tblMdCompany_CompanyCode",
                table: "tblAdAccount",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccount_tblMdDepartment_DepartmentCode",
                table: "tblAdAccount",
                column: "DepartmentCode",
                principalTable: "tblMdDepartment",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccount_tblMdPosition_PositionCode",
                table: "tblAdAccount",
                column: "PositionCode",
                principalTable: "tblMdPosition",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAdAccount_tblMdCompany_CompanyCode",
                table: "tblAdAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_tblAdAccount_tblMdDepartment_DepartmentCode",
                table: "tblAdAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_tblAdAccount_tblMdPosition_PositionCode",
                table: "tblAdAccount");

            migrationBuilder.DropIndex(
                name: "IX_tblAdAccount_CompanyCode",
                table: "tblAdAccount");

            migrationBuilder.DropIndex(
                name: "IX_tblAdAccount_DepartmentCode",
                table: "tblAdAccount");

            migrationBuilder.DropIndex(
                name: "IX_tblAdAccount_PositionCode",
                table: "tblAdAccount");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "tblAdAccount");

            migrationBuilder.DropColumn(
                name: "DepartmentCode",
                table: "tblAdAccount");

            migrationBuilder.DropColumn(
                name: "PositionCode",
                table: "tblAdAccount");
        }
    }
}
