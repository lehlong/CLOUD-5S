using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class OrderBatchDetailupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblSoOrderBatchDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderBatchCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: false),
                    ReleaseNumber = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderBatchDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatchDetail_tblSoOrderBatch_OrderBatchCode",
                        column: x => x.OrderBatchCode,
                        principalTable: "tblSoOrderBatch",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchDetail_ItemCode",
                table: "tblSoOrderBatchDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatchDetail_OrderBatchCode",
                table: "tblSoOrderBatchDetail",
                column: "OrderBatchCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblSoOrderBatchDetail");
        }
    }
}
