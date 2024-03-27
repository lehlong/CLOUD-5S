using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class remove_soImport_soExport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuPayBillOrderImport_tblSoImport_ImportCode",
                table: "tblBuPayBillOrderImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblSoImport_ImportCode",
                table: "tblBuStockImport");

            migrationBuilder.DropTable(
                name: "tblSoImportDetail");

            migrationBuilder.DropTable(
                name: "tblSoImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_ImportCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuPayBillOrderImport_ImportCode",
                table: "tblBuPayBillOrderImport");

            migrationBuilder.DropColumn(
                name: "ImportCode",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ImportCode",
                table: "tblBuPayBillOrderImport");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImportCode",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImportCode",
                table: "tblBuPayBillOrderImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblSoImport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PaymentType = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Debt = table.Column<double>(type: "float", nullable: true),
                    Discount = table.Column<double>(type: "float", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ImportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsPaymentNow = table.Column<bool>(type: "bit", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PayMoney = table.Column<double>(type: "float", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    ReceiverAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    TaxVat = table.Column<double>(type: "float", nullable: true),
                    Type = table.Column<string>(type: "char(2)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoImport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdPayType_PaymentType",
                        column: x => x.PaymentType,
                        principalTable: "tblMdPayType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoImportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Number = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoImportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoImportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImportDetail_tblSoImport_ImportCode",
                        column: x => x.ImportCode,
                        principalTable: "tblSoImport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_ImportCode",
                table: "tblBuStockImport",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBillOrderImport_ImportCode",
                table: "tblBuPayBillOrderImport",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_BankAccountId",
                table: "tblSoImport",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_PartnerCode",
                table: "tblSoImport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_PaymentType",
                table: "tblSoImport",
                column: "PaymentType");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_StockCode",
                table: "tblSoImport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_VehicleCode",
                table: "tblSoImport",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImportDetail_ImportCode",
                table: "tblSoImportDetail",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImportDetail_ItemCode",
                table: "tblSoImportDetail",
                column: "ItemCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuPayBillOrderImport_tblSoImport_ImportCode",
                table: "tblBuPayBillOrderImport",
                column: "ImportCode",
                principalTable: "tblSoImport",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblSoImport_ImportCode",
                table: "tblBuStockImport",
                column: "ImportCode",
                principalTable: "tblSoImport",
                principalColumn: "Code");
        }
    }
}
