namespace Financas.DTO
{
    public record TransacaoInclusaoDto(string Nome, string Descricao, decimal Valor, bool Despesa, bool Realizado, DateTime DataInclusao, string IdTransacaoPrincipal, bool Rateado, string IdCategoria, string IdFormaPagamento);
    
}
