using Financas.Data;
using Financas.EndPoints;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

app.MapEndpointsCategoria();
app.MapEndpointsFormaPagamento();
app.MapEndpointsTransacao();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.Run();