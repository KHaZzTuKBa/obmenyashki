using Infrastructure.DependencyInjection;
using Microsoft.OpenApi.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;
using Application.Contracts;
using Infrastructure.Models;
using Microsoft.Extensions.Options;

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

builder.Services.Configure<MinioOptions>(builder.Configuration.GetSection(MinioOptions.Minio));

builder.Services.AddSingleton<IMinioClient>(sp => // ������������ ��������� IMinioClient
{
    // �������� ����������� ����� MinIO
    var minioOptions = sp.GetRequiredService<IOptions<MinioOptions>>().Value;
    var logger = sp.GetRequiredService<ILogger<Program>>(); // �������� ������ ��� ������ ����������

    try
    {
        logger.LogInformation("Initializing MinioClient with Endpoint: {Endpoint}, UseSSL: {UseSSL}",
            minioOptions.Endpoint, minioOptions.UseSSL);

        // ������� ��������� MinioClient, ��������� builder pattern
        var minioClient = new MinioClient()
                            .WithEndpoint(minioOptions.Endpoint) // ������ ���� � ����
                            .WithCredentials(minioOptions.AccessKey, minioOptions.SecretKey);

        // ��������� SSL, ���� ������� � ������������
        if (minioOptions.UseSSL)
        {
            minioClient.WithSSL();
        }

        // ������ � ���������� ������
        return minioClient.Build();
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to initialize MinioClient. Endpoint: {Endpoint}, UseSSL: {UseSSL}",
            minioOptions.Endpoint, minioOptions.UseSSL);
        // ����������� ����������, ����� ���������� �� ���������� � ��������� ��������
        throw new InvalidOperationException("Could not configure Minio client", ex);
    }
});

var app = builder.Build();

// �������������� ���������� ��������
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>(); // �������� �� ��� DbContext
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
    await EnsureMinioBucketExists(app.Services);
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

async Task EnsureMinioBucketExists(IServiceProvider services)
{
    // �������� ������ � ����� �� DI
    // ����� �� ��������� scope, ��� ��� IMinioClient � IOptions ���������������� ��� Singleton
    var minioClient = services.GetRequiredService<IMinioClient>();
    var options = services.GetRequiredService<IOptions<MinioOptions>>().Value;
    var logger = services.GetRequiredService<ILogger<Program>>(); // ������
    var bucketName = options.BucketName;

    try
    {
        logger.LogInformation("Checking if bucket '{BucketName}' exists...", bucketName);
        // ��������� ��� �������� ������������� ������
        var args = new BucketExistsArgs().WithBucket(bucketName);
        bool found = await minioClient.BucketExistsAsync(args);

        if (!found)
        {
            logger.LogInformation("Bucket '{BucketName}' does not exist. Creating...", bucketName);
            // ��������� ��� �������� ������
            var makeArgs = new MakeBucketArgs().WithBucket(bucketName);
            await minioClient.MakeBucketAsync(makeArgs);
            logger.LogInformation("Bucket '{BucketName}' created successfully.", bucketName);

            // (�����������) ��������� �������� ������� ��� CORS, ���� �����
            // string policyJson = @"{ ... ��� json �������� ... }";
            // var policyArgs = new SetPolicyArgs().WithBucket(bucketName).WithPolicy(policyJson);
            // await minioClient.SetPolicyAsync(policyArgs);
        }
        else
        {
            logger.LogInformation("Bucket '{BucketName}' already exists.", bucketName);
        }
    }
    // ������������ ����������� ��� Minio ����������
    catch (MinioException e)
    {
        logger.LogError(e, "Minio Error checking or creating bucket '{BucketName}'", bucketName);
    }
    catch (Exception e)
    {
        logger.LogError(e, "An unexpected error occurred while ensuring bucket '{BucketName}' exists", bucketName);
    }
}