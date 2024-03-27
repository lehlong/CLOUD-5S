using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tbl_contract_api : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_tblSequenceContract",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceContract", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuContract",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ReleaseDate = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_tblBuContract", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuContract_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuContractDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContractCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "OrderNumber*Price"),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuContractDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuContractDetail_tblBuContract_ContractCode",
                        column: x => x.ContractCode,
                        principalTable: "tblBuContract",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuContractDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuContract_PartnerCode",
                table: "tblBuContract",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuContractDetail_ContractCode",
                table: "tblBuContractDetail",
                column: "ContractCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuContractDetail_ItemCode",
                table: "tblBuContractDetail",
                column: "ItemCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_tblSequenceContract");

            migrationBuilder.DropTable(
                name: "tblBuContractDetail");

            migrationBuilder.DropTable(
                name: "tblBuContract");
        }
    }
}
