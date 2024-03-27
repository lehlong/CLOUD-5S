using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class md_manager_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblMdArea",
                type: "nvarchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "tblMdArea",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblMdPricePolicy",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AreaCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdPricePolicy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblMdPricePolicy_tblMdArea_AreaCode",
                        column: x => x.AreaCode,
                        principalTable: "tblMdArea",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblMdPricePolicy_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblMdTransportAgency",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdTransportAgency", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdWorkingSlot",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdWorkingSlot", x => x.Code);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblMdPricePolicy_AreaCode",
                table: "tblMdPricePolicy",
                column: "AreaCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdPricePolicy_ItemCode",
                table: "tblMdPricePolicy",
                column: "ItemCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMdPricePolicy");

            migrationBuilder.DropTable(
                name: "tblMdTransportAgency");

            migrationBuilder.DropTable(
                name: "tblMdWorkingSlot");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "tblMdArea");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblMdArea",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldNullable: true);
        }
    }
}
