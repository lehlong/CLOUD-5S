using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class orderbatch_process : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblSoOrderBatchProcess",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderBatchCode = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblSoOrderBatchProcess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchProcess_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchProcess_tblSoOrderBatch_OrderBatchCode",
                        column: x => x.OrderBatchCode,
                        principalTable: "tblSoOrderBatch",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchProcess_CreateBy",
                table: "tblSoOrderBatchProcess",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchProcess_OrderBatchCode",
                table: "tblSoOrderBatchProcess",
                column: "OrderBatchCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblSoOrderBatchProcess");
        }
    }
}
