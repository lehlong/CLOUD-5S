using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblTransferLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblBuStockItemTransferLog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CompanyCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    FromPourLineCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    FromPourSectionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ToPourLineCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ToPourSectionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    UnitCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockItemTransferLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdArea_AreaCode",
                        column: x => x.AreaCode,
                        principalTable: "tblMdArea",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdCompany_CompanyCode",
                        column: x => x.CompanyCode,
                        principalTable: "tblMdCompany",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdPourLine_FromPourLineCode",
                        column: x => x.FromPourLineCode,
                        principalTable: "tblMdPourLine",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdPourLine_ToPourLineCode",
                        column: x => x.ToPourLineCode,
                        principalTable: "tblMdPourLine",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdPourSection_FromPourSectionCode",
                        column: x => x.FromPourSectionCode,
                        principalTable: "tblMdPourSection",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdPourSection_ToPourSectionCode",
                        column: x => x.ToPourSectionCode,
                        principalTable: "tblMdPourSection",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemTransferLog_tblMdUnit_UnitCode",
                        column: x => x.UnitCode,
                        principalTable: "tblMdUnit",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_AreaCode",
                table: "tblBuStockItemTransferLog",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_CompanyCode",
                table: "tblBuStockItemTransferLog",
                column: "CompanyCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_FromPourLineCode",
                table: "tblBuStockItemTransferLog",
                column: "FromPourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_FromPourSectionCode",
                table: "tblBuStockItemTransferLog",
                column: "FromPourSectionCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_ItemCode",
                table: "tblBuStockItemTransferLog",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_StockCode",
                table: "tblBuStockItemTransferLog",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_ToPourLineCode",
                table: "tblBuStockItemTransferLog",
                column: "ToPourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_ToPourSectionCode",
                table: "tblBuStockItemTransferLog",
                column: "ToPourSectionCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemTransferLog_UnitCode",
                table: "tblBuStockItemTransferLog",
                column: "UnitCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuStockItemTransferLog");
        }
    }
}
