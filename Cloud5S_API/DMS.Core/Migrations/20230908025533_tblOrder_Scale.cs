using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblOrder_Scale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuIncomeBillOrderExport_tblSoExport_ExportCode",
                table: "tblBuIncomeBillOrderExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblSoExport_ExportCode",
                table: "tblBuStockExport");

            migrationBuilder.DropTable(
                name: "tblSoExportDetail");

            migrationBuilder.DropTable(
                name: "tblSoExportProcess");

            migrationBuilder.DropTable(
                name: "tblSoExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_ExportCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuIncomeBillOrderExport_ExportCode",
                table: "tblBuIncomeBillOrderExport");

            migrationBuilder.DropColumn(
                name: "ExportCode",
                table: "tblBuStockExport");

            migrationBuilder.AddColumn<Guid>(
                name: "ScaleCode",
                table: "tblSoOrder",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleCode",
                table: "tblSoOrder",
                column: "ScaleCode",
                principalTable: "tblSoScale",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblSoScale_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "ScaleCode",
                table: "tblSoOrder");

            migrationBuilder.AddColumn<string>(
                name: "ExportCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblSoExport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PaymentType = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StationCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Debt = table.Column<double>(type: "float", nullable: true, computedColumnSql: "SumMoney - PayMoney"),
                    Discount = table.Column<double>(type: "float", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ExportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsPaymentNow = table.Column<bool>(type: "bit", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PayMoney = table.Column<double>(type: "float", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    SenderAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    TaxVat = table.Column<double>(type: "float", nullable: true),
                    Type = table.Column<string>(type: "char(2)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoExport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdIncomeType_PaymentType",
                        column: x => x.PaymentType,
                        principalTable: "tblMdIncomeType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdPurchasingStation_StationCode",
                        column: x => x.StationCode,
                        principalTable: "tblMdPurchasingStation",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoExportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsMainItem = table.Column<bool>(type: "bit", nullable: true),
                    Number = table.Column<double>(type: "float", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "Number * Price"),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoExportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoExportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExportDetail_tblSoExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblSoExport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoExportProcess",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ActionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    PrevState = table.Column<string>(type: "varchar(50)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
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
                name: "IX_tblBuStockExport_ExportCode",
                table: "tblBuStockExport",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBillOrderExport_ExportCode",
                table: "tblBuIncomeBillOrderExport",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_BankAccountId",
                table: "tblSoExport",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_OrderCode",
                table: "tblSoExport",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_PartnerCode",
                table: "tblSoExport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_PaymentType",
                table: "tblSoExport",
                column: "PaymentType");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_StationCode",
                table: "tblSoExport",
                column: "StationCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_StockCode",
                table: "tblSoExport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_VehicleCode",
                table: "tblSoExport",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportDetail_ExportCode",
                table: "tblSoExportDetail",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportDetail_ItemCode",
                table: "tblSoExportDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportProcess_CreateBy",
                table: "tblSoExportProcess",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportProcess_ExportCode",
                table: "tblSoExportProcess",
                column: "ExportCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuIncomeBillOrderExport_tblSoExport_ExportCode",
                table: "tblBuIncomeBillOrderExport",
                column: "ExportCode",
                principalTable: "tblSoExport",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblSoExport_ExportCode",
                table: "tblBuStockExport",
                column: "ExportCode",
                principalTable: "tblSoExport",
                principalColumn: "Code");
        }
    }
}
