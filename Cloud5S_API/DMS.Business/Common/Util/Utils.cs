using HtmlAgilityPack;
using System.Security.Cryptography;

namespace DMS.BUSINESS.Common.Util
{
    public static class Utils
    {
        public static string CryptographyMD5(string source)
        {
            using var objMD5 = MD5.Create();
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(source);
            byte[] bytHash = objMD5.ComputeHash(buffer);
            string result = "";
            foreach (byte a in bytHash)
            {
                result += int.Parse(a.ToString(), System.Globalization.NumberStyles.HexNumber).ToString();
            }
            return result;
        }


        public static IEnumerable<DateTime> LoopDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }

        public static string ConvertToPlainText(string htmlText)
        {
            HtmlDocument htmlDoc = new();
            htmlDoc.LoadHtml(htmlText);

            return htmlDoc.DocumentNode.InnerText.Replace("&nbsp;",string.Empty);
        }
    }
}
