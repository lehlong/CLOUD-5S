using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class contract_referId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ReferenceId",
                table: "tblBuContract",
                type: "uniqueidentifier",
                nullable: true,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderBatch_CreateBy",
                table: "tblSoOrderBatch",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_CreateBy",
                table: "tblSoOrder",
                column: "CreateBy");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblAdAccount_CreateBy",
                table: "tblSoOrder",
                column: "CreateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderBatch_tblAdAccount_CreateBy",
                table: "tblSoOrderBatch",
                column: "CreateBy",
                principalTable: "tblAdAccount",
                principalColumn: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblAdAccount_CreateBy",
                table: "tblSoOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderBatch_tblAdAccount_CreateBy",
                table: "tblSoOrderBatch");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderBatch_CreateBy",
                table: "tblSoOrderBatch");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_CreateBy",
                table: "tblSoOrder");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReferenceId",
                table: "tblBuContract",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true,
                oldDefaultValueSql: "NEWID()");
        }
    }
}
