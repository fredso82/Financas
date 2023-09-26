using Financas.Models;
using Microsoft.Azure.Cosmos;

namespace Financas.Data
{
    public class FormaPagamentoRepository
    {
        private readonly Container _container;

        public FormaPagamentoRepository(CosmosClient cosmosClient, string databaseName)
        {
            _container = cosmosClient.GetContainer(databaseName, "FormasPagamento");
        }

        public async Task<List<FormaPagamento>> GetAll()
        {
            var iterator = _container.GetItemQueryIterator<FormaPagamento>();
            return (await iterator.ReadNextAsync()).ToList();
        }

        public async Task<FormaPagamento?> GetById(string id)
        {
            try
            {
                var formaPagamento = (await _container.ReadItemAsync<FormaPagamento>(id, new PartitionKey(id))).Resource;
                return formaPagamento;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<FormaPagamento?> GetByName(string name)
        {
            var query = new QueryDefinition("SELECT * FROM FormasPagamento f WHERE LTRIM(RTRIM(UPPER(f.Nome))) = @nome")
                .WithParameter("@nome", name.ToUpper().Trim());

            var iterator = _container.GetItemQueryIterator<FormaPagamento>(query);
            var formaPagamento = (await iterator.ReadNextAsync()).FirstOrDefault();

            return formaPagamento;
        }

        public async Task<FormaPagamento> Insert(FormaPagamento formaPagamento)
        {
            var response = await _container.CreateItemAsync(formaPagamento);
            return response.Resource;
        }

        public async Task<FormaPagamento> Update(string id, FormaPagamento formaPagamento)
        {
            var response = await _container.ReplaceItemAsync(formaPagamento, id, new PartitionKey(id));
            return response.Resource;
        }

        public async Task Delete(string id) => await _container.DeleteItemAsync<FormaPagamento>(id, new PartitionKey(id));

    }
}
