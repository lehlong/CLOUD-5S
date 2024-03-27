using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_tblAdAccountRight_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblAdAccountRight",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    RightId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsAdded = table.Column<bool>(type: "bit", nullable: true),
                    IsRemoved = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccountRight", x => new { x.UserName, x.RightId });
                    table.ForeignKey(
                        name: "FK_tblAdAccountRight_tblAdAccount_UserName",
                        column: x => x.UserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblAdAccountRight_tblAdRight_RightId",
                        column: x => x.RightId,
                        principalTable: "tblAdRight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountRight_RightId",
                table: "tblAdAccountRight",
                column: "RightId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblAdAccountRight");
        }
    }
}
