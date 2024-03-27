using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Auth;
using DMS.CORE;
using DMS.CORE.Entities.AD;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using DMS.BUSINESS.Common.AppCode.Logger;
using Microsoft.AspNetCore.Http;

namespace DMS.BUSINESS.Services.Auth
{
    public interface IAuthService : IGenericService<tblAdAccount, tblAccountDto>
    {
        Task<JWTTokenDto> Login(LoginDto loginInfo);
        Task<tblAccountDto> GetAccount(string userName);
        Task ChangePassword(ChangePasswordDto changePasswordDto);
        Task<JWTTokenDto> RefreshToken(RefreshTokenDto refreshTokenDto);
        Task SendOtp(SendOtpDto dto);
        Task ForgotPassword(ForgotPasswordDto dto);
    }

    public class AuthService : GenericService<tblAdAccount, tblAccountDto>, IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContext;
        public AuthService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContext) : base(dbContext, mapper)
        {
            _configuration = configuration;
            _httpContext = httpContext;
        }

        public async Task ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var account = await AuthenticationProcess(new LoginDto()
            {
                UserName = changePasswordDto.UserName,
                Password = changePasswordDto.OldPassword
            });

            if (this.Status)
            {
                var newPasswordHash = Utils.CryptographyMD5(changePasswordDto.NewPassword);
                account.Password = newPasswordHash;
                _dbContext.Update(account);
                await _dbContext.SaveChangesAsync();
            }

            return;
        }

        public async Task<JWTTokenDto> Login(LoginDto loginInfo)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var authUser = await AuthenticationProcess(loginInfo);
                if (this.Status)
                {
                    var account = _mapper.Map<tblAccountLoginDto>(authUser);
                    var refreshToken = await GenerateRefreshToken(account.UserName);
                    if (this.Status)
                    {
                        var token = GeneratenJwtToken(account.UserName, account.FullName);
                        await LoginHistoryLog(account.UserName, account.FullName, true, this.MessageObject.Message);
                        await _dbContext.Database.CommitTransactionAsync();
                        return new()
                        {
                            accountInfo = account,
                            accessToken = token.Item1,
                            expireDate = token.Item2,
                            refreshToken = refreshToken.Item1,
                            expireDateRefreshToken = refreshToken.Item2,
                        };
                    }
                    await LoginHistoryLog(account.UserName, account.FullName, false, this.MessageObject.Message);
                }
                else
                {
                    await LoginHistoryLog(loginInfo.UserName, string.Empty, false, this.MessageObject.Code);
                }
                await _dbContext.Database.CommitTransactionAsync();
                return null;
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblAccountDto> GetAccount(string userName)
        {
            var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(
                    x => x.UserName == userName);

            return _mapper.Map<tblAccountDto>(account);
        }

        public async Task<JWTTokenDto> RefreshToken(RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };

                var principal = tokenHandler.ValidateToken(refreshTokenDto.Token, validationParameters, out SecurityToken validatedToken);
                JwtSecurityToken jwtSecurityToken = validatedToken as JwtSecurityToken;
                if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    this.Status = false;
                    this.MessageObject.Code = "1004";
                    return null;
                }

                var username = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value; ;
                var refreshTokenDb = await _dbContext.tblAdAccountRefreshToken.FirstOrDefaultAsync(x => x.UserName == username && x.RefreshToken == refreshTokenDto.RefreshToken);
                var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(x => x.UserName == username);

                if (account is null || refreshTokenDb is null || refreshTokenDb.ExpireTime <= DateTime.UtcNow)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1005";
                    return null;
                }

                var refreshToken = await GenerateRefreshToken(username);

                if (this.Status)
                {
                    var token = GeneratenJwtToken(username, account.FullName);
                    return new()
                    {
                        accountInfo = _mapper.Map<tblAccountLoginDto>(account),
                        accessToken = token.Item1,
                        expireDate = token.Item2,
                        refreshToken = refreshToken.Item1,
                        expireDateRefreshToken = refreshToken.Item2
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                this.Status = false;
                if (ex.GetType() == typeof(SecurityTokenExpiredException))
                {
                    this.MessageObject.Code = "1004";
                }
                else
                {
                    this.MessageObject.Code = "1000";
                }
                return null;
            }

        }

        public async Task SendOtp(SendOtpDto dto)
        {
            var user = await _dbContext.tblAdAccount.FirstOrDefaultAsync(x => x.UserName.ToLower() == dto.UserName.ToLower());
            if (dto == null || string.IsNullOrWhiteSpace(dto.UserName) || user == null)
            {
                this.Status = false;
                this.MessageObject.Code = "1006";
                return;
            }

            if (string.IsNullOrWhiteSpace(dto.PhoneNumber) && string.IsNullOrWhiteSpace(dto.Email))
            {
                this.Status = false;
                this.MessageObject.Code = "1007";
                return;
            }

            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber) && dto.PhoneNumber != user.PhoneNumber)
            {
                this.Status = false;
                this.MessageObject.Code = "1007";
                return;
            }

            if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != user.Email)
            {
                this.Status = false;
                this.MessageObject.Code = "1007";
                return;
            }
            if (!string.IsNullOrWhiteSpace(dto.Email))
            {
                var sendResult = await SendEmailOTP(user.UserName, user.Email);
                if (!sendResult)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1008";
                    return;
                }
                else
                {
                    this.MessageObject.Code = "1011";
                }
            }
            else
            {
                var sendResult = await SendEmailOTP(user.UserName, user.Email);
                if (!sendResult)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1008";
                    return;
                }
            }
        }

        public async Task ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _dbContext.tblAdAccount.FirstOrDefaultAsync(x => x.UserName.ToLower() == dto.UserName.ToLower());
            try
            {
                if (dto == null || string.IsNullOrWhiteSpace(dto.UserName) || user == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "1006";
                    return;
                }

                if (string.IsNullOrWhiteSpace(dto.Password))
                {
                    this.Status = false;
                    this.MessageObject.Code = "1009";
                    return;
                }

                if (!await ValidateOTP(dto.UserName, dto.Otp))
                {
                    this.Status = false;
                    this.MessageObject.Code = "1010";
                    return;
                }

                var newPasswordHash = Utils.CryptographyMD5(dto.Password);
                user.Password = newPasswordHash;
                _dbContext.Update(user);
                await _dbContext.SaveChangesAsync();
                return;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return;
            }
        }

        private async Task<tblAdAccount> AuthenticationProcess(LoginDto loginInfo)
        {
            if (string.IsNullOrWhiteSpace(loginInfo.UserName) || string.IsNullOrWhiteSpace(loginInfo.Password))
            {
                this.Status = false;
                this.MessageObject.Code = "1001"; //Để trống username, mật khẩu
                return null;
            }

            var account = await _dbContext.tblAdAccount
                .Include(x => x.Account_AccountGroups)
                .ThenInclude(x=>x.AccountGroup)
                .FirstOrDefaultAsync(
                x => x.UserName == loginInfo.UserName &&
                x.Password == Utils.CryptographyMD5(loginInfo.Password));

            if (account == null)
            {
                this.Status = false;
                this.MessageObject.Code = "1002"; //Sai username hoặc mật khẩu
                return null;
            }

            if (!(account?.IsActive ?? true))
            {
                this.Status = false;
                this.MessageObject.Code = "1003"; //Tài khoản bị khóa
                return null;
            }

            return account;
        }

        private (string, DateTime) GeneratenJwtToken(string userName, string fullName)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.Name, userName),
                        new Claim(ClaimTypes.GivenName,fullName ),
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var expire = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:ExpireToken"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: expire,
                signingCredentials: signIn);

            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            return new(token, expire);
        }

        private async Task<(string, DateTime)> GenerateRefreshToken(string username)
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            var refreshToken = Convert.ToBase64String(randomNumber);

            var expire = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:ExpireRefreshToken"]));
            var obj = new tblAdAccountRefreshToken()
            {
                UserName = username,
                RefreshToken = refreshToken,
                ExpireTime = expire,
            };

            try
            {
                await _dbContext.tblAdAccountRefreshToken.AddAsync(obj);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                LoggerService.LogError(ex.Message);
                LoggerService.LogError(ex.StackTrace);
                this.Status = false;
                this.MessageObject.Code = "1000";
                this.MessageObject.Message = ex.Message;
                return new();
            }

            return new(refreshToken, expire);
        }

        private async Task LoginHistoryLog(string userName, string fullName, bool isSuccess, string message)
        {
            string userAgent = _httpContext?.HttpContext?.Request?.Headers["User-Agent"] ?? string.Empty;
            string ipAddress = _httpContext?.HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4().ToString() ?? string.Empty;
            await _dbContext.tblAdLoginHistory.AddAsync(new tblAdLoginHistory()
            {
                UserName = userName,
                FullName = fullName,
                UserAgent = userAgent,
                IPAddress = ipAddress,
                IsSuccess = isSuccess,
            });
            await _dbContext.SaveChangesAsync();
        }

        private async Task<bool> SendEmailOTP(string userName, string email)
        {
            var otp = GenerateOtp();

            try
            {
                var lastOtp = await _dbContext.tblBuOtp
                             .OrderByDescending(x => x.CreateDate)
                             .FirstOrDefaultAsync(x => x.UserName == userName);

                if (lastOtp != null && (DateTime.Now - lastOtp.CreateDate.Value).TotalMinutes < 2)
                {
                    return false;
                }

                await _dbContext.Database.BeginTransactionAsync();
                await _dbContext.tblBuOtp.AddAsync(new CORE.Entities.BU.tblBuOtp()
                {
                    Code = otp,
                    IsActive = false,
                    IsEmailOTP = true,
                    IsPhoneNumberOTP = false,
                    UserName = userName,
                    Reception = email,
                });
                await _dbContext.SaveChangesAsync();

                var sendResult = await EmailUtil.SendAsync(new Dtos.Common.MailData()
                {
                    To = new List<string>() { email },
                    Subject = "Quên mật khẩu",
                    Body = $"Mã xác nhận thay đổi mật khẩu của bạn là: {otp}",
                    Priority = MimeKit.MessagePriority.Urgent
                }, new CancellationToken());

                if (!sendResult)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    return false;
                }

                await _dbContext.Database.CommitTransactionAsync();
                return true;
            }
            catch (Exception)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                return false;
            }
        }

        private string GenerateOtp()
        {
            Random random = new Random();
            int otpNumber = random.Next(100000, 999999);
            return otpNumber.ToString();
        }

        private async Task<bool> ValidateOTP(string userName, string otp)
        {
            var lastOtp = await _dbContext.tblBuOtp
                              .OrderByDescending(x => x.CreateDate)
                              .FirstOrDefaultAsync(x => x.UserName == userName);

            if (lastOtp == null) return false;

            if ((DateTime.Now - lastOtp.CreateDate.Value).TotalMinutes >= 2) return false;

            if (otp != lastOtp.Code) return false;

            return true;
        }
    }
}
