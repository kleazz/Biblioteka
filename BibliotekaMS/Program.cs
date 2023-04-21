using BibliotekaMS.Data;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetService<IConfiguration>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            var frontendURL = configuration.GetValue<string>("frontend_url");

            options.AddDefaultPolicy(bulider =>
            {
                builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
            });
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<ILibriRepository,LibriRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
