﻿namespace Financas.DTO
{
    public record TransacaoInsertDto(string Nome, string Descricao, decimal Valor, bool Despesa, bool Realizado, DateTime DataInclusao, string IdTransacaoPrincipal, bool Rateado, string CategoriaId, string FormaPagamentoId);
    
}
