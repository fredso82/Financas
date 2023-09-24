using Financas.Data;
using Financas.EndPoints;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

var endpoinUri = builder.Configuration.GetSection("CosmosDb").GetValue<string>("endpoinUri");
var primaryKey = builder.Configuration.GetSection("CosmosDb").GetValue<string>("primaryKey"); 
var databaseName = builder.Configuration.GetSection("CosmosDb").GetValue<string>("databaseName"); 

var cosmosClientOptions = new CosmosClientOptions { ApplicationName = databaseName };
var cosmosClient = new CosmosClient(endpoinUri, primaryKey, cosmosClientOptions);
cosmosClient.ClientOptions.ConnectionMode = ConnectionMode.Gateway;

builder.Services.AddSingleton(cosmosClient);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(c => new CategoriaRepository(cosmosClient, databaseName));
builder.Services.AddScoped(c => new FormaPagamentoRepository(cosmosClient, databaseName));

var app = builder.Build();

app.MapEndpointsCategoria();
app.MapEndpointsFormaPagamento();
app.MapEndpointsTransacao(databaseName);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Run();