using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_stock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdPartner_PartnerCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdStock_StockCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdPartner_PartnerCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdStock_StockCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItem_tblMdPourLine_PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItem_tblMdPourSection_PourSectionCode",
                table: "tblBuStockItem");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockItem_PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_PartnerCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_PartnerCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "SumMoney",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblBuStockItem");

            migrationBuilder.DropColumn(
                name: "PourLineCode",
                table: "tblBuStockItem");

            migrationBuilder.DropColumn(
                name: "ImportDate",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "PartnerAddress",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "PartnerCode",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "PartnerPhoneNumber",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ExportDate",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropColumn(
                name: "ExportCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "PartnerAddress",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "PartnerCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "PartnerPhoneNumber",
                table: "tblBuStockExport");

            migrationBuilder.RenameColumn(
                name: "PourSectionCode",
                table: "tblBuStockItem",
                newName: "CompanyCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockItem_PourSectionCode",
                table: "tblBuStockItem",
                newName: "IX_tblBuStockItem_CompanyCode");

            migrationBuilder.RenameColumn(
                name: "StockCode",
                table: "tblBuStockImportDetail",
                newName: "UnitCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_StockCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_UnitCode");

            migrationBuilder.RenameColumn(
                name: "Vehicle",
                table: "tblBuStockImport",
                newName: "ShiftCode");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "tblBuStockImport",
                newName: "OrderCode");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "tblBuStockImport",
                newName: "CompanyCode");

            migrationBuilder.RenameColumn(
                name: "StockCode",
                table: "tblBuStockExportDetail",
                newName: "UnitCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_StockCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_UnitCode");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "tblBuStockExport",
                newName: "ShiftCode");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "tblBuStockExport",
                newName: "CompanyCode");

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "tblBuStockExportDetail",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "DefaultIngredientStock",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultProcductStock",
                table: "tblAdSystemParameter",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_CompanyCode",
                table: "tblBuStockImport",
                column: "CompanyCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_OrderCode",
                table: "tblBuStockImport",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_ShiftCode",
                table: "tblBuStockImport",
                column: "ShiftCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_CompanyCode",
                table: "tblBuStockExport",
                column: "CompanyCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_CreateBy",
                table: "tblBuStockExport",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_OrderCode",
                table: "tblBuStockExport",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_ShiftCode",
                table: "tblBuStockExport",
                column: "ShiftCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_UpdateBy",
                table: "tblBuStockExport",
                column: "UpdateBy");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblAdAccount_CreateBy",
                table: "tblBuStockExport",
                column: "CreateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblAdAccount_UpdateBy",
                table: "tblBuStockExport",
                column: "UpdateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdCompany_CompanyCode",
                table: "tblBuStockExport",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdWorkingShift_ShiftCode",
                table: "tblBuStockExport",
                column: "ShiftCode",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblSoOrder_OrderCode",
                table: "tblBuStockExport",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockExportDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdCompany_CompanyCode",
                table: "tblBuStockImport",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdWorkingShift_ShiftCode",
                table: "tblBuStockImport",
                column: "ShiftCode",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblSoOrder_OrderCode",
                table: "tblBuStockImport",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockImportDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItem_tblMdCompany_CompanyCode",
                table: "tblBuStockItem",
                column: "CompanyCode",
                principalTable: "tblMdCompany",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblAdAccount_CreateBy",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblAdAccount_UpdateBy",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdCompany_CompanyCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdWorkingShift_ShiftCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblSoOrder_OrderCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdCompany_CompanyCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdWorkingShift_ShiftCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblSoOrder_OrderCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockItem_tblMdCompany_CompanyCode",
                table: "tblBuStockItem");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_CompanyCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_OrderCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_ShiftCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_CompanyCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_CreateBy",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_OrderCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_ShiftCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_UpdateBy",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "DefaultIngredientStock",
                table: "tblAdSystemParameter");

            migrationBuilder.DropColumn(
                name: "DefaultProcductStock",
                table: "tblAdSystemParameter");

            migrationBuilder.RenameColumn(
                name: "CompanyCode",
                table: "tblBuStockItem",
                newName: "PourSectionCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockItem_CompanyCode",
                table: "tblBuStockItem",
                newName: "IX_tblBuStockItem_PourSectionCode");

            migrationBuilder.RenameColumn(
                name: "UnitCode",
                table: "tblBuStockImportDetail",
                newName: "StockCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_UnitCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_StockCode");

            migrationBuilder.RenameColumn(
                name: "ShiftCode",
                table: "tblBuStockImport",
                newName: "Vehicle");

            migrationBuilder.RenameColumn(
                name: "OrderCode",
                table: "tblBuStockImport",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "CompanyCode",
                table: "tblBuStockImport",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "UnitCode",
                table: "tblBuStockExportDetail",
                newName: "StockCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_UnitCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_StockCode");

            migrationBuilder.RenameColumn(
                name: "ShiftCode",
                table: "tblBuStockExport",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "CompanyCode",
                table: "tblBuStockExport",
                newName: "State");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblBuStockItem",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PourLineCode",
                table: "tblBuStockItem",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ImportDate",
                table: "tblBuStockImportDetail",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblBuStockImportDetail",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblBuStockImport",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerAddress",
                table: "tblBuStockImport",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerCode",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerPhoneNumber",
                table: "tblBuStockImport",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "tblBuStockExportDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExportDate",
                table: "tblBuStockExportDetail",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblBuStockExportDetail",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExportCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblBuStockExport",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerAddress",
                table: "tblBuStockExport",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerPhoneNumber",
                table: "tblBuStockExport",
                type: "nvarchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "SumMoney",
                table: "tblBuStockImportDetail",
                type: "float",
                nullable: true,
                computedColumnSql: "Amount*Price");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItem_PourLineCode",
                table: "tblBuStockItem",
                column: "PourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_PartnerCode",
                table: "tblBuStockImport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_PartnerCode",
                table: "tblBuStockExport",
                column: "PartnerCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdPartner_PartnerCode",
                table: "tblBuStockExport",
                column: "PartnerCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdStock_StockCode",
                table: "tblBuStockExportDetail",
                column: "StockCode",
                principalTable: "tblMdStock",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdPartner_PartnerCode",
                table: "tblBuStockImport",
                column: "PartnerCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdStock_StockCode",
                table: "tblBuStockImportDetail",
                column: "StockCode",
                principalTable: "tblMdStock",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItem_tblMdPourLine_PourLineCode",
                table: "tblBuStockItem",
                column: "PourLineCode",
                principalTable: "tblMdPourLine",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockItem_tblMdPourSection_PourSectionCode",
                table: "tblBuStockItem",
                column: "PourSectionCode",
                principalTable: "tblMdPourSection",
                principalColumn: "Code");
        }
    }
}
