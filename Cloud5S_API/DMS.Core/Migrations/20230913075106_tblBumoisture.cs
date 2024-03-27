using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblBumoisture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMdTracking");

            migrationBuilder.CreateTable(
                name: "tblBuMoisture",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ProcessBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ProcessDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrayWeight = table.Column<double>(type: "float", nullable: true),
                    TrayWetWeight = table.Column<double>(type: "float", nullable: true),
                    WetWeight = table.Column<double>(type: "float", nullable: true),
                    TrayDryWeight = table.Column<double>(type: "float", nullable: true),
                    DryWeight = table.Column<double>(type: "float", nullable: true),
                    Moisture = table.Column<double>(type: "float", nullable: true),
                    Remark = table.Column<string>(type: "varchar(50)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuMoisture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuMoisture_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuTracking",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Heading = table.Column<double>(type: "float", nullable: true),
                    Speed = table.Column<double>(type: "float", nullable: true),
                    TimeStamp = table.Column<DateTime>(type: "Datetime2", nullable: false),
                    SentTime = table.Column<DateTime>(type: "Datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuTracking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuTracking_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuMoisture_OrderCode",
                table: "tblBuMoisture",
                column: "OrderCode",
                unique: true,
                filter: "[OrderCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuTracking_OrderCode",
                table: "tblBuTracking",
                column: "OrderCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuMoisture");

            migrationBuilder.DropTable(
                name: "tblBuTracking");

            migrationBuilder.CreateTable(
                name: "tblMdTracking",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Heading = table.Column<double>(type: "float", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    SentTime = table.Column<DateTime>(type: "Datetime2", nullable: false),
                    Speed = table.Column<double>(type: "float", nullable: true),
                    TimeStamp = table.Column<DateTime>(type: "Datetime2", nullable: false),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdTracking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblMdTracking_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblMdTracking_OrderCode",
                table: "tblMdTracking",
                column: "OrderCode");
        }
    }
}
