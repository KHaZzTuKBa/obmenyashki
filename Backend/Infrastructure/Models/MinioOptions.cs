using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class MinioOptions
    {
        public const string Minio = "Minio"; // Имя секции в конфигурации

        public string Endpoint { get; set; } = string.Empty;
        public string AccessKey { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
        public bool UseSSL { get; set; }
        public string BucketName { get; set; } = string.Empty;
    }
}
