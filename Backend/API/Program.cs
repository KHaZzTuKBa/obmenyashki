using Infrastructure.DependencyInjection;
using Microsoft.OpenApi.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(swagger =>
{
    swagger.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ASP.NET 9 Web API",
        Description = "Piski"
    });
    swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header
    });
    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            }, Array.Empty<string>()
        }
    });
});

builder.Services.InfrastructureServices(builder.Configuration);

builder.Services.Configure<MinioOptions>(builder.Configuration.GetSection("Minio"));

builder.Services.AddSingleton<IMinioClient>(sp =>
{
    // --- Добавляем логирование ---
    var loggerFactory = sp.GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger("MinioSetup");
    // ---

    var config = builder.Configuration.GetSection("Minio");
    var endpoint = config["Endpoint"];
    var accessKey = config["AccessKey"];
    var secretKey = config["SecretKey"];
    var useSsl = bool.Parse(config["UseSSL"] ?? "false");

    // --- Логируем полученные значения ---
    logger.LogInformation("Attempting to configure Minio client:");
    logger.LogInformation("Endpoint from config: '{EndpointValue}'", endpoint);
    logger.LogInformation("AccessKey from config is set: {IsAccessKeySet}", !string.IsNullOrEmpty(accessKey));
    logger.LogInformation("UseSSL from config: {UseSslValue}", useSsl);
    // ---

    // Проверка на null или пустую строку перед использованием
    if (string.IsNullOrEmpty(endpoint))
    {
        throw new InvalidOperationException("Minio Endpoint is null or empty in configuration.");
    }
    if (string.IsNullOrEmpty(accessKey))
    {
        throw new InvalidOperationException("Minio AccessKey is null or empty in configuration.");
    }
    if (string.IsNullOrEmpty(secretKey))
    {
        throw new InvalidOperationException("Minio SecretKey is null or empty in configuration.");
    }

    var minioClient = new MinioClient()
                        .WithEndpoint(endpoint)
                        .WithCredentials(accessKey, secretKey);

    if (useSsl)
        minioClient.WithSSL();

    return minioClient.Build();
});

var app = builder.Build();

// Автоматическое применение миграций
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>(); // Замените на ваш DbContext
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var minioClient = scope.ServiceProvider.GetRequiredService<IMinioClient>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var bucketName = builder.Configuration["Minio:BucketName"] ?? "default-bucket";

    try
    {
        var beArgs = new BucketExistsArgs().WithBucket(bucketName);
        bool found = await minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
        if (!found)
        {
            var mbArgs = new MakeBucketArgs().WithBucket(bucketName);
            await minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
            logger.LogInformation($"Bucket '{bucketName}' created successfully.");
        }
        else
        {
            logger.LogInformation($"Bucket '{bucketName}' already exists.");
        }
    }
    catch (MinioException e)
    {
        logger.LogError(e, $"Error occurred with Minio bucket '{bucketName}'");
    }
}

app.Run();

public class MinioOptions
{
    public string Endpoint { get; set; } = string.Empty;
    public string AccessKey { get; set; } = string.Empty;
    public string SecretKey { get; set; } = string.Empty;
    public bool UseSSL { get; set; } = false;
    public string BucketName { get; set; } = string.Empty;
}