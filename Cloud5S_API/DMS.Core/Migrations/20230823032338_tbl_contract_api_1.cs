using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tbl_contract_api_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuContractDetail_tblBuContract_ContractCode",
                table: "tblBuContractDetail");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuContractDetail_tblBuContract_ContractCode",
                table: "tblBuContractDetail",
                column: "ContractCode",
                principalTable: "tblBuContract",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblBuContractDetail_tblBuContract_ContractCode",
                table: "tblBuContractDetail");

            migrationBuilder.AddForeignKey(
                name: "FK_tblBuContractDetail_tblBuContract_ContractCode",
                table: "tblBuContractDetail",
                column: "ContractCode",
                principalTable: "tblBuContract",
                principalColumn: "Code");
        }
    }
}
