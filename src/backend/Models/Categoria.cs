using Newtonsoft.Json;

namespace Financas.Models
{
    public class Categoria
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;
        //public List<Transacao> Transacoes { get; set; }

        public Categoria(string nome)
        {
            Id =  Guid.NewGuid().ToString();
            Nome = nome;
        }

        public List<string> IsValid()
        {
            var erros = new List<string>();
            if (string.IsNullOrWhiteSpace(Nome))
                erros.Add("O nome da categoria é obrigatório");

            return erros;
        }
    }
}
