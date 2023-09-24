using Financas.Models;
using Microsoft.Azure.Cosmos;

namespace Financas.Data
{
    public class TransacaoRepository
    {
        private readonly Container _container;

        public TransacaoRepository(CosmosClient cosmosClient, string databaseName)
        {
            _container = cosmosClient.GetContainer(databaseName, "Transacoes");
        }

        public async Task<List<Transacao>> GetAll()
        {
            var iterator = _container.GetItemQueryIterator<Transacao>();
            return (await iterator.ReadNextAsync()).ToList();
        }

        public async Task<Transacao?> GetById(string id)
        {
            try
            {
                var transacao = (await _container.ReadItemAsync<Transacao>(id, new PartitionKey(id))).Resource;
                return transacao;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<Transacao> Insert(Transacao transacao)
        {
            var response = await _container.CreateItemAsync(transacao);
            return response.Resource;
        }

        public async Task<Transacao> Update(string id, Transacao transacao)
        {
            var response = await _container.ReplaceItemAsync(transacao, id, new PartitionKey(id));
            return response.Resource;
        }

        public async Task Delete(string id) => await _container.DeleteItemAsync<Transacao>(id, new PartitionKey(id));

    }
}
