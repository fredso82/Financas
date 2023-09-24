using Financas.DTO;
using Financas.Models;
using Microsoft.Azure.Cosmos;

namespace Financas.EndPoints
{
    public static class TransacaoEndpoint
    {
        private static readonly string nomeContainer = "Transacoes";
        public static void MapEndpointsTransacao(this WebApplication app, string nomeBancoDados)
        {
            app.MapPost("transacoes", async (TransacaoInclusaoDto transacaoDto, CosmosClient cosmosClient) =>
            {
                var containerCategoria = cosmosClient.GetContainer(nomeBancoDados, "Categorias");
                var containerFormaPagamento = cosmosClient.GetContainer(nomeBancoDados, "FormasPagamento");
                var containerTransacao = cosmosClient.GetContainer(nomeBancoDados, nomeContainer);

                var categoria = (await containerCategoria.ReadItemAsync<Categoria>(transacaoDto.IdCategoria, new PartitionKey(transacaoDto.IdCategoria))).Resource;
                var formaPagamento = (await containerFormaPagamento.ReadItemAsync<FormaPagamento>(transacaoDto.IdFormaPagamento, new PartitionKey(transacaoDto.IdFormaPagamento))).Resource;

                var transacao = new Transacao
                {
                    Categoria = categoria,
                    Descricao = transacaoDto.Descricao,
                    Despesa = transacaoDto.Despesa,
                    DataInclusao = transacaoDto.DataInclusao,
                    FormaPagamento = formaPagamento,
                    IdTransacaoPrincipal = transacaoDto.IdTransacaoPrincipal,
                    Nome = transacaoDto.Nome,
                    Rateado = transacaoDto.Rateado,
                    Realizado = transacaoDto.Realizado,
                    Valor = transacaoDto.Valor,
                };

                var response = await containerTransacao.CreateItemAsync(transacao);

                return EndpointBase.CustomResponse(response.Resource);

            }).WithOpenApi();
        }
    }
}
