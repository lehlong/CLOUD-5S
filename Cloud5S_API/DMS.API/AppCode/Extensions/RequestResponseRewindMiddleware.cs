namespace DMS.API.AppCode.Extensions
{
    public class RequestBodyRewindMiddleware
    {
        private readonly RequestDelegate _next;
        public RequestBodyRewindMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                httpContext.Request.EnableBuffering();
                await _next(httpContext);
            }
            catch(Exception ex) {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            await ExceptionHandler.ExceptionResult(context, exception);
        }
    }

    public static class BodyRewindExtensions
    {
        public static IApplicationBuilder EnableRequestBodyRewind(this IApplicationBuilder app)
        {
            if (app is null)
                throw new ArgumentNullException(nameof(app));

            return app.UseMiddleware<RequestBodyRewindMiddleware>();
        }
    }
}
