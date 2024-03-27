using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.BUSINESS.Filter.SO;
using DMS.CORE;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Reflection;

namespace DMS.BUSINESS.Common.Util
{
    public class ExcelExporter
    {
        private readonly AppDbContext _dbContext;
        public ExcelExporter(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<byte[]> ExportToExcel<T>(IEnumerable<T> data, ExcelExportType type)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(type.ToString());

            var properties = typeof(T).GetProperties()
                .Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                .ToList();

            var companyInfo = await _dbContext.tblMdCompanyInfo.FirstOrDefaultAsync();
            worksheet.Cells["A1"].Value = $"{companyInfo?.Name?.ToUpper()}";

            var exportType = string.Empty;

            switch (type)
            {
                case ExcelExportType.XUAT_NHAP_TON:
                    exportType = "XUẤT NHẬP TỒN";
                    break;
                case ExcelExportType.CS_KHACHHANG:
                    exportType = "CHĂM SÓC KHÁCH HÀNG";
                    break;
                case ExcelExportType.VAO_RA:
                    exportType = "DỮ LIỆU VÀO RA";
                    break;
                case ExcelExportType.PHIEU_NHAP_KHO:
                    exportType = "PHIẾU NHẬP KHO";
                    break;
                case ExcelExportType.PHIEU_XUAT_KHO:
                    exportType = "PHIẾU XUẤT KHO";
                    break;
                case ExcelExportType.PHIEU_TRON:
                    exportType = "PHIẾU TRỘN";
                    break;
                case ExcelExportType.DON_HANG:
                    exportType = "ĐƠN HÀNG";
                    break;
                case ExcelExportType.PHIEU_CAN:
                    exportType = "PHIẾU CÂN";
                    break;
                case ExcelExportType.PHIEU_XUAT_HANG:
                    exportType = "DANH SÁCH PHIẾU XUẤT HÀNG";
                    break;
                case ExcelExportType.TRACKING:
                    exportType = "QUẢN LÝ HÀNH TRÌNH";
                    break;
                case ExcelExportType.KHACH_HANG:
                    exportType = "KHÁCH HÀNG";
                    break;
                case ExcelExportType.CONG_NO:
                    exportType = "QUẢN LÝ CÔNG NỢ";
                    break;
                case ExcelExportType.TON_KHO:
                    exportType = "QUẢN LÝ TỒN KHO";
                    break;
                case ExcelExportType.DSTHONG_BAO:
                    exportType = "DANH SÁCH THÔNG BÁO";
                    break;
                case ExcelExportType.DON_VI_TINH:
                    exportType = "DANH SÁCH ĐƠN VỊ TÍNH";
                    break;
                case ExcelExportType.DS_KHO:
                    exportType = "DANH SÁCH KHO";
                    break;
                case ExcelExportType.DSLOAI_SP:
                    exportType = "DANH SÁCH LOẠI SẢN PHẨM";
                    break;
                case ExcelExportType.DSKHU_VUC:
                    exportType = "DANH SÁCH KHU VỰC";
                    break;
                case ExcelExportType.DSMAY_TRON:
                    exportType = "DANH SÁCH MÁY TRỘN";
                    break;
                case ExcelExportType.SAN_PHAM:
                    exportType = "DANH SÁCH SẢN PHẨM";
                    break;
                case ExcelExportType.HINH_THUC_DO:
                    exportType = "DANH SÁCH HÌNH THỨC ĐỔ";
                    break;
                case ExcelExportType.LOAI_DON_HANG:
                    exportType = "DANH SÁCH LOẠI ĐƠN HÀNG";
                    break;
                case ExcelExportType.PHONG_BAN:
                    exportType = "DANH SÁCH PHÒNG BAN";
                    break;
                case ExcelExportType.LOAI_PHUONG_TIEN:
                    exportType = "DANH SÁCH LOẠI PHƯƠNG TIỆN";
                    break;
                case ExcelExportType.PHUONG_TIEN:
                    exportType = "DANH SÁCH PHƯƠNG TIỆN";
                    break;
                case ExcelExportType.DSLOAI_THIETBI:
                    exportType = "DANH SÁCH LOẠI THIẾT BỊ";
                    break;
                case ExcelExportType.DSNHOM_THIETBI:
                    exportType = "DANH SÁCH NHÓM THIẾT BỊ";
                    break;
                case ExcelExportType.NHOM_TAI_KHOAN:
                    exportType = "DANH SÁCH NHÓM TÀI KHOẢN";
                    break;
                case ExcelExportType.TAI_KHOAN:
                    exportType = "DANH SÁCH TÀI KHOẢN";
                    break;
                case ExcelExportType.CONG_NO_THU:
                    exportType = "DANH SÁCH CÔNG NỢ CẦN THU";
                    break;
                case ExcelExportType.CONG_NO_CHI:
                    exportType = "DANH SÁCH CÔNG NỢ CẦN CHI";
                    break;
                case ExcelExportType.PHIEU_THU:
                    exportType = "DANH SÁCH PHIẾU THU";
                    break;
                case ExcelExportType.PHIEU_CHI:
                    exportType = "DANH SÁCH PHIẾU CHI";
                    break;
                case ExcelExportType.DSLOAI_PHIEU_THU:
                    exportType = "DANH SÁCH LOẠI PHIẾU THU";
                    break;
                case ExcelExportType.DSLOAI_PHIEU_CHI:
                    exportType = "DANH SÁCH LOẠI PHIẾU CHI";
                    break;
                case ExcelExportType.DSTAI_KHOAN_NGAN_HANG:
                    exportType = "DANH SÁCH TÀI KHOẢN NGÂN HÀNG";
                    break;
                case ExcelExportType.BANG_KE_BAN_HANG_TRONG_NGAY:
                    exportType = "BẢNG KÊ BÁN HÀNG TRONG NGÀY";
                    break;
                case ExcelExportType.DSHOP_DONG:
                    exportType = "DANH SÁCH HỢP ĐỒNG";
                    break;
                case ExcelExportType.DS_TRAM_VE_TINH:
                    exportType = "DANH SÁCH TRẠM VỆ TINH";
                    break;
                case ExcelExportType.CHINH_SACH_GIA:
                    exportType = "DANH SÁCH CHÍNH SÁCH GIÁ";
                    break;
                case ExcelExportType.CA_LAM_VIEC:
                    exportType = "DANH SÁCH CA LÀM VIỆC";
                    break;
                case ExcelExportType.DS_MAY_BAM:
                    exportType = "DANH SÁCH MÁY BĂM";
                    break;
                case ExcelExportType.DS_TAU:
                    exportType = "DANH SÁCH TÀU";
                    break;
                case ExcelExportType.DS_KHU_DO_HANG:
                    exportType = "DANH SÁCH KHU ĐỔ HÀNG";
                    break;
                case ExcelExportType.DS_DAY_DO_HANG:
                    exportType = "DANH SÁCH DÃY ĐỔ HÀNG";
                    break;
                case ExcelExportType.DS_CAU_CANG:
                    exportType = "DANH SÁCH CẦU TẠI CẢNG";
                    break;
                case ExcelExportType.DS_RFID:
                    exportType = "DANH SÁCH RFID";
                    break;
                case ExcelExportType.DS_Company:
                    exportType = "DANH SÁCH TRẠM VỆ TINH";
                    break;
                case ExcelExportType.DS_Chucvu:
                    exportType = "DANH SÁCH chức vụ";
                    break;
                case ExcelExportType.PHIEU_NHAP_HANG:
                    exportType = "DANH SÁCH PHIẾU NHẬP HÀNG";
                    break;
                case ExcelExportType.DOT_XUAT_HANG:
                    exportType = "DANH SÁCH ĐỢT XUẤT HÀNG";
                    break;
                case ExcelExportType.BC_Tramcan:
                    exportType = "TRỌNG LƯỢNG CÂN";
                    break;
                case ExcelExportType.BAO_CAO_TON_KHO:
                    exportType = "BÁO CÁO TỒN KHO";
                    break;
                case ExcelExportType.NHAP_XUAT:
                    exportType = "DỮ LIỆU GỖ NHẬP VÀ SẢN XUẤT";
                    break;
            }

            worksheet.Cells["A3"].Value = $"BÁO CÁO TỔNG HỢP {exportType}";
            worksheet.Cells["A3"].Style.Font.Bold = true;

            // Tạo tiêu đề cho các cột
            int colIndex = 1;
            var rowIndex = 6;
            CreateHeader(properties, worksheet, rowIndex, ref colIndex);



            using (var r = worksheet.Cells[1, 1, 1, colIndex - 1])
            {
                r.Merge = true;
                r.Style.Font.Color.SetColor(Color.White);
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                r.Style.Fill.PatternType = ExcelFillStyle.Solid;
                r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
            }
            using (var r = worksheet.Cells[3, 1, 3, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            using (var r = worksheet.Cells[4, 1, 4, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            // Ghi dữ liệu vào các dòng
            rowIndex++;
            foreach (var item in data)
            {
                colIndex = 1;
                ExportObjectToExcel(item, properties, worksheet, ref rowIndex, ref colIndex);
            }
            worksheet.Cells.AutoFitColumns();

            return await package.GetAsByteArrayAsync();
        }
        public async Task<ExcelPackage> PackageData<T>(IEnumerable<T> data, ExcelExportType type, OrderScaleExportFilter filter)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(type.ToString());

            var properties = typeof(T).GetProperties()
                .Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                .ToList();

            var companyInfo = await _dbContext.tblMdCompanyInfo.FirstOrDefaultAsync();
            worksheet.Cells["A1"].Value = $"{companyInfo?.Name?.ToUpper()}";

            var exportType = string.Empty;

            switch (type)
            {
                case ExcelExportType.PHIEU_CAN:
                    exportType = "PHIẾU CÂN";
                    break;
                default:
                    break;
            }

            worksheet.Cells["A3"].Value = $"BÁO CÁO TỔNG HỢP {exportType} {filter.FromDate?.ToString("dd/MM/yyyy")} - {filter.ToDate?.ToString("dd/MM/yyyy")}";
            worksheet.Cells["A3"].Style.Font.Bold = true;
            worksheet.Cells["A3"].Style.Font.Size = 12;

            // Tạo tiêu đề cho các cột
            int colIndex = 1;
            var rowIndex = 6;
            CreateHeader(properties, worksheet, rowIndex, ref colIndex);



            using (var r = worksheet.Cells[1, 1, 1, colIndex - 1])
            {
                r.Merge = true;
                r.Style.Font.Color.SetColor(Color.White);
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                r.Style.Fill.PatternType = ExcelFillStyle.Solid;
                r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
            }
            using (var r = worksheet.Cells[3, 1, 3, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            using (var r = worksheet.Cells[4, 1, 4, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            // Ghi dữ liệu vào các dòng
            rowIndex++;
            foreach (var item in data)
            {
                colIndex = 1;
                ExportObjectToExcel(item, properties, worksheet, ref rowIndex, ref colIndex);
            }
            worksheet.Cells.AutoFitColumns();

            return package;
        }
        public async Task<byte[]> ExportReportToExcel(TotalReportScaleByRegionDto data, List<OrderScaleExportDto> data_phieucan, OrderScaleExportFilter filter)
        {
            using var package = await PackageData(data_phieucan, ExcelExportType.PHIEU_CAN, filter);

            var worksheet = package.Workbook.Worksheets.Add("BÁO CÁO TỔNG HỢP TRỌNG LƯỢNG CÂN");

            worksheet.Cells.AutoFitColumns();
            int sizeHeader1 = 11;
            int sizeHeader2 = 11;
            int sizeBody = 11;
            const string klg = "Khối Lượng";
            const string tle = "Tỉ Lệ %";
            worksheet.Cells.AutoFitColumns();

            #region Header
            int row = 1;
            row += 2;

            worksheet.Cells[row, 1, row + 2, 1].Merge = true;
            worksheet.Cells[row, 1, row + 2, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Cells[row, 1, row + 2, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row, 1, row + 2, 1].Value = "Ngày";
            worksheet.Cells[row, 1, row + 2, 1].Style.Font.Bold = true;
            worksheet.Cells[row, 1, row + 2, 1].Style.Font.Size = sizeHeader1;

            int colHeader1 = 2;
            int colHeader2 = 2;
            // dynamic Data
            List<string> areaList = data.TotalWegthAndPercent.Select(item => item.AreaName).Distinct().ToList();
            int bobIndex = areaList.IndexOf("Khu vực khác");
            if (bobIndex != -1)
            {
                areaList.RemoveAt(bobIndex);
                areaList.Insert(0, "Khu vực khác");
            }
            foreach (var area in areaList)
            {
                //Area
                var itemList = data.TotalWegthAndPercent
                                .Where(item => item.AreaName == area)
                                .Select(item => item.ItemName)
                                .Distinct()
                                .ToList();
                var colSpan = itemList.Count();
                worksheet.Cells[row, colHeader1, row, colHeader1 + (colSpan * 2) - 1].Merge = true;
                worksheet.Cells[row, colHeader1, row, colHeader1 + (colSpan * 2) - 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[row, colHeader1, row, colHeader1 + (colSpan * 2) - 1].Value = area;
                worksheet.Cells[row, colHeader1, row, colHeader1 + (colSpan * 2) - 1].Style.Font.Bold = true;/////
                worksheet.Cells[row, colHeader1, row, colHeader1 + (colSpan * 2) - 1].Style.Font.Size = sizeHeader1;
                colHeader1 += (colSpan * 2);
                //Item
                foreach (var item in itemList)
                {
                    worksheet.Cells[row + 1, colHeader2, row + 1, colHeader2 + 1].Merge = true;
                    worksheet.Cells[row + 1, colHeader2, row + 1, colHeader2 + 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row + 1, colHeader2, row + 1, colHeader2 + 1].Value = item;
                    worksheet.Cells[row + 1, colHeader2, row + 1, colHeader2 + 1].Style.Font.Bold = true;
                    worksheet.Cells[row + 1, colHeader2, row + 1, colHeader2 + 1].Style.Font.Size = sizeHeader2;
                    //KL - TL
                    for (int i = 0; i < 2; i++)
                    {
                        worksheet.Cells[row + 2, colHeader2 + i, row + 2, colHeader2 + i].Value = i == 0 ? klg : tle;
                        worksheet.Cells[row + 2, colHeader2 + i, row + 2, colHeader2 + i].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                        worksheet.Cells[row + 2, colHeader2 + i, row + 2, colHeader2 + i].Style.Font.Bold = true;
                        worksheet.Cells[row + 2, colHeader2 + i, row + 2, colHeader2 + i].Style.Font.Size = sizeHeader2;

                    }
                    colHeader2 += 2;
                }
            }
            //Title
            worksheet.Cells[1, 1, 1, colHeader1].Merge = true;
            worksheet.Cells[1, 1, 1, colHeader1].Value = $"BÁO CÁO TỔNG HỢP TRỌNG LƯỢNG CÂN {filter.FromDate?.ToString("dd/MM/yyyy")} - {filter.ToDate?.ToString("dd/MM/yyyy")}";
            worksheet.Cells[1, 1, 1, colHeader1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 1, colHeader1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Cells[1, 1, 1, colHeader1].Style.Font.Bold = true;
            worksheet.Cells[1, 1, 1, colHeader1].Style.Font.Size = 26;
            //Tổng cộng
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Merge = true;
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Value = "Tổng cộng";
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Style.Font.Bold = true;
            worksheet.Cells[row, colHeader1, row + 2, colHeader1].Style.Font.Size = sizeHeader1;

            // Body
            int rowBody = 6;

            foreach (var dataRow in data.ViewListReportScaleByRegionDto)
            {
                worksheet.Cells[rowBody, 1].Value = dataRow.Date;
                worksheet.Cells[rowBody, 1].Style.Font.Size = sizeBody;
                worksheet.Cells[rowBody, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowBody, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                if (dataRow.ReportScaleByRegionDtos.Count > 0)
                {
                    // tìm data
                    for (int col = 2; col <= colHeader1; col++)
                    {
                        // Lấy header
                        string klg_tle = worksheet.Cells[row + 2, col].Value.ToString();
                        string itemName = worksheet.Cells[row + 1, col].Value.ToString();
                        string areaName = worksheet.Cells[row, col].Value.ToString();

                        var dataFind = dataRow.ReportScaleByRegionDtos.Where(report =>
                            report.AreaName == areaName && report.ItemName == itemName).ToList();

                        if (col == colHeader1)
                        {
                            worksheet.Cells[rowBody, col].Value = dataRow.TotalWeight.ToString();
                        }
                        if (dataFind.Count == 1)
                        {
                            if (klg_tle == klg)
                            {
                                // Làm tròn nếu cần
                                if (double.TryParse(dataFind[0].Weight.ToString(), out double parsedNumber))
                                {
                                    worksheet.Cells[rowBody, col].Value = parsedNumber;
                                }
                                else
                                {
                                    worksheet.Cells[rowBody, col].Value = dataFind[0]?.Weight;
                                }
                            }
                            else
                            {
                                if (dataFind[0].Percent != null)
                                {
                                    if (double.TryParse(dataFind[0].Percent.ToString(), out double parsedNumber))
                                    {
                                        worksheet.Cells[rowBody, col].Value = parsedNumber.ToString("N2");
                                    }
                                    else
                                    {
                                        worksheet.Cells[rowBody, col].Value = dataFind[0]?.Percent;
                                    }
                                }
                                else
                                {
                                    worksheet.Cells[rowBody, col].Value = null;
                                }
                            }
                        }
                        worksheet.Cells[rowBody, col].Style.Font.Size = sizeBody;
                        worksheet.Cells[rowBody, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                        worksheet.Cells[rowBody, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                    }
                }
                else
                {
                    worksheet.Cells[rowBody, colHeader1].Value = "0";
                    worksheet.Cells[rowBody, colHeader1].Style.Font.Size = sizeBody;
                    worksheet.Cells[rowBody, colHeader1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[rowBody, colHeader1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                }

                rowBody += 1;
            }
            worksheet.Cells[rowBody, 1].Value = "Tổng Cộng";
            worksheet.Cells[rowBody, 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            worksheet.Cells[rowBody, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowBody, 1].Style.Font.Bold = true;
            worksheet.Cells[rowBody, 1].Style.Font.Size = sizeHeader1;

            for (int col = 2; col <= colHeader1; col++)
            {
                // Lấy header
                string klg_tle = worksheet.Cells[row + 2, col].Value.ToString();
                string itemName = worksheet.Cells[row + 1, col].Value.ToString();
                string areaName = worksheet.Cells[row, col].Value.ToString();

                var dataFind = data.TotalWegthAndPercent.Where(report =>
                    report.AreaName == areaName && report.ItemName == itemName).ToList();

                if (col == colHeader1)
                {
                    worksheet.Cells[rowBody, col].Value = data.TotalAll.ToString();
                }
                if (dataFind.Count > 0)
                {
                    double result = 0;
                    foreach (var d in dataFind)
                    {
                        if (klg_tle == klg)
                        {
                            result += double.Parse(d.TotalWeight);
                        }
                        else
                        {
                            result += double.Parse(d.TotalPercent);
                        }
                    }

                    if (klg_tle == klg)
                    {
                        worksheet.Cells[rowBody, col].Value = result.ToString();
                    }
                    else
                    {
                        worksheet.Cells[rowBody, col].Value = result.ToString("N2") + " %";
                    }

                }
                worksheet.Cells[rowBody, col].Style.Font.Size = sizeBody;
                worksheet.Cells[rowBody, col].Style.Font.Bold = true;
                worksheet.Cells[rowBody, col].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowBody, col].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            }

            worksheet.Cells.AutoFitColumns();

            #endregion
            return await package.GetAsByteArrayAsync();
        }
        public async Task<byte[]> ExportReportScaleToExcel<T, T1>(IEnumerable<T> data, IEnumerable<T1> reportScaleByRegion, ExcelExportType type)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var stream = new MemoryStream();
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets.Add(type.ToString());

            var properties = typeof(T).GetProperties()
                .Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                .ToList();


            var prop = properties.Where(x => x.Name == "Area")
                .FirstOrDefault();

            if (prop != null)
                properties.Remove(prop);


            var companyInfo = await _dbContext.tblMdCompanyInfo.FirstOrDefaultAsync();
            worksheet.Cells["A1"].Value = $"{companyInfo?.Name?.ToUpper()}";

            var exportType = "TRỌNG LƯỢNG CÂN"; ;

            worksheet.Cells["A3"].Value = $"BÁO CÁO TỔNG HỢP {exportType}";
            worksheet.Cells["A3"].Style.Font.Bold = true;

            // Tạo tiêu đề cho các cột
            int colIndex = 1;
            var rowIndex = 6;
            CreateHeader(properties, worksheet, rowIndex, ref colIndex);

            using (var r = worksheet.Cells[1, 1, 1, colIndex - 1])
            {
                r.Merge = true;
                r.Style.Font.Color.SetColor(Color.White);
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                r.Style.Fill.PatternType = ExcelFillStyle.Solid;
                r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
            }
            using (var r = worksheet.Cells[3, 1, 3, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            using (var r = worksheet.Cells[4, 1, 4, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }

            // Ghi dữ liệu vào các dòng
            rowIndex++;

            foreach (var item in data)
            {
                colIndex = 1;
                ExportObjectToExcel(item, properties, worksheet, ref rowIndex, ref colIndex);
            }

            worksheet.Cells.AutoFitColumns();

            // Tạo sheet thứ 2

            worksheet = package.Workbook.Worksheets.Add(type.ToString() + "_KHU_VUC");

            properties = typeof(T1).GetProperties()
                .Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                .ToList();

            worksheet.Cells["A1"].Value = $"{companyInfo?.Name?.ToUpper()}";

            worksheet.Cells["A3"].Value = $"BÁO CÁO TỔNG HỢP {exportType} KHU VỰC";
            worksheet.Cells["A3"].Style.Font.Bold = true;

            // Tạo tiêu đề cho các cột
            colIndex = 1;
            rowIndex = 6;
            CreateHeader(properties, worksheet, rowIndex, ref colIndex);


            using (var r = worksheet.Cells[1, 1, 1, colIndex - 1])
            {
                r.Merge = true;
                r.Style.Font.Color.SetColor(Color.White);
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                r.Style.Fill.PatternType = ExcelFillStyle.Solid;
                r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
            }
            using (var r = worksheet.Cells[3, 1, 3, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }
            using (var r = worksheet.Cells[4, 1, 4, colIndex - 1])
            {
                r.Merge = true;
                r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
            }

            // Ghi dữ liệu vào các dòng
            rowIndex++;
            foreach (var item in reportScaleByRegion)
            {
                colIndex = 1;
                ExportObjectToExcel(item, properties, worksheet, ref rowIndex, ref colIndex);
            }


            worksheet.Cells.AutoFitColumns();


            return await package.GetAsByteArrayAsync();
        }

        private void ExportObjectToExcel(object obj, List<PropertyInfo> properties, ExcelWorksheet worksheet, ref int rowIndex, ref int colIndex)
        {
            foreach (var property in properties)
            {
                var value = property.GetValue(obj);

                if (value is IEnumerable<object> collection)
                {
                    foreach (var item in collection.Where(x => x != null))
                    {
                        var prps = value.GetType().GetGenericArguments()[0].GetProperties().Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                                     .ToList();
                        colIndex = GetColumnIndex(property);
                        ExportObjectToExcel(item, prps, worksheet, ref rowIndex, ref colIndex);
                    }
                    rowIndex--;
                }
                else
                {
                    worksheet.Cells[rowIndex, colIndex].Value = value;
                    colIndex++;
                }
            }
            rowIndex++;
        }
        private int GetColumnIndex(PropertyInfo property)
        {
            var properties = property.DeclaringType.GetProperties()
                  .Where(prop => Attribute.IsDefined(prop, typeof(DescriptionAttribute)))
                  .ToList();

            return properties.IndexOf(property) + 1;
        }

        private void CreateHeader(List<PropertyInfo> properties, ExcelWorksheet worksheet, int rowIndex, ref int colIndex)
        {
            for (var i = 0; i < properties.Count; i++)
            {
                var description = ((DescriptionAttribute)properties[i]
                    .GetCustomAttributes(typeof(DescriptionAttribute), true)
                    .FirstOrDefault())?.Description;
                if (description != "ListObject")
                {
                    worksheet.Cells[rowIndex, colIndex].Value = description ?? properties[i].Name;
                    worksheet.Cells[rowIndex, colIndex].Style.Font.Size = 12;
                    worksheet.Cells[rowIndex, colIndex].Style.Font.Bold = true;
                    worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[rowIndex, colIndex].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                    worksheet.Cells[rowIndex, colIndex].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    worksheet.Cells[rowIndex, colIndex].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
                    colIndex++;
                }
                else
                {
                    var genericType = properties[i].PropertyType.GetGenericArguments()[0];
                    var prps = genericType.GetProperties().ToList();
                    CreateHeader(prps, worksheet, rowIndex, ref colIndex);
                }
            }
        }

    }
}
