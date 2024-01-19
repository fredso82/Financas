using System.Text;
using Financas;
using Financas.Data;
using Financas.EndPoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Azure.Cosmos;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

byte[] key = Encoding.ASCII.GetBytes(Settings.Secret);
builder.Services.AddAuthentication(x => 
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => 
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var endpoinUri = builder.Configuration.GetSection("CosmosDb").GetValue<string>("endpoinUri");
var primaryKey = builder.Configuration.GetSection("CosmosDb").GetValue<string>("primaryKey"); 
var databaseName = builder.Configuration.GetSection("CosmosDb").GetValue<string>("databaseName") ?? string.Empty; 

var cosmosClientOptions = new CosmosClientOptions { ApplicationName = databaseName };
var cosmosClient = new CosmosClient(endpoinUri, primaryKey, cosmosClientOptions);
cosmosClient.ClientOptions.ConnectionMode = ConnectionMode.Direct;

builder.Services.AddSingleton(cosmosClient);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(c => new CategoriaRepository(cosmosClient, databaseName));
builder.Services.AddScoped(c => new FormaPagamentoRepository(cosmosClient, databaseName));
builder.Services.AddScoped(c => new TransacaoRepository(cosmosClient, databaseName));

builder.Services.AddAuthorization(option => 
{
    option.AddPolicy("admin", policy => policy.RequireRole("manager"));
    option.AddPolicy("employee", policy => policy.RequireRole("employee"));
});

var app = builder.Build();

app.MapEndpointsAutenticacao();
app.MapEndpointsCategoria();
app.MapEndpointsFormaPagamento();
app.MapEndpointsTransacao();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.Run();