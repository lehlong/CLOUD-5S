using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblaccount_accountGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAdAccount_tblAdAccountGroup_GroupId",
                table: "tblAdAccount");

            migrationBuilder.DropIndex(
                name: "IX_tblAdAccount_GroupId",
                table: "tblAdAccount");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "tblAdAccount");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "tblAdAccount");

            migrationBuilder.CreateTable(
                name: "tblAdAccount_AccountGroup",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccount_AccountGroup", x => new { x.UserName, x.GroupId });
                    table.ForeignKey(
                        name: "FK_tblAdAccount_AccountGroup_tblAdAccountGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "tblAdAccountGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblAdAccount_AccountGroup_tblAdAccount_UserName",
                        column: x => x.UserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_AccountGroup_GroupId",
                table: "tblAdAccount_AccountGroup",
                column: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblAdAccount_AccountGroup");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "tblAdAccount",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "tblAdAccount",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_GroupId",
                table: "tblAdAccount",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAdAccount_tblAdAccountGroup_GroupId",
                table: "tblAdAccount",
                column: "GroupId",
                principalTable: "tblAdAccountGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
