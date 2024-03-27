namespace DMS.API.AppCode.Util
{
    static class ConfigurationManagerUtil
    {
        public static IConfiguration AppSetting { get; set; }
        static ConfigurationManagerUtil()
        {
            AppSetting = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
        }
    }
}
