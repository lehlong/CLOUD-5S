using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class OrderBatchPurchasingStationOrderupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderBatchCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PurchasingMethod",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StationCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdPurchasingStation",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdPurchasingStation", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdPurchasingStation_tblMdArea_AreaCode",
                        column: x => x.AreaCode,
                        principalTable: "tblMdArea",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoOrderBatch",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StationCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PurchasingMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderBatch", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatch_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoOrderBatch_tblMdPurchasingStation_StationCode",
                        column: x => x.StationCode,
                        principalTable: "tblMdPurchasingStation",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_OrderBatchCode",
                table: "tblSoOrder",
                column: "OrderBatchCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_StationCode",
                table: "tblSoOrder",
                column: "StationCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdPurchasingStation_AreaCode",
                table: "tblMdPurchasingStation",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_PartnerCode",
                table: "tblSoOrderBatch",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_StationCode",
                table: "tblSoOrderBatch",
                column: "StationCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdPurchasingStation_StationCode",
                table: "tblSoOrder",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblSoOrderBatch_OrderBatchCode",
                table: "tblSoOrder",
                column: "OrderBatchCode",
                principalTable: "tblSoOrderBatch",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdPurchasingStation_StationCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblSoOrderBatch_OrderBatchCode",
                table: "tblSoOrder");

            migrationBuilder.DropTable(
                name: "tblSoOrderBatch");

            migrationBuilder.DropTable(
                name: "tblMdPurchasingStation");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_OrderBatchCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_StationCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "OrderBatchCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "PurchasingMethod",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "StationCode",
                table: "tblSoOrder");
        }
    }
}
