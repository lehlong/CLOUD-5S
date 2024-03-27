using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DMS.CORE.Common.SQ;

namespace DMS.CORE
{
    public class AppDbContext : DbContext
    {
        protected IHttpContextAccessor HttpContextAccessor { get; }
        public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            this.HttpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyAllConfigurations();
            foreach (var type in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(ISoftDeleteEntity).IsAssignableFrom(type.ClrType))
                    modelBuilder.SetSoftDeleteFilter(type.ClrType);
            }
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies(false);
        }

        public string UserProvider
        {
            get
            {
                //TODO
                return "";
            }
        }

        public Func<DateTime> TimestampProvider { get; set; } = ()
            => DateTime.Now;

        public override int SaveChanges()
        {
            TrackChanges();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            TrackChanges();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void TrackChanges()
        {
            var tokens = HttpContextAccessor?.HttpContext?.Request?.Headers["Authorization"].ToString()?.Split(" ")?.ToList();
            string user = null;
            if (tokens != null)
            {
                var token = tokens.FirstOrDefault(x => x != "Bearer");
                if (!string.IsNullOrWhiteSpace(token) && token != "null")
                {
                    JwtSecurityTokenHandler tokenHandler = new();
                    JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                    var claim = securityToken.Claims;
                    var result = claim.FirstOrDefault(x => x.Type == ClaimTypes.Name);
                    user = result?.Value;
                }
            }

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                if (entry.Entity is IBaseEntity)
                {
                    var auditable = entry.Entity as IBaseEntity;
                    if (entry.State == EntityState.Added)
                    {
                        auditable.CreateBy = user;
                        auditable.CreateDate = TimestampProvider();
                    }
                    else
                    {
                        this.Entry(auditable).Property(x => x.CreateBy).IsModified = false;
                        this.Entry(auditable).Property(x => x.CreateDate).IsModified = false;
                        auditable.UpdateBy = user;
                        auditable.UpdateDate = TimestampProvider();
                    }
                }

                if (entry.Entity is ISoftDeleteEntity)
                {
                    var entity = entry.Entity as ISoftDeleteEntity;
                    entity.IsDeleted = false;
                }
            }

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Deleted))
            {
                if (entry.Entity is ISoftDeleteEntity)
                {
                    var deleteEntity = entry.Entity as ISoftDeleteEntity;
                    entry.State = EntityState.Unchanged;
                    deleteEntity.IsDeleted = true;
                    deleteEntity.DeleteBy = user;
                    deleteEntity.DeleteDate = TimestampProvider();
                }
            }
        }

        #region System Manage
        public DbSet<tblAdBusiness> tblAdBusiness { get; set; }
        public DbSet<tblAdOrganize> tblAdOrganize { get; set; }
        public DbSet<tblAdAccount> tblAdAccount { get; set; }
        public DbSet<tblAdAccountGroup> tblAdAccountGroup { get; set; }
        public DbSet<tblAdMenu> tblAdMenu { get; set; }
        public DbSet<tblAdRight> tblAdRight { get; set; }
        public DbSet<tblAdMessage> tblAdMessage { get; set; }
        public DbSet<tblAdAccountGroupRight> tblAdAccountGroupRight { get; set; }
        public DbSet<tblAdAccountRefreshToken> tblAdAccountRefreshToken { get; set; }
        public DbSet<tblAdSystemParameter> tblAdSystemParameter { get; set; }
        public DbSet<tblAdLoginHistory> tblAdLoginHistory { get; set; }
        public DbSet<tblAdActionLog> tblAdActionLog { get; set; }
        public DbSet<tblAdAppVersion> tblAdAppVersion { get; set; }

        #endregion

        #region Master Data
        public DbSet<tblMdItem> tblMdItem { get; set; }
        public DbSet<tblMdUnit> tblMdUnit { get; set; }
        public DbSet<tblMdItemType> tblMdItemType { get; set; }
        public DbSet<tblMdPartner> tblMdPartner { get; set; }
        public DbSet<tblMdVehicleType> tblMdVehicleType { get; set; }
        public DbSet<tblMdArea> tblMdArea { get; set; }
        public DbSet<tblMdDepartment> tblMdDepartment { get; set; }
        public DbSet<tblMdVehicle> tblMdVehicle { get; set; }
        public DbSet<tblMdDevice> tblMdDevice { get; set; }
        public DbSet<tblMdDeviceGroup> tblMdDeviceGroup { get; set; }
        public DbSet<tblMdDeviceType> tblMdDeviceType { get; set; }
        public DbSet<tblMdNotificationTemplate> tblMdNotificationTemplate { get; set; }
        public DbSet<tblMdCompanyInfo> tblMdCompanyInfo { get; set; }
        public DbSet<tblBuTracking> tblBuTracking { get; set; }
        public DbSet<tblMdTransportAgency> tblMdTransportAgency { get; set; }
        public DbSet<tblMdWorkingShift> tblMdWorkingShift { get; set; }
        public DbSet<tblMdShip> tblMdShip { get; set; }
        public DbSet<tblMdPourSection> tblMdPourSection { get; set; }
        public DbSet<tblMdPourLine> tblMdPourLine { get; set; }
        public DbSet<tblMdBerth> tblMdBerth { get; set; }
        public DbSet<tblMdRfid> tblMdRfid { get; set; }
        public DbSet<tblMdCompany> tblMdCompany { get; set; }
        public DbSet<tblMdPosition> tblMdPosition { get; set; }
        public DbSet<tblMdStock> tblMdStock { get; set; }
        public DbSet<tblMdChipper> tblMdChipper { get; set; }
        #endregion

        #region Sale Order
        public DbSet<tblSoOrder> tblSoOrder { get; set; }
        public DbSet<tblSoOrderDetail> tblSoOrderDetail { get; set; }
        public DbSet<tblSoScale> tblSoScale { get; set; }
        public DbSet<tblSoOrderProcess> tblSoOrderProcess { get; set; }
        public DbSet<tblSoScaleImage> tblSoScaleImage { get; set; }
        public DbSet<tblSoOrderBatch> tblSoOrderBatch { get; set; }
        public DbSet<tblSoOrderBatchDetail> tblSoOrderBatchDetail { get; set; }
        #endregion

        #region Bussiness Unit
        public DbSet<tblBuItemFormula> tblBuItemFormula { get; set; }
        public DbSet<tblBuNotification> tblBuNotification { get; set; }
        public DbSet<tblBuNotificationDetail> tblBuNotificationDetail { get; set; }
        public DbSet<tblBuCurrentCheckIn> tblBuCurrentCheckIn { get; set; }
        public DbSet<tblBuCheckInOut> tblBuCheckInOut { get; set; }
        public DbSet<tblBuAttachment> tblBuAttachment { get; set; }
        public DbSet<tblBuStockImport> tblBuStockImport { get; set; }
        public DbSet<tblBuStockImportDetail> tblBuStockImportDetail { get; set; }
        public DbSet<tblBuStockExport> tblBuStockExport { get; set; }
        public DbSet<tblBuStockExportDetail> tblBuStockExportDetail { get; set; }
        public DbSet<tblBuStockItem> tblBuStockItem { get; set; }
        public DbSet<tblBuStockItemHistory> tblBuStockItemHistory { get; set; }
        public DbSet<tblBuComment> tblBuComment { get; set; }
        public DbSet<tblBuModuleComment> tblBuModuleComment { get; set; }
        public DbSet<tblBuModuleAttachment> tblBuModuleAttachment { get; set; }
        public DbSet<tblBuContract> tblBuContract { get; set; }
        public DbSet<tblBuContractDetail> tblBuContractDetail { get; set; }
        public DbSet<tblBuManufacture> tblBuManufacture { get; set; }
        public DbSet<tblBuMoisture> tblBuMoisture { get; set; }
        public DbSet<tblBuFolder> tblBuFolder { get; set; }
        public DbSet<tblBuOtp> tblBuOtp { get; set; }
        public DbSet<tblBuStockItemDetail> tblBuStockItemDetail { get; set; }
        public DbSet<tblBuManufactureLatch> tblBuManufactureLatch { get; set; }
        public DbSet<tblBuStockItemTransferLog> tblBuStockItemTransferLog { get; set; }
        public DbSet<tblBuManufactureChipper> tblBuManufactureChipper { get; set; }
        public DbSet<tblBuTrackingLog> tblBuTrackingLog { get; set; }

        #endregion

        #region Sequence Table
        public DbSet<_tblSequenceOrder> _tblSequenceOrder { get; set; }
        public DbSet<_tblSequenceOrderBatch> _tblSequenceOrderBatch { get; set; }
        public DbSet<_tblSequenceImport> _tblSequenceImport { get; set; }
        public DbSet<_tblSequenceExport> _tblSequenceExport { get; set; }
        public DbSet<_tblSequenceScale> _tblSequenceScale { get; set; }
        public DbSet<_tblSequenceStockImport> _tblSequenceStockImport { get; set; }
        public DbSet<_tblSequenceStockExport> _tblSequenceStockExport { get; set; }
        public DbSet<_tblSequencePartner> _tblSequencePartner { get; set; }
        public DbSet<_tblSequenceContract> _tblSequenceContract { get; set; }

        #endregion
    }
}
