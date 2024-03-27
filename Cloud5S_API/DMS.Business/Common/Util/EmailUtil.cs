using DMS.BUSINESS.Dtos.Common;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace DMS.BUSINESS.Common.Util
{
    public static class EmailUtil
    {
        private static readonly string DisplayName = "mMes";
        private static readonly string From = "mMes@mobifone.vn";
        private static readonly string Host = "email.mobifone.vn";
        private static readonly string Password = "Bu@123456";
        private static readonly int Port = 587;
        private static readonly string UserName = "mMes@mobifone.vn";
        private static readonly bool UseSSL = false;
        private static readonly bool UseStartTls = false;

        public static async Task<bool> SendAsync(MailData mailData, CancellationToken ct = default)
        {
            try
            {
                var mail = new MimeMessage();

                #region Sender / Receiver
                mail.From.Add(new MailboxAddress(DisplayName, From ?? From));
                mail.Sender = new MailboxAddress(DisplayName ?? DisplayName, From ?? From);

                foreach (string mailAddress in mailData.To)
                    mail.To.Add(MailboxAddress.Parse(mailAddress));

                if (mailData.Bcc != null)
                {
                    foreach (string mailAddress in mailData.Bcc.Where(x => !string.IsNullOrWhiteSpace(x)))
                        mail.Bcc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                }

                if (mailData.Cc != null)
                {
                    foreach (string mailAddress in mailData.Cc.Where(x => !string.IsNullOrWhiteSpace(x)))
                        mail.Cc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                }
                #endregion


                #region Content

                // Add Content to Mime Message
                var multipart = new Multipart("mixed");
                foreach (var file in mailData.Attachments)
                {
                    if (file.Length > 0)
                    {
                        var attachmentPart = new MimePart(file.ContentType)
                        {
                            Content = new MimeContent(file.OpenReadStream(), ContentEncoding.Default),
                            ContentDisposition = new MimeKit.ContentDisposition(MimeKit.ContentDisposition.Attachment),
                            ContentTransferEncoding = ContentEncoding.Base64,
                            FileName = file.FileName
                        };

                        multipart.Add(attachmentPart);
                    }
                }
                multipart.Add(new TextPart("html")
                {
                    Text = mailData.Body
                });
                mail.Subject = mailData.Subject;
                mail.Priority = mailData.Priority;
                mail.Body = multipart;

                #endregion

                #region Send Mail

                using var smtp = new SmtpClient();
                smtp.Timeout = 10000;
                if (UseSSL)
                {
                    await smtp.ConnectAsync(Host, Port, SecureSocketOptions.SslOnConnect, ct);
                }
                else if (UseStartTls)
                {
                    await smtp.ConnectAsync(Host, Port, SecureSocketOptions.StartTls, ct);
                }
                else
                {
                    await smtp.ConnectAsync(Host, Port, SecureSocketOptions.None, ct);

                }
                await smtp.AuthenticateAsync(UserName, Password, ct);
                await smtp.SendAsync(mail, ct);
                await smtp.DisconnectAsync(true, ct);

                #endregion

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
