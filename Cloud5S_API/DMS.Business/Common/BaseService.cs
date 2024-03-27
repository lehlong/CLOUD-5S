using AutoMapper;
using DMS.CORE;
using DMS.BUSINESS.Common.Class;

namespace DMS.BUSINESS.Common
{
    public class BaseService : IBaseService
    {
        public AppDbContext _dbContext { get; set; }
        public MessageObject MessageObject { get; set; }
        public Exception Exception { get; set; }
        public bool Status { get; set; }
        public IMapper _mapper;

        public BaseService(AppDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
            this.Status = true;
            this.MessageObject = new MessageObject();
        }
    }
}
