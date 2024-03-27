using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_tblSequenceExport",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceExport", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceImport",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceImport", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceIncomeBill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceIncomeBill", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceOrder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceOrder", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequencePartner",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequencePartner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequencePayBill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequencePayBill", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceScale",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceScale", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceStockExport",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceStockExport", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_tblSequenceStockImport",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tblSequenceStockImport", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccountGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdAccountGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdLoginHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    IsSuccess = table.Column<bool>(type: "bit", nullable: false),
                    UserAgent = table.Column<string>(type: "varchar(255)", nullable: true),
                    IPAddress = table.Column<string>(type: "varchar(50)", nullable: true),
                    MessageCode = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdLoginHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdMenu",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    RightId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdMenu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdMessage",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdMessage", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblAdRight",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_tblAdRight", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblAdSystemParameter",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DefaultStockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    DefaultCementCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    CompanyName = table.Column<string>(type: "nvarchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdSystemParameter", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuAttachment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Url = table.Column<string>(type: "varchar(255)", nullable: true),
                    Thumbnail = table.Column<string>(type: "varchar(255)", nullable: true),
                    Extension = table.Column<string>(type: "varchar(255)", nullable: true),
                    Size = table.Column<double>(type: "float", nullable: false),
                    Type = table.Column<string>(type: "varchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuAttachment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuCheckInOut",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vehicle = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckInConfirm = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInNote = table.Column<string>(type: "varchar(255)", nullable: true),
                    CheckOutTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CheckOutConfirm = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckOutNote = table.Column<string>(type: "varchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    ReferenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuCheckInOut", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuCurrentCheckIn",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vehicle = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckInConfirm = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInNote = table.Column<string>(type: "varchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuCurrentCheckIn", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuNotification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Headings = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Subtitle = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Contents = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_tblBuNotification", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdArea",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
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
                    table.PrimaryKey("PK_tblMdArea", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdBankAccount",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    BankAccount = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    OwnerName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdBankAccount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdCompanyInfo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "varchar(50)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", nullable: true),
                    Email = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdCompanyInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDepartment",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
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
                    table.PrimaryKey("PK_tblMdDepartment", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDeviceGroup",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDeviceGroup", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDeviceType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDeviceType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdIncomeType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdIncomeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdItemType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
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
                    table.PrimaryKey("PK_tblMdItemType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdNotificationTemplate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TemplateCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    TemplateName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SubTitle = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdNotificationTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdOrderType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
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
                    table.PrimaryKey("PK_tblMdOrderType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPartner",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsCustomer = table.Column<bool>(type: "bit", nullable: false),
                    IsProvider = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TaxCode = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdPartner", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdPayType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdPayType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdStock",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
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
                    table.PrimaryKey("PK_tblMdStock", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdTracking",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_tblMdTracking", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblMdUnit",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
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
                    table.PrimaryKey("PK_tblMdUnit", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdVehicleType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
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
                    table.PrimaryKey("PK_tblMdVehicleType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccount",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdAccount", x => x.UserName);
                    table.ForeignKey(
                        name: "FK_tblAdAccount_tblAdAccountGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "tblAdAccountGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccountGroupRight",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RightId = table.Column<string>(type: "nvarchar(450)", nullable: true),
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
                    table.PrimaryKey("PK_tblAdAccountGroupRight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblAdAccountGroupRight_tblAdAccountGroup_GroupId",
                        column: x => x.GroupId,
                        principalTable: "tblAdAccountGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblAdAccountGroupRight_tblAdRight_RightId",
                        column: x => x.RightId,
                        principalTable: "tblAdRight",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "tblBuModuleAttachment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReferenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModuleType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttachmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuModuleAttachment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuModuleAttachment_tblBuAttachment_AttachmentId",
                        column: x => x.AttachmentId,
                        principalTable: "tblBuAttachment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDevice",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    TypeCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    GroupCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IpAddress = table.Column<string>(type: "varchar(50)", nullable: true),
                    IpPort = table.Column<int>(type: "int", nullable: false),
                    DevicePort = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "varchar(50)", nullable: true),
                    Password = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDevice", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdDevice_tblMdDeviceGroup_GroupCode",
                        column: x => x.GroupCode,
                        principalTable: "tblMdDeviceGroup",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblMdDevice_tblMdDeviceType_TypeCode",
                        column: x => x.TypeCode,
                        principalTable: "tblMdDeviceType",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblMdItem",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    UnitCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    TypeCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CostPrice = table.Column<double>(type: "float", nullable: true),
                    SellPrice = table.Column<double>(type: "float", nullable: true),
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
                    table.PrimaryKey("PK_tblMdItem", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdItem_tblMdItemType_TypeCode",
                        column: x => x.TypeCode,
                        principalTable: "tblMdItemType",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_tblMdItem_tblMdUnit_UnitCode",
                        column: x => x.UnitCode,
                        principalTable: "tblMdUnit",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "tblAdAccountRefreshToken",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpireTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AccountUserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdAccountRefreshToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblAdAccountRefreshToken_tblAdAccount_AccountUserName",
                        column: x => x.AccountUserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                });

            migrationBuilder.CreateTable(
                name: "tblBuComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Type = table.Column<string>(type: "varchar(255)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    AttachmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuComment_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuComment_tblBuAttachment_AttachmentId",
                        column: x => x.AttachmentId,
                        principalTable: "tblBuAttachment",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuComment_tblBuComment_PId",
                        column: x => x.PId,
                        principalTable: "tblBuComment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tblBuIncomeBill",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SenderName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Money = table.Column<double>(type: "float", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuIncomeBill", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdIncomeType_Type",
                        column: x => x.Type,
                        principalTable: "tblMdIncomeType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBill_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuNotificationDetail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NotificationId = table.Column<int>(type: "int", nullable: false),
                    ReceiverName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    IsSeen = table.Column<bool>(type: "bit", nullable: true),
                    IsSent = table.Column<bool>(type: "bit", nullable: true),
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
                    table.PrimaryKey("PK_tblBuNotificationDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuNotificationDetail_tblAdAccount_ReceiverName",
                        column: x => x.ReceiverName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuNotificationDetail_tblBuNotification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "tblBuNotification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblBuPayBill",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReceiverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Money = table.Column<double>(type: "float", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuPayBill", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuPayBill_tblMdPayType_Type",
                        column: x => x.Type,
                        principalTable: "tblMdPayType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "tblMdVehicle",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Tonnage = table.Column<double>(type: "float", nullable: false),
                    UnladenWeight = table.Column<double>(type: "float", nullable: true),
                    DriverUserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TypeCode = table.Column<string>(type: "nvarchar(20)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdVehicle", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdVehicle_tblAdAccount_DriverUserName",
                        column: x => x.DriverUserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblMdVehicle_tblMdVehicleType_TypeCode",
                        column: x => x.TypeCode,
                        principalTable: "tblMdVehicleType",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "tblBuItemFormula",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Cement = table.Column<double>(type: "float", nullable: true),
                    Stone = table.Column<double>(type: "float", nullable: true),
                    Sand = table.Column<double>(type: "float", nullable: true),
                    Admixture = table.Column<double>(type: "float", nullable: true),
                    Water = table.Column<double>(type: "float", nullable: true),
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
                    table.PrimaryKey("PK_tblBuItemFormula", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuItemFormula_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    ConcurrencyToken = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockItem_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItem_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockItemHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PrevAmount = table.Column<double>(type: "float", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: true),
                    ImportAmount = table.Column<double>(type: "float", nullable: true),
                    ExportAmount = table.Column<double>(type: "float", nullable: true),
                    ProcessDate = table.Column<DateTime>(type: "date", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockItemHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockItemHistory_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockItemHistory_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuModuleComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReferenceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ModuleType = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuModuleComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuModuleComment_tblBuComment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "tblBuComment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblSoImport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<string>(type: "char(2)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ImportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Discount = table.Column<double>(type: "float", nullable: true),
                    TaxVat = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    PayMoney = table.Column<double>(type: "float", nullable: true),
                    Debt = table.Column<double>(type: "float", nullable: true),
                    IsPaymentNow = table.Column<bool>(type: "bit", nullable: true),
                    PaymentType = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    ReceiverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ReceiverPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoImport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdPayType_PaymentType",
                        column: x => x.PaymentType,
                        principalTable: "tblMdPayType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImport_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoOrder",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrder", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoOrder_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_tblSoOrder_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuPayBillOrderImport",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PayBillCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ImportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuPayBillOrderImport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuPayBillOrderImport_tblBuPayBill_PayBillCode",
                        column: x => x.PayBillCode,
                        principalTable: "tblBuPayBill",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuPayBillOrderImport_tblSoImport_ImportCode",
                        column: x => x.ImportCode,
                        principalTable: "tblSoImport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockImport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    ImportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Vehicle = table.Column<string>(type: "varchar(50)", nullable: true),
                    ImportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockImport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuStockImport_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuStockImport_tblAdAccount_UpdateBy",
                        column: x => x.UpdateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuStockImport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockImport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockImport_tblSoImport_ImportCode",
                        column: x => x.ImportCode,
                        principalTable: "tblSoImport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoImportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Number = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoImportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoImportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoImportDetail_tblSoImport_ImportCode",
                        column: x => x.ImportCode,
                        principalTable: "tblSoImport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuCustomerCare",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CareDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CareContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuCustomerCare", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuCustomerCare_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuCustomerCare_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoExport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Type = table.Column<string>(type: "char(2)", nullable: true),
                    ExportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Discount = table.Column<double>(type: "float", nullable: true),
                    TaxVat = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true),
                    PayMoney = table.Column<double>(type: "float", nullable: true),
                    Debt = table.Column<double>(type: "float", nullable: true, computedColumnSql: "SumMoney - PayMoney"),
                    IsPaymentNow = table.Column<bool>(type: "bit", nullable: true),
                    PaymentType = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", nullable: true),
                    SenderName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SenderPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BankAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoExport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdBankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "tblMdBankAccount",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdIncomeType_PaymentType",
                        column: x => x.PaymentType,
                        principalTable: "tblMdIncomeType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblMdVehicle_VehicleCode",
                        column: x => x.VehicleCode,
                        principalTable: "tblMdVehicle",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExport_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoOrderDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: false),
                    ReleaseNumber = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "ReleaseNumber*Price"),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_tblSoOrderDetail_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoOrderProcess",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ActionCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PrevState = table.Column<string>(type: "varchar(50)", nullable: true),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoOrderProcess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoOrderProcess_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblSoOrderProcess_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoScale",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ScaleTypeCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CustomerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    CustomerPhone = table.Column<string>(type: "varchar(50)", nullable: true),
                    CustomerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    VehicleCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    DriverName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemName = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ItemNumber = table.Column<double>(type: "float", nullable: true),
                    ItemPrice = table.Column<double>(type: "float", nullable: true),
                    ItemProportion = table.Column<double>(type: "float", nullable: true),
                    ItemPercentageOfImpurities = table.Column<double>(type: "float", nullable: true),
                    ItemImpurities = table.Column<double>(type: "float", nullable: true),
                    ItemMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "ItemPrice * ItemNumber"),
                    Seal = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Weight1 = table.Column<double>(type: "float", nullable: true),
                    Weight2 = table.Column<double>(type: "float", nullable: true),
                    TimeWeight1 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TimeWeight2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Weight = table.Column<double>(type: "float", nullable: true),
                    Exchange = table.Column<double>(type: "float", nullable: true),
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
                    table.PrimaryKey("PK_tblSoScale", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoScale_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoScale_tblMdPartner_CustomerCode",
                        column: x => x.CustomerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoScale_tblSoOrder_OrderCode",
                        column: x => x.OrderCode,
                        principalTable: "tblSoOrder",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockImportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "Amount*Price"),
                    ImportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockImportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockImportDetail_tblAdAccount_CreateBy",
                        column: x => x.CreateBy,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                    table.ForeignKey(
                        name: "FK_tblBuStockImportDetail_tblBuStockImport_ImportCode",
                        column: x => x.ImportCode,
                        principalTable: "tblBuStockImport",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockImportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockImportDetail_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuIncomeBillOrderExport",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IncomeBillCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuIncomeBillOrderExport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBillOrderExport_tblBuIncomeBill_IncomeBillCode",
                        column: x => x.IncomeBillCode,
                        principalTable: "tblBuIncomeBill",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuIncomeBillOrderExport_tblSoExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblSoExport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockExport",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: true),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    OrderCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    PartnerPhoneNumber = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PartnerAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    ExportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockExport", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblBuStockExport_tblMdPartner_PartnerCode",
                        column: x => x.PartnerCode,
                        principalTable: "tblMdPartner",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockExport_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockExport_tblSoExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblSoExport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoExportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsMainItem = table.Column<bool>(type: "bit", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: true),
                    Number = table.Column<double>(type: "float", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    SumMoney = table.Column<double>(type: "float", nullable: true, computedColumnSql: "Number * Price"),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblSoExportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoExportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblSoExportDetail_tblSoExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblSoExport",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "tblSoScaleImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ScaleCode = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AttachmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblSoScaleImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblSoScaleImage_tblBuAttachment_AttachmentId",
                        column: x => x.AttachmentId,
                        principalTable: "tblBuAttachment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblSoScaleImage_tblSoScale_ScaleCode",
                        column: x => x.ScaleCode,
                        principalTable: "tblSoScale",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblBuStockExportDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExportCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    ItemCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    StockCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    ExportDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuStockExportDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuStockExportDetail_tblBuStockExport_ExportCode",
                        column: x => x.ExportCode,
                        principalTable: "tblBuStockExport",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockExportDetail_tblMdItem_ItemCode",
                        column: x => x.ItemCode,
                        principalTable: "tblMdItem",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblBuStockExportDetail_tblMdStock_StockCode",
                        column: x => x.StockCode,
                        principalTable: "tblMdStock",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccount_GroupId",
                table: "tblAdAccount",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountGroupRight_GroupId",
                table: "tblAdAccountGroupRight",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountGroupRight_RightId",
                table: "tblAdAccountGroupRight",
                column: "RightId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAdAccountRefreshToken_AccountUserName",
                table: "tblAdAccountRefreshToken",
                column: "AccountUserName");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuComment_AttachmentId",
                table: "tblBuComment",
                column: "AttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuComment_CreateBy",
                table: "tblBuComment",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuComment_PId",
                table: "tblBuComment",
                column: "PId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCustomerCare_OrderCode",
                table: "tblBuCustomerCare",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCustomerCare_PartnerCode",
                table: "tblBuCustomerCare",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_BankAccountId",
                table: "tblBuIncomeBill",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_CreateBy",
                table: "tblBuIncomeBill",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_PartnerCode",
                table: "tblBuIncomeBill",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBill_Type",
                table: "tblBuIncomeBill",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBillOrderExport_ExportCode",
                table: "tblBuIncomeBillOrderExport",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuIncomeBillOrderExport_IncomeBillCode",
                table: "tblBuIncomeBillOrderExport",
                column: "IncomeBillCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuItemFormula_ItemCode",
                table: "tblBuItemFormula",
                column: "ItemCode",
                unique: true,
                filter: "[ItemCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuModuleAttachment_AttachmentId",
                table: "tblBuModuleAttachment",
                column: "AttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuModuleComment_CommentId",
                table: "tblBuModuleComment",
                column: "CommentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuNotificationDetail_NotificationId",
                table: "tblBuNotificationDetail",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuNotificationDetail_ReceiverName",
                table: "tblBuNotificationDetail",
                column: "ReceiverName");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_BankAccountId",
                table: "tblBuPayBill",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_CreateBy",
                table: "tblBuPayBill",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_PartnerCode",
                table: "tblBuPayBill",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBill_Type",
                table: "tblBuPayBill",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBillOrderImport_ImportCode",
                table: "tblBuPayBillOrderImport",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuPayBillOrderImport_PayBillCode",
                table: "tblBuPayBillOrderImport",
                column: "PayBillCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_ExportCode",
                table: "tblBuStockExport",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_PartnerCode",
                table: "tblBuStockExport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExport_StockCode",
                table: "tblBuStockExport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExportDetail_ExportCode",
                table: "tblBuStockExportDetail",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExportDetail_ItemCode",
                table: "tblBuStockExportDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockExportDetail_StockCode",
                table: "tblBuStockExportDetail",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_CreateBy",
                table: "tblBuStockImport",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_ImportCode",
                table: "tblBuStockImport",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_PartnerCode",
                table: "tblBuStockImport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_StockCode",
                table: "tblBuStockImport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImport_UpdateBy",
                table: "tblBuStockImport",
                column: "UpdateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImportDetail_CreateBy",
                table: "tblBuStockImportDetail",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImportDetail_ImportCode",
                table: "tblBuStockImportDetail",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImportDetail_ItemCode",
                table: "tblBuStockImportDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockImportDetail_StockCode",
                table: "tblBuStockImportDetail",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItem_ItemCode",
                table: "tblBuStockItem",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItem_StockCode",
                table: "tblBuStockItem",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemHistory_ItemCode",
                table: "tblBuStockItemHistory",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblBuStockItemHistory_StockCode",
                table: "tblBuStockItemHistory",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdDevice_GroupCode",
                table: "tblMdDevice",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdDevice_TypeCode",
                table: "tblMdDevice",
                column: "TypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdItem_TypeCode",
                table: "tblMdItem",
                column: "TypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdItem_UnitCode",
                table: "tblMdItem",
                column: "UnitCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdVehicle_DriverUserName",
                table: "tblMdVehicle",
                column: "DriverUserName");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdVehicle_TypeCode",
                table: "tblMdVehicle",
                column: "TypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_BankAccountId",
                table: "tblSoExport",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_OrderCode",
                table: "tblSoExport",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_PartnerCode",
                table: "tblSoExport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_PaymentType",
                table: "tblSoExport",
                column: "PaymentType");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_StockCode",
                table: "tblSoExport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_VehicleCode",
                table: "tblSoExport",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportDetail_ExportCode",
                table: "tblSoExportDetail",
                column: "ExportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExportDetail_ItemCode",
                table: "tblSoExportDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_BankAccountId",
                table: "tblSoImport",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_PartnerCode",
                table: "tblSoImport",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_PaymentType",
                table: "tblSoImport",
                column: "PaymentType");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_StockCode",
                table: "tblSoImport",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImport_VehicleCode",
                table: "tblSoImport",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImportDetail_ImportCode",
                table: "tblSoImportDetail",
                column: "ImportCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoImportDetail_ItemCode",
                table: "tblSoImportDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_PartnerCode",
                table: "tblSoOrder",
                column: "PartnerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_VehicleCode",
                table: "tblSoOrder",
                column: "VehicleCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderDetail_ItemCode",
                table: "tblSoOrderDetail",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderDetail_OrderCode",
                table: "tblSoOrderDetail",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderProcess_CreateBy",
                table: "tblSoOrderProcess",
                column: "CreateBy");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderProcess_OrderCode",
                table: "tblSoOrderProcess",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_CustomerCode",
                table: "tblSoScale",
                column: "CustomerCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_ItemCode",
                table: "tblSoScale",
                column: "ItemCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_OrderCode",
                table: "tblSoScale",
                column: "OrderCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScaleImage_AttachmentId",
                table: "tblSoScaleImage",
                column: "AttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScaleImage_ScaleCode",
                table: "tblSoScaleImage",
                column: "ScaleCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_tblSequenceExport");

            migrationBuilder.DropTable(
                name: "_tblSequenceImport");

            migrationBuilder.DropTable(
                name: "_tblSequenceIncomeBill");

            migrationBuilder.DropTable(
                name: "_tblSequenceOrder");

            migrationBuilder.DropTable(
                name: "_tblSequencePartner");

            migrationBuilder.DropTable(
                name: "_tblSequencePayBill");

            migrationBuilder.DropTable(
                name: "_tblSequenceScale");

            migrationBuilder.DropTable(
                name: "_tblSequenceStockExport");

            migrationBuilder.DropTable(
                name: "_tblSequenceStockImport");

            migrationBuilder.DropTable(
                name: "tblAdAccountGroupRight");

            migrationBuilder.DropTable(
                name: "tblAdAccountRefreshToken");

            migrationBuilder.DropTable(
                name: "tblAdLoginHistory");

            migrationBuilder.DropTable(
                name: "tblAdMenu");

            migrationBuilder.DropTable(
                name: "tblAdMessage");

            migrationBuilder.DropTable(
                name: "tblAdSystemParameter");

            migrationBuilder.DropTable(
                name: "tblBuCheckInOut");

            migrationBuilder.DropTable(
                name: "tblBuCurrentCheckIn");

            migrationBuilder.DropTable(
                name: "tblBuCustomerCare");

            migrationBuilder.DropTable(
                name: "tblBuIncomeBillOrderExport");

            migrationBuilder.DropTable(
                name: "tblBuItemFormula");

            migrationBuilder.DropTable(
                name: "tblBuModuleAttachment");

            migrationBuilder.DropTable(
                name: "tblBuModuleComment");

            migrationBuilder.DropTable(
                name: "tblBuNotificationDetail");

            migrationBuilder.DropTable(
                name: "tblBuPayBillOrderImport");

            migrationBuilder.DropTable(
                name: "tblBuStockExportDetail");

            migrationBuilder.DropTable(
                name: "tblBuStockImportDetail");

            migrationBuilder.DropTable(
                name: "tblBuStockItem");

            migrationBuilder.DropTable(
                name: "tblBuStockItemHistory");

            migrationBuilder.DropTable(
                name: "tblMdArea");

            migrationBuilder.DropTable(
                name: "tblMdCompanyInfo");

            migrationBuilder.DropTable(
                name: "tblMdDepartment");

            migrationBuilder.DropTable(
                name: "tblMdDevice");

            migrationBuilder.DropTable(
                name: "tblMdNotificationTemplate");

            migrationBuilder.DropTable(
                name: "tblMdOrderType");

            migrationBuilder.DropTable(
                name: "tblMdTracking");

            migrationBuilder.DropTable(
                name: "tblSoExportDetail");

            migrationBuilder.DropTable(
                name: "tblSoImportDetail");

            migrationBuilder.DropTable(
                name: "tblSoOrderDetail");

            migrationBuilder.DropTable(
                name: "tblSoOrderProcess");

            migrationBuilder.DropTable(
                name: "tblSoScaleImage");

            migrationBuilder.DropTable(
                name: "tblAdRight");

            migrationBuilder.DropTable(
                name: "tblBuIncomeBill");

            migrationBuilder.DropTable(
                name: "tblBuComment");

            migrationBuilder.DropTable(
                name: "tblBuNotification");

            migrationBuilder.DropTable(
                name: "tblBuPayBill");

            migrationBuilder.DropTable(
                name: "tblBuStockExport");

            migrationBuilder.DropTable(
                name: "tblBuStockImport");

            migrationBuilder.DropTable(
                name: "tblMdDeviceGroup");

            migrationBuilder.DropTable(
                name: "tblMdDeviceType");

            migrationBuilder.DropTable(
                name: "tblSoScale");

            migrationBuilder.DropTable(
                name: "tblBuAttachment");

            migrationBuilder.DropTable(
                name: "tblSoExport");

            migrationBuilder.DropTable(
                name: "tblSoImport");

            migrationBuilder.DropTable(
                name: "tblMdItem");

            migrationBuilder.DropTable(
                name: "tblMdIncomeType");

            migrationBuilder.DropTable(
                name: "tblSoOrder");

            migrationBuilder.DropTable(
                name: "tblMdBankAccount");

            migrationBuilder.DropTable(
                name: "tblMdPayType");

            migrationBuilder.DropTable(
                name: "tblMdStock");

            migrationBuilder.DropTable(
                name: "tblMdItemType");

            migrationBuilder.DropTable(
                name: "tblMdUnit");

            migrationBuilder.DropTable(
                name: "tblMdPartner");

            migrationBuilder.DropTable(
                name: "tblMdVehicle");

            migrationBuilder.DropTable(
                name: "tblAdAccount");

            migrationBuilder.DropTable(
                name: "tblMdVehicleType");

            migrationBuilder.DropTable(
                name: "tblAdAccountGroup");
        }
    }
}
