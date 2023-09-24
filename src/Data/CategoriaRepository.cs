using Financas.Models;
using Microsoft.Azure.Cosmos;

namespace Financas.Data
{
    public class CategoriaRepository
    {
        private readonly Container _container;

        public CategoriaRepository(CosmosClient cosmosClient, string databaseName)
        {
            _container = cosmosClient.GetContainer(databaseName, "Categorias");
        }

        public async Task<List<Categoria>> GetAll()
        {
            var iterator = _container.GetItemQueryIterator<Categoria>();
            return (await iterator.ReadNextAsync()).ToList();
        }

        public async Task<Categoria?> GetById(string id)
        {
            try
            {
                var categoria = (await _container.ReadItemAsync<Categoria>(id, new PartitionKey(id))).Resource;
                return categoria;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<Categoria?> GetByName(string name)
        {
            var query = new QueryDefinition("SELECT * FROM Categorias c WHERE LTRIM(RTRIM(UPPER(c.Nome))) = @nome")
                .WithParameter("@nome", name.ToUpper().Trim());

            var iterator = _container.GetItemQueryIterator<Categoria>(query);
            var categoria = (await iterator.ReadNextAsync()).FirstOrDefault();

            return categoria;
        }

        public async Task<Categoria> Insert(Categoria categoria)
        {
            var response = await _container.CreateItemAsync(categoria);
            return response.Resource;
        }

        public async Task<Categoria> Update(string id, Categoria categoria)
        {
            var response = await _container.ReplaceItemAsync(categoria, id, new PartitionKey(id));
            return response.Resource;
        }

        public async Task Delete(string id) => await _container.DeleteItemAsync<Categoria>(id, new PartitionKey(id));

    }
}
