using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class refactor_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdPartner_CompanyCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdPurchasingStation_StationCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatch_tblMdPurchasingStation_StationCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdPurchasingStation_StationCode",
                table: "tblSoScale");

            migrationBuilder.DropTable(
                name: "_tblSequenceIncomeBill");

            migrationBuilder.DropTable(
                name: "_tblSequencePayBill");

            migrationBuilder.DropTable(
                name: "tblBuIncomeBillOrderExport");

            migrationBuilder.DropTable(
                name: "tblBuPayBillOrderImport");

            migrationBuilder.DropTable(
                name: "tblMdPurchasingStation");

            migrationBuilder.DropTable(
                name: "tblBuIncomeBill");

            migrationBuilder.DropTable(
                name: "tblBuPayBill");

            migrationBuilder.DropTable(
                name: "tblMdIncomeType");

            migrationBuilder.DropTable(
                name: "tblMdBankAccount");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatch_StationCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_StationCode",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "StationCode",
                table: "tblSoOrderBatch");

            migrationBuilder.DropColumn(
                name: "CompanyType",
                table: "tblSoOrder");

            migrationBuilder.DropColumn(
                name: "StationCode",
                table: "tblSoOrder");

            migrationBuilder.RenameColumn(
                name: "StationCode",
                table: "tblSoScale",
                newName: "CompanyCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblSoScale_StationCode",
                table: "tblSoScale",
                newName: "IX_tblSoScale_CompanyCode");

            migrationBuilder.AddColumn<string>(
                name: "ExportCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdCompany",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdCompany", x => x.Code);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdCompany_CompanyCode",
                table: "tblSoOrder",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdCompany_CompanyCode",
                table: "tblSoScale",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdCompany_CompanyCode",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdCompany_CompanyCode",
                table: "tblSoScale");

            migrationBuilder.DropTable(
                name: "tblMdCompany");

            migrationBuilder.DropColumn(
                name: "ExportCode",
                table: "tblBuStockExport");

            migrationBuilder.RenameColumn(
                name: "CompanyCode",
                table: "tblSoScale",
                newName: "StationCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblSoScale_CompanyCode",
                table: "tblSoScale",
                newName: "IX_tblSoScale_StationCode");

            migrationBuilder.AddColumn<string>(
                name: "StationCode",
                table: "tblSoOrderBatch",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyType",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StationCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "_tblSequenceIncomeBill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceIncomeBill", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequencePayBill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequencePayBill", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdBankAccount",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BankAccount = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    OwnerName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdBankAccount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdIncomeType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdIncomeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPurchasingStation",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
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
                name: "tblBuPayBill",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Money = table.Column<double>(type: "float", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    ReceiverAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuPayBill", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdPayType_Type",
                        column: x => x.Type,
                        principalTable: "tblMdPayType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "tblBuIncomeBill",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Money = table.Column<double>(type: "float", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    SenderAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuIncomeBill", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdIncomeType_Type",
                        column: x => x.Type,
                        principalTable: "tblMdIncomeType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuPayBillOrderImport",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PayBillCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuPayBillOrderImport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuPayBillOrderImport_tblBuPayBill_PayBillCode",
                        column: x => x.PayBillCode,
                        principalTable: "tblBuPayBill",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuIncomeBillOrderExport",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IncomeBillCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuIncomeBillOrderExport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBillOrderExport_tblBuIncomeBill_IncomeBillCode",
                        column: x => x.IncomeBillCode,
                        principalTable: "tblBuIncomeBill",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_StationCode",
                table: "tblSoOrderBatch",
                column: "StationCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_StationCode",
                table: "tblSoOrder",
                column: "StationCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_BankAccountId",
                table: "tblBuIncomeBill",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_CreateBy",
                table: "tblBuIncomeBill",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_PartnerCode",
                table: "tblBuIncomeBill",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_Type",
                table: "tblBuIncomeBill",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBillOrderExport_IncomeBillCode",
                table: "tblBuIncomeBillOrderExport",
                column: "IncomeBillCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_BankAccountId",
                table: "tblBuPayBill",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_CreateBy",
                table: "tblBuPayBill",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_PartnerCode",
                table: "tblBuPayBill",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_Type",
                table: "tblBuPayBill",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBillOrderImport_PayBillCode",
                table: "tblBuPayBillOrderImport",
                column: "PayBillCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdPurchasingStation_AreaCode",
                table: "tblMdPurchasingStation",
                column: "AreaCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdPartner_CompanyCode",
                table: "tblSoOrder",
                column: "CompanyCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdPurchasingStation_StationCode",
                table: "tblSoOrder",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatch_tblMdPurchasingStation_StationCode",
                table: "tblSoOrderBatch",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdPurchasingStation_StationCode",
                table: "tblSoScale",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");
        }
    }
}
