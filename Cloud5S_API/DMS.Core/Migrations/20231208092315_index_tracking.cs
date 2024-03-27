using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class index_tracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_tblBuTracking_OrderCode",
            //    table: "tblBuTracking");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuTracking_OrderCode",
                table: "tblBuTracking",
                column: "OrderCode")
                .Annotation("SqlServer:Clustered", false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_tblBuTracking_OrderCode",
            //    table: "tblBuTracking");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuTracking_OrderCode",
                table: "tblBuTracking",
                column: "OrderCode");
        }
    }
}
