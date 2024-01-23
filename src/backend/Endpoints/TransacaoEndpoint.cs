using Financas.Data;
using Financas.DTO;
using Financas.Models;

namespace Financas.EndPoints
{
    public static class TransacaoEndpoint
    {
        public static void MapEndpointsTransacao(this WebApplication app)
        {
            app.MapGet("transacoes", async (TransacaoRepository transacaoRepository) =>
            {
                var transacoes = await transacaoRepository.GetAll();
                return Results.Ok(transacoes);

            }).WithOpenApi();

            app.MapGet("transacaoes-por-mes/{ano}/{mes}", async(TransacaoRepository transacaoRepository, int ano, int mes) =>
            {
                var transacoes = await transacaoRepository.GetByMonth(ano, mes);
                return Results.Ok(transacoes);

            }).WithOpenApi().AllowAnonymous();

            app.MapGet("transacoes/{id}", async (TransacaoRepository transacaoRepository, string id) =>
            {
                var transacao = await transacaoRepository.GetById(id);
                if (transacao == null)
                    return Results.NotFound();

                return Results.Ok(transacao);

            }).WithOpenApi();

            app.MapPost("transacoes", async (TransacaoInsertDto transacaoDto, TransacaoRepository transacaoRepository,
                CategoriaRepository categoriaRepository, FormaPagamentoRepository formaPagamentoRepository) =>
            {
                var categoria = await categoriaRepository.GetById(transacaoDto.CategoriaId);
                if (categoria is null)
                    return Results.BadRequest(new List<string> { "A categoria informada não foi localizada" });

                var formaPagamento = await formaPagamentoRepository.GetById(transacaoDto.FormaPagamentoId);
                if (formaPagamento is null)
                    return Results.BadRequest(new List<string> { "A forma de pagamento informada não foi localizada" });

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

                var erros = transacao.IsValid();
                if (erros.Any())
                    return Results.BadRequest(erros);

                var transacaoDb = await transacaoRepository.Insert(transacao);

                return Results.Ok(transacaoDb);

            }).WithOpenApi();

            app.MapPut("/transacoes/{id}", async (TransacaoRepository transacaoRepository, string id, TransacaoInsertDto transacaoDto,
                CategoriaRepository categoriaRepository, FormaPagamentoRepository formaPagamentoRepository) =>
            {
                var categoria = await categoriaRepository.GetById(transacaoDto.CategoriaId);
                if (categoria is null)
                    return Results.BadRequest(new List<string> { "A categoria informada não foi localizada" });

                var formaPagamento = await formaPagamentoRepository.GetById(transacaoDto.FormaPagamentoId);
                if (formaPagamento is null)
                    return Results.BadRequest(new List<string> { "A forma de pagamento informada não foi localizada" });

                var transacao = await transacaoRepository.GetById(id);
                if (transacao is null)
                    return Results.BadRequest(new List<string> { "Não foi possível localizar os dados do id informado" });

                transacao.Categoria = categoria;
                transacao.Descricao = transacaoDto.Descricao;
                transacao.Despesa = transacaoDto.Despesa;
                transacao.DataInclusao = transacaoDto.DataInclusao;
                transacao.FormaPagamento = formaPagamento;
                transacao.IdTransacaoPrincipal = transacaoDto.IdTransacaoPrincipal;
                transacao.Nome = transacaoDto.Nome;
                transacao.Rateado = transacaoDto.Rateado;
                transacao.Realizado = transacaoDto.Realizado;
                transacao.Valor = transacaoDto.Valor;

                var erros = transacao.IsValid();
                if (erros.Any())
                    return Results.BadRequest( erros);

                var transacaoDb = await transacaoRepository.Update(id, transacao);
                return Results.Ok(transacaoDb);

            }).WithOpenApi();

            app.MapDelete("/transacoes/{id}", async (TransacaoRepository transacaoRepository, string id) =>
            {
                var transacao = await transacaoRepository.GetById(id);
                if (transacao is null)
                    return Results.NotFound();

                await transacaoRepository.Delete(id);

                return Results.Ok();

            }).WithOpenApi();
        }
    }
}
