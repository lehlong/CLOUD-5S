using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_order_scale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdPartner_CustomerCode",
                table: "tblSoScale");

            migrationBuilder.RenameColumn(
                name: "CustomerCode",
                table: "tblSoScale",
                newName: "StationCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblSoScale_CustomerCode",
                table: "tblSoScale",
                newName: "IX_tblSoScale_StationCode");

            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartnerCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "tblSoScale",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_PartnerCode",
                table: "tblSoScale",
                column: "PartnerCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale",
                column: "AreaCode",
                principalTable: "tblMdArea",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdPartner_PartnerCode",
                table: "tblSoScale",
                column: "PartnerCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdPurchasingStation_StationCode",
                table: "tblSoScale",
                column: "StationCode",
                principalTable: "tblMdPurchasingStation",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdArea_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdPartner_PartnerCode",
                table: "tblSoScale");

            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblMdPurchasingStation_StationCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_PartnerCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "PartnerCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "tblSoScale");

            migrationBuilder.RenameColumn(
                name: "StationCode",
                table: "tblSoScale",
                newName: "CustomerCode");

            migrationBuilder.RenameIndex(
                name: "IX_tblSoScale_StationCode",
                table: "tblSoScale",
                newName: "IX_tblSoScale_CustomerCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblMdPartner_CustomerCode",
                table: "tblSoScale",
                column: "CustomerCode",
                principalTable: "tblMdPartner",
                principalColumn: "Code");
        }
    }
}
