using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_db_refactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "tblBuCustomerCare");

            //migrationBuilder.DropTable(
            //    name: "tblMdOrderType");

            //migrationBuilder.DropTable(
            //    name: "tblMdPayType");

            //migrationBuilder.DropTable(
            //    name: "tblMdPricePolicy");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "tblBuCustomerCare",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
            //        PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
            //        CareContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CareDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        IsActive = table.Column<bool>(type: "bit", nullable: true),
            //        UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblBuCustomerCare", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblBuCustomerCare_tblMdPartner_PartnerCode",
            //            column: x => x.PartnerCode,
            //            principalTable: "tblMdPartner",
            //            principalColumn: "Code");
            //        table.ForeignKey(
            //            name: "FK_tblBuCustomerCare_tblSoOrder_OrderCode",
            //            column: x => x.OrderCode,
            //            principalTable: "tblSoOrder",
            //            principalColumn: "Code");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblMdOrderType",
            //    columns: table => new
            //    {
            //        Code = table.Column<string>(type: "varchar(50)", nullable: false),
            //        CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        IsActive = table.Column<bool>(type: "bit", nullable: true),
            //        Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
            //        UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblMdOrderType", x => x.Code);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblMdPayType",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        IsActive = table.Column<bool>(type: "bit", nullable: true),
            //        Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
            //        Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
            //        UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblMdPayType", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblMdPricePolicy",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
            //        ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
            //        CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        FromDate = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        IsActive = table.Column<bool>(type: "bit", nullable: true),
            //        Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
            //        Price = table.Column<double>(type: "float", nullable: true),
            //        ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
            //        UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblMdPricePolicy", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblMdPricePolicy_tblMdArea_AreaCode",
            //            column: x => x.AreaCode,
            //            principalTable: "tblMdArea",
            //            principalColumn: "Code");
            //        table.ForeignKey(
            //            name: "FK_tblMdPricePolicy_tblMdItem_ItemCode",
            //            column: x => x.ItemCode,
            //            principalTable: "tblMdItem",
            //            principalColumn: "Code");
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblBuCustomerCare_OrderCode",
            //    table: "tblBuCustomerCare",
            //    column: "OrderCode");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblBuCustomerCare_PartnerCode",
            //    table: "tblBuCustomerCare",
            //    column: "PartnerCode");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblMdPricePolicy_AreaCode",
            //    table: "tblMdPricePolicy",
            //    column: "AreaCode");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblMdPricePolicy_ItemCode",
            //    table: "tblMdPricePolicy",
            //    column: "ItemCode");
        }
    }
}
