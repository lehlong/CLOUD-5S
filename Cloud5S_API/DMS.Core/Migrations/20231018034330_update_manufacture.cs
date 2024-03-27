using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_manufacture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblMdChipper_ChipperCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblMdWorkingShift_PourWorkingShiftCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdItem_ItemCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdItem_ItemCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropTable(
                name: "tblMdChipper");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "PourDate",
                table: "tblBuManufacture");

            migrationBuilder.RenameColumn(
                name: "UnitCode",
                table: "tblBuStockImportDetail",
                newName: "PourSectionCode");

            migrationBuilder.RenameColumn(
                name: "ItemCode",
                table: "tblBuStockImportDetail",
                newName: "PourLineCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_UnitCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_PourSectionCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_ItemCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_PourLineCode");

            migrationBuilder.RenameColumn(
                name: "UnitCode",
                table: "tblBuStockExportDetail",
                newName: "PourSectionCode");

            migrationBuilder.RenameColumn(
                name: "ItemCode",
                table: "tblBuStockExportDetail",
                newName: "PourLineCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_UnitCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_PourSectionCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_ItemCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_PourLineCode");

            migrationBuilder.RenameColumn(
                name: "PourWorkingShiftCode",
                table: "tblBuManufacture",
                newName: "UnitCode");

            migrationBuilder.RenameColumn(
                name: "ChipperCode",
                table: "tblBuManufacture",
                newName: "ItemCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuManufacture_PourWorkingShiftCode",
                table: "tblBuManufacture",
                newName: "IX_tblBuManufacture_UnitCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuManufacture_ChipperCode",
                table: "tblBuManufacture",
                newName: "IX_tblBuManufacture_ItemCode");

            migrationBuilder.RenameColumn(
                name: "DefaultProcductStock",
                table: "tblAdSystemParameter",
                newName: "DefaultProductStock");

            migrationBuilder.RenameColumn(
                name: "DefaultItemImportCode",
                table: "tblAdSystemParameter",
                newName: "DefaultProductItemCode");

            migrationBuilder.RenameColumn(
                name: "DefaultItemExportCode",
                table: "tblAdSystemParameter",
                newName: "DefaultIngredientItemCode");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "tblBuStockImport",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemCode",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblBuStockImport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "tblBuStockExport",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "tblBuStockExport",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblBuManufacture",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ChoppingNumber",
                table: "tblBuManufacture",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PourNumber",
                table: "tblBuManufacture",
                type: "float",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblBuStockItemDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CompanyCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourLineCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PourSectionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    UnitCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ConcurrencyToken = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockItemDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdArea_AreaCode",
                        column: x => x.AreaCode,
                        principalTable: "tblMdArea",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdCompany_CompanyCode",
                        column: x => x.CompanyCode,
                        principalTable: "tblMdCompany",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdPourLine_PourLineCode",
                        column: x => x.PourLineCode,
                        principalTable: "tblMdPourLine",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdPourSection_PourSectionCode",
                        column: x => x.PourSectionCode,
                        principalTable: "tblMdPourSection",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemDetail_tblMdUnit_UnitCode",
                        column: x => x.UnitCode,
                        principalTable: "tblMdUnit",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_AreaCode",
                table: "tblBuStockImport",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_ItemCode",
                table: "tblBuStockImport",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_UnitCode",
                table: "tblBuStockImport",
                column: "UnitCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_AreaCode",
                table: "tblBuStockExport",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_ItemCode",
                table: "tblBuStockExport",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_UnitCode",
                table: "tblBuStockExport",
                column: "UnitCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_AreaCode",
                table: "tblBuManufacture",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_AreaCode",
                table: "tblBuStockItemDetail",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_CompanyCode",
                table: "tblBuStockItemDetail",
                column: "CompanyCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_ItemCode",
                table: "tblBuStockItemDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_PourLineCode",
                table: "tblBuStockItemDetail",
                column: "PourLineCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_PourSectionCode",
                table: "tblBuStockItemDetail",
                column: "PourSectionCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_StockCode",
                table: "tblBuStockItemDetail",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemDetail_UnitCode",
                table: "tblBuStockItemDetail",
                column: "UnitCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblMdArea_AreaCode",
                table: "tblBuManufacture",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblMdItem_ItemCode",
                table: "tblBuManufacture",
                column: "ItemCode",
                principalTable: "tblMdItem",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblMdUnit_UnitCode",
                table: "tblBuManufacture",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdArea_AreaCode",
                table: "tblBuStockExport",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdItem_ItemCode",
                table: "tblBuStockExport",
                column: "ItemCode",
                principalTable: "tblMdItem",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExport_tblMdUnit_UnitCode",
                table: "tblBuStockExport",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdPourLine_PourLineCode",
                table: "tblBuStockExportDetail",
                column: "PourLineCode",
                principalTable: "tblMdPourLine",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdPourSection_PourSectionCode",
                table: "tblBuStockExportDetail",
                column: "PourSectionCode",
                principalTable: "tblMdPourSection",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdArea_AreaCode",
                table: "tblBuStockImport",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdItem_ItemCode",
                table: "tblBuStockImport",
                column: "ItemCode",
                principalTable: "tblMdItem",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImport_tblMdUnit_UnitCode",
                table: "tblBuStockImport",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdPourLine_PourLineCode",
                table: "tblBuStockImportDetail",
                column: "PourLineCode",
                principalTable: "tblMdPourLine",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdPourSection_PourSectionCode",
                table: "tblBuStockImportDetail",
                column: "PourSectionCode",
                principalTable: "tblMdPourSection",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblMdArea_AreaCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblMdItem_ItemCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuManufacture_tblMdUnit_UnitCode",
                table: "tblBuManufacture");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdArea_AreaCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdItem_ItemCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExport_tblMdUnit_UnitCode",
                table: "tblBuStockExport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdPourLine_PourLineCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdPourSection_PourSectionCode",
                table: "tblBuStockExportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdArea_AreaCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdItem_ItemCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImport_tblMdUnit_UnitCode",
                table: "tblBuStockImport");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdPourLine_PourLineCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdPourSection_PourSectionCode",
                table: "tblBuStockImportDetail");

            migrationBuilder.DropTable(
                name: "tblBuStockItemDetail");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_AreaCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_ItemCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockImport_UnitCode",
                table: "tblBuStockImport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_AreaCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_ItemCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuStockExport_UnitCode",
                table: "tblBuStockExport");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_AreaCode",
                table: "tblBuManufacture");

            migrationBuilder.DropIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "ItemCode",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblBuStockImport");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "ItemCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "tblBuStockExport");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "ChoppingNumber",
                table: "tblBuManufacture");

            migrationBuilder.DropColumn(
                name: "PourNumber",
                table: "tblBuManufacture");

            migrationBuilder.RenameColumn(
                name: "PourSectionCode",
                table: "tblBuStockImportDetail",
                newName: "UnitCode");

            migrationBuilder.RenameColumn(
                name: "PourLineCode",
                table: "tblBuStockImportDetail",
                newName: "ItemCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_PourSectionCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_UnitCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockImportDetail_PourLineCode",
                table: "tblBuStockImportDetail",
                newName: "IX_tblBuStockImportDetail_ItemCode");

            migrationBuilder.RenameColumn(
                name: "PourSectionCode",
                table: "tblBuStockExportDetail",
                newName: "UnitCode");

            migrationBuilder.RenameColumn(
                name: "PourLineCode",
                table: "tblBuStockExportDetail",
                newName: "ItemCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_PourSectionCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_UnitCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuStockExportDetail_PourLineCode",
                table: "tblBuStockExportDetail",
                newName: "IX_tblBuStockExportDetail_ItemCode");

            migrationBuilder.RenameColumn(
                name: "UnitCode",
                table: "tblBuManufacture",
                newName: "PourWorkingShiftCode");

            migrationBuilder.RenameColumn(
                name: "ItemCode",
                table: "tblBuManufacture",
                newName: "ChipperCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuManufacture_UnitCode",
                table: "tblBuManufacture",
                newName: "IX_tblBuManufacture_PourWorkingShiftCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblBuManufacture_ItemCode",
                table: "tblBuManufacture",
                newName: "IX_tblBuManufacture_ChipperCode");

            migrationBuilder.RenameColumn(
                name: "DefaultProductStock",
                table: "tblAdSystemParameter",
                newName: "DefaultProcductStock");

            migrationBuilder.RenameColumn(
                name: "DefaultProductItemCode",
                table: "tblAdSystemParameter",
                newName: "DefaultItemImportCode");

            migrationBuilder.RenameColumn(
                name: "DefaultIngredientItemCode",
                table: "tblAdSystemParameter",
                newName: "DefaultItemExportCode");

            migrationBuilder.AddColumn<DateTime>(
                name: "PourDate",
                table: "tblBuManufacture",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdChipper",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdChipper", x => x.Code);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuManufacture_OrderCode",
                table: "tblBuManufacture",
                column: "OrderCode",
                unique: true,
                filter: "[OrderCode] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblMdChipper_ChipperCode",
                table: "tblBuManufacture",
                column: "ChipperCode",
                principalTable: "tblMdChipper",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuManufacture_tblMdWorkingShift_PourWorkingShiftCode",
                table: "tblBuManufacture",
                column: "PourWorkingShiftCode",
                principalTable: "tblMdWorkingShift",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdItem_ItemCode",
                table: "tblBuStockExportDetail",
                column: "ItemCode",
                principalTable: "tblMdItem",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockExportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockExportDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdItem_ItemCode",
                table: "tblBuStockImportDetail",
                column: "ItemCode",
                principalTable: "tblMdItem",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuStockImportDetail_tblMdUnit_UnitCode",
                table: "tblBuStockImportDetail",
                column: "UnitCode",
                principalTable: "tblMdUnit",
                principalColumn: "Code");
        }
    }
}
