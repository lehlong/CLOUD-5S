using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblBuTrackingLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblBuTrackingLog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DriverUserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    LogTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuTrackingLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuTrackingLog_tblAdAccount_DriverUserName",
                        column: x => x.DriverUserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuTrackingLog_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuTrackingLog_DriverUserName",
                table: "tblBuTrackingLog",
                column: "DriverUserName");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuTrackingLog_OrderCode",
                table: "tblBuTrackingLog",
                column: "OrderCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuTrackingLog");
        }
    }
}
