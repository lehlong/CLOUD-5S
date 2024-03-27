using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.BUSINESS.Services.BU.Attachment;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DMS.BUSINESS.Services.BU
{
    public interface IModuleAttachmentService : IGenericService<tblBuModuleAttachment, tblModuleAttachmentDto>
    {
        Task<object> Upload(IFormFile file, string moduleType, Guid? referenceId);
        Task<List<tblModuleAttachmentDto>> GetByReferenceId(Guid refId);
        Task<object> UploadList(List<IFormFile> files, string moduleType, Guid? referenceId);
        Task<SyncScaleResponseDto> UploadScaleImage(List<SyncScaleRequestDto> model);
    }
    public class ModuleAttachmentService : GenericService<tblBuModuleAttachment, tblModuleAttachmentDto>, IModuleAttachmentService
    {
        private readonly AttachmentManager _attachmentManager;
        private readonly IConfiguration _configuration;
        public ModuleAttachmentService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
        {
            _attachmentManager = new AttachmentManager(dbContext, configuration);
            _configuration = configuration;
        }

        public override async Task<tblModuleAttachmentDto> GetById(object id)
        {
            try
            {
                var data = await _dbContext.tblBuModuleAttachment.Include(x => x.Attachment)
                    .FirstOrDefaultAsync(x => x.Id == (Guid)id);

                return _mapper.Map<tblModuleAttachmentDto>(data);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<List<tblModuleAttachmentDto>> GetByReferenceId(Guid refId)
        {
            try
            {
                var data = await _dbContext.tblBuModuleAttachment.Include(x => x.Attachment)
                    .Where(x => x.ReferenceId == refId).OrderByDescending(x => x.CreateDate).ToListAsync();

                return _mapper.Map<List<tblModuleAttachmentDto>>(data);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }

        public async Task<object> Upload(IFormFile file, string moduleType, Guid? referenceId)
        {
            if (!Enum.TryParse(moduleType, out ModuleType mdType))
            {
                this.Status = false;
                this.MessageObject.Code = "2005";
                return null;
            }

            if (file.Length < 0)
            {
                this.Status = false;
                this.MessageObject.Code = "3001";
                return null;
            }

            using var ms = new MemoryStream();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();

            var uploadResult = await _attachmentManager.UploadModuleAttachment(fileBytes, file.FileName, Path.GetExtension(file.FileName), FileUtil.GetFileType(Path.GetExtension(file.FileName)), mdType, referenceId);

            this.Status = uploadResult.Status;

            if (uploadResult.Exception != null)
            {
                this.Exception = uploadResult.Exception;
            }

            if (uploadResult.MessageObject != null)
            {
                this.MessageObject = uploadResult.MessageObject;

            }

            return uploadResult.Data;
        }

        public async Task<object> UploadList(List<IFormFile> files, string moduleType, Guid? referenceId)
        {
            if (!Enum.TryParse(moduleType, out ModuleType mdType))
            {
                this.Status = false;
                this.MessageObject.Code = "2005";
                return null;
            }

            List<BatchUploadDto> datas = new();

            foreach (var file in files)
            {
                using var ms = new MemoryStream();
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                datas.Add(new BatchUploadDto()
                {
                    ByteData = fileBytes,
                    FileExtension = Path.GetExtension(file.FileName),
                    FileName = file.FileName,
                    FileType = FileUtil.GetFileType(Path.GetExtension(file.FileName))
                });
            }

            var uploadResult = await _attachmentManager.BatchUploadModuleAttachment(datas, mdType, referenceId);

            this.Status = uploadResult.Status;

            if (uploadResult.Exception != null)
            {
                this.Exception = uploadResult.Exception;
            }

            if (uploadResult.MessageObject != null)
            {
                this.MessageObject = uploadResult.MessageObject;

            }

            return uploadResult.Data;
        }

        public async Task<SyncScaleResponseDto> UploadScaleImage(List<SyncScaleRequestDto> model)
        {
            var result = new SyncScaleResponseDto();

            foreach (var item in model)
            {
                try
                {
                    if (!Enum.TryParse(item.ModuleType, out ModuleType mdType))
                    {
                        result.Fails.Add(new SyncScaleResponseBaseDto()
                        {
                            Status = false,
                            Code = item.SyncCode,
                            MessageObject = new Common.Class.MessageObject()
                            {
                                Code = "2005"
                            }
                        });
                        continue;
                    }

                    if (mdType != ModuleType.SCALEIN && mdType != ModuleType.SCALEOUT)
                    {
                        result.Fails.Add(new SyncScaleResponseBaseDto()
                        {
                            Status = false,
                            Code = item.SyncCode,
                            MessageObject = new Common.Class.MessageObject()
                            {
                                Code = "3000"
                            }
                        });
                        continue;
                    }

                    var scale = await _dbContext.tblSoScale.FirstOrDefaultAsync(x => x.SyncCode == item.ScaleCode);

                    if (scale == null)
                    {
                        result.Fails.Add(new SyncScaleResponseBaseDto()
                        {
                            Status = false,
                            Code = item.SyncCode,
                            MessageObject = new Common.Class.MessageObject()
                            {
                                Code = "3001"
                            }
                        });
                        continue;
                    }

                    var uploadResult = await _attachmentManager.UploadModuleAttachment(item.Files.ByteData, item.Files.Name, item.Files.Extension, FileType.IMAGE.ToString(), mdType, scale.ReferenceId);
                    if (uploadResult.Status)
                    {
                        result.Success.Add(new SyncScaleResponseBaseDto()
                        {
                            Status = true,
                            Code = item.SyncCode
                        });
                    }
                    else
                    {
                        result.Fails.Add(new SyncScaleResponseBaseDto()
                        {
                            Status = false,
                            Code = item.SyncCode,
                            Exception = uploadResult.Exception,
                            MessageObject = uploadResult.MessageObject,
                        });
                    }
                }
                catch (Exception ex)
                {
                    result.Fails.Add(new SyncScaleResponseBaseDto()
                    {
                        Status = false,
                        Code = item.SyncCode,
                        Exception = ex
                    });
                }
            }
            return result;
        }
    }
}
