using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Dtos.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;

namespace DMS.BUSINESS.Services.BU.Attachment
{
    public class AttachmentManager
    {
        private AppDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly string _baseUploadUrl;
        public AttachmentManager(AppDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
            _baseUploadUrl = _configuration.GetSection("Url:Upload").Value;
        }

        public async Task<ServiceResponseDto> UploadModuleAttachment(byte[] data, string fileName, string extension, string fileType, ModuleType moduleType, Guid? RefId = null)
        {
            if (RefId == null) RefId = Guid.NewGuid();

            string physicalFileName = Guid.NewGuid().ToString();

            var uploadPath = Path.Combine(moduleType.ToString(), DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), DateTime.Now.Day.ToString(),$"{physicalFileName}{extension}");

            var uploadResult = await Upload(data, uploadPath);

            if (uploadResult.Status == false) return uploadResult;

            IDbContextTransaction transaction = null;

            if (_dbContext.Database.CurrentTransaction == null)
            {
                transaction = _dbContext.Database.BeginTransactionAsync().Result;
            }

            try
            {
                var attachment = new tblBuAttachment
                {
                    Url = uploadPath,
                    Extension = extension,
                    Size = data.Length / 1024.0,
                    Type = fileType,
                    Name = fileName,
                };

                await _dbContext.tblBuAttachment.AddAsync(attachment);
                await _dbContext.SaveChangesAsync();

                var moduleAttachment = new tblBuModuleAttachment()
                {
                    AttachmentId = attachment.Id,
                    ReferenceId = RefId,
                    ModuleType = moduleType.ToString(),
                };

                await _dbContext.tblBuModuleAttachment.AddAsync(moduleAttachment);
                await _dbContext.SaveChangesAsync();

                transaction?.CommitAsync();
                return new()
                {
                    Data = new
                    {
                        AttachmentId = attachment.Id,
                        Url = (string)uploadResult.Data,
                        ReferenceId = RefId
                    },
                    Status = true,
                };
            }
            catch (Exception ex)
            {
                transaction?.RollbackAsync();
                return new()
                {
                    Data = null,
                    Status = false,
                    Exception = ex,
                };
            }
        }

        public async Task<ServiceResponseDto> BatchUploadModuleAttachment(List<BatchUploadDto> datas, ModuleType moduleType, Guid? RefId = null)
        {
            if (datas == null || !datas.Any())
            {
                return new()
                {
                    Data = null,
                    MessageObject = new MessageObject() { Code = "3000" },
                    Status = false
                };
            }

            var uploadPathInDay = Path.Combine(moduleType.ToString(), DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString(), DateTime.Now.Day.ToString());


            if (RefId == null) RefId = Guid.NewGuid();

            IDbContextTransaction transaction = null;
            if (_dbContext.Database.CurrentTransaction == null)
            {
                transaction = _dbContext.Database.BeginTransactionAsync().Result;
            }
            try
            {
                List<tblBuAttachment> attachments = new();
                List<tblBuModuleAttachment> moduleAttachments = new();
                foreach (var data in datas)
                {
                    string physicalFileName = Guid.NewGuid().ToString();

                    var uploadPath = Path.Combine(uploadPathInDay, $"{physicalFileName}{data.FileExtension}");

                    var uploadResult = await Upload(data.ByteData, uploadPath);
                    if (!uploadResult.Status) continue;

                    var attachment = new tblBuAttachment
                    {
                        Url = uploadPath,
                        Extension = data.FileExtension,
                        Size = data.ByteData.Length / 1024.0,
                        Type = data.FileType.ToString(),
                        Name = data.FileName,
                    };

                    attachments.Add(attachment);
                }

                await _dbContext.tblBuAttachment.AddRangeAsync(attachments);
                await _dbContext.SaveChangesAsync();

                foreach (var attachment in attachments)
                {
                    var moduleAttachment = new tblBuModuleAttachment()
                    {
                        AttachmentId = attachment.Id,
                        ReferenceId = RefId,
                        ModuleType = moduleType.ToString(),
                    };

                    moduleAttachments.Add(moduleAttachment);
                }

                await _dbContext.tblBuModuleAttachment.AddRangeAsync(moduleAttachments);
                await _dbContext.SaveChangesAsync();

                transaction?.CommitAsync();
                return new()
                {
                    Data = new
                    {
                        Attachment = attachments.Select(x => new
                        {
                            x.Id,
                        }).ToList(),
                        ReferenceId = RefId
                    },
                    Status = true,
                };

            }
            catch (Exception ex)
            {
                transaction?.RollbackAsync();
                return new()
                {
                    Data = null,
                    Status = false,
                    Exception = ex,
                };
            }
        }

        private async Task<ServiceResponseDto> Upload(byte[] data, string path)
        {
            try
            {
                if (data == null || !data.Any())
                {
                    return new()
                    {
                        Data = null,
                        MessageObject = new MessageObject() { Code = "3000" },
                        Status = false
                    };
                }

                var fullPath = Path.Combine(_baseUploadUrl, path);

                string directoryPath = Path.GetDirectoryName(fullPath);

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                await File.WriteAllBytesAsync(fullPath, data);

                return new()
                {
                    Status = true,
                };
            }
            catch (Exception ex)
            {
                return new()
                {
                    Status = false,
                    Exception = ex,
                };
            }
        }

    }
}
