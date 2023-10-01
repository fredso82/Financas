using Newtonsoft.Json;

namespace Financas.Models
{
    public class FormaPagamento
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;

        public FormaPagamento(string nome)
        {
            Id = Guid.NewGuid().ToString();
            Nome = nome;

        }
        public List<string> IsValid()
        {
            var erros = new List<string>();
            if (string.IsNullOrWhiteSpace(Nome))
                erros.Add("O nome da forma de pagamento é obrigatório");

            return erros;
        }
    }
}
