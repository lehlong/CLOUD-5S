using DMS.BUSINESS.Dtos.SO.Order;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.ComponentModel;
using System.Drawing;
using System.Reflection;


namespace DMS.BUSINESS.Common.Util
{
    internal class ReportExcelExporter
    {
        public static byte[] ExportToExcelReportMoisture(List<MoistureExportByAreaExcelDto> data, string title)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add(title);
                worksheet.Cells["A1:M1"].Merge = true;
                worksheet.Cells["A1"].Value = title;
                worksheet.Cells["A1"].Style.Font.Size = 18;
                worksheet.Cells["A1"].Style.Font.Bold = true;
                worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                var headers = GetExcelHeaders<MoistureExportByAreaExcelDto>();
                for (var col = 0; col < headers.Count; col++)
                {
                    var headerCell = worksheet.Cells[2, col + 1];
                    headerCell.Value = headers[col];
                    headerCell.Style.Font.Bold = true;
                    headerCell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    headerCell.Style.Fill.BackgroundColor.SetColor(Color.LightBlue);
                    headerCell.Style.Font.Color.SetColor(Color.Black);

                    worksheet.Column(col + 1).Width = headers[col].Length + 8;
                }

                for (var row = 0; row < data.Count - 1 ; row++)
                {
                    var rowData = GetExcelRowData(data[row]);
                    for (var col = 0; col < rowData.Count; col++)
                    {
                        if (double.TryParse(rowData[col], out double parsedValue))
                        {
                            worksheet.Cells[row + 3, col + 1].Value = parsedValue;
                        }
                        else
                        {
                            worksheet.Cells[row + 3, col + 1].Value = rowData[col];
                        }
                    }
                }
                // Tạo một biến để theo dõi giá trị AreaCode của hàng sau đó
                string nextAreaCode = null;
                for (var row = 0; row < data.Count - 1; row++)
                {
                    // Lấy giá trị AreaCode của hàng sau đó (nếu có)
                    nextAreaCode = row + 1 < data.Count - 1 ? data[row + 1].AreaCode : null;
                    var rowData = GetExcelRowData(data[row]);
                    for (var col = 0; col < rowData.Count; col++)
                    {
                        if (double.TryParse(rowData[col], out double parsedValue))
                        {
                            worksheet.Cells[row + 3, col + 1].Value = parsedValue;
                        }
                        else
                        {
                            worksheet.Cells[row + 3, col + 1].Value = rowData[col];
                        }
                    }
                    // Kiểm tra xem AreaCode của hàng hiện tại có khác với hàng sau đó không
                    if (data[row].AreaCode != nextAreaCode)
                    {
                        worksheet.Cells[row + 3, 1, row + 3, rowData.Count].Style.Font.Bold = true;
                    }
                }
                var totalRowIndex = data.Count + 3;
                worksheet.Cells[totalRowIndex, 3].Value = "Tổng";
                worksheet.Cells[totalRowIndex, 1, totalRowIndex, headers.Count].Style.Font.Size = 12;
                worksheet.Cells[totalRowIndex, 1, totalRowIndex, headers.Count].Style.Font.Bold = true;

                double? lastTrayWeight = data.Last().trayWeight; ;
                double? lastTrayWetWeight = data.Last().trayWetWeight;
                double? lastTrayDryWeight = data.Last().trayDryWeight ;
                double? lastDryWeight = data.Last().dryWeight;
                double? lastWetWeight = data.Last().wetWeight;
                double? lastMoisture = data.Last().Moisture;

                int[] columnsToFormat = { 7, 8, 9, 10, 11 , 12 };

                worksheet.Cells[totalRowIndex, 7].Value = lastTrayWeight;
                worksheet.Cells[totalRowIndex, 8].Value = lastTrayWetWeight;
                worksheet.Cells[totalRowIndex, 9].Value = lastWetWeight;
                worksheet.Cells[totalRowIndex, 10].Value = lastTrayDryWeight;
                worksheet.Cells[totalRowIndex, 11].Value = lastDryWeight;
                worksheet.Cells[totalRowIndex, 12].Value = lastMoisture;

                foreach (var colIndex in columnsToFormat)
                {
                    for (var row = 0; row < data.Count + 1; row++)
                    {
                        worksheet.Cells[row + 3, colIndex].Style.Numberformat.Format = "#,##0.00";
                    }
                }
                return package.GetAsByteArray();
            }
        }

        private static List<string> GetExcelHeaders<T>()
        {
            return typeof(T).GetProperties()
                .Select(property =>
                {
                    var attribute = property.GetCustomAttribute<DescriptionAttribute>();
                    return attribute?.Description ?? property.Name;
                })
                .ToList();
        }

        private static List<string> GetExcelRowData<T>(T obj)
        {
            return typeof(T).GetProperties()
                .Select(property =>
                {
                    var value = property.GetValue(obj);
                    return value != null ? value.ToString() : "";
                })
                .ToList();
        }

    }
}

