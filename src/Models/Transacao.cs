using Newtonsoft.Json;

namespace Financas.Models
{
    public class Transacao
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; } = 0;
        public bool Despesa { get; set; } = true;
        public bool Realizado { get; set; } = true;
        public DateTime DataInclusao { get; set; } = DateTime.Now;
        public string IdTransacaoPrincipal { get; set; } = string.Empty;
        public bool Rateado { get; set; } = false;
        public Categoria? Categoria { get; set; } = null;
        public FormaPagamento? FormaPagamento { get; set; } = null;
    }
}
