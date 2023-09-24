using Financas.Data;
using Financas.Models;

namespace Financas.EndPoints
{
    public static class FormaPagamentoEndpoint
    {
        public static void MapEndpointsFormaPagamento(this WebApplication app)
        {
            app.MapGet("formas-de-pagamento", async (FormaPagamentoRepository formaPagamentoRepository) =>
            {
                var formasPagamento = await formaPagamentoRepository.GetAll();
                return EndpointBase.CustomResponse(formasPagamento);

            }).WithOpenApi();

            app.MapGet("formas-de-pagamento/{id}", async (FormaPagamentoRepository formaPagamentoRepository, string id) =>
            {
                var formaPagamento = await formaPagamentoRepository.GetById(id);
                if (formaPagamento == null)
                    return Results.NotFound();

                return EndpointBase.CustomResponse(formaPagamento);

            }).WithOpenApi();

            app.MapPost("formas-de-pagamento", async (FormaPagamento formaPagamento, FormaPagamentoRepository formaPagamentoRepository) =>
            {
                var erros = formaPagamento.IsValid();
                if (erros is not null && erros.Any())
                    return EndpointBase.CustomResponse(formaPagamento, erros);

                var formaPagamentoDb = await formaPagamentoRepository.GetByName(formaPagamento.Nome);
                if (formaPagamentoDb is not null)
                    return EndpointBase.CustomResponse(formaPagamentoDb, new List<string> { "Já existe uma forma de pagamento com esse nome" });

                formaPagamentoDb = await formaPagamentoRepository.Insert(formaPagamento);
                return EndpointBase.CustomResponse(formaPagamentoDb);

            }).WithOpenApi();

            app.MapPut("/formas-de-pagamento/{id}", async (FormaPagamentoRepository formaPagamentoRepository, string id, FormaPagamento formaPagamento) =>
            {
                var erros = formaPagamento.IsValid();
                if (erros is not null && erros.Any())
                    return EndpointBase.CustomResponse(formaPagamento, erros);

                var formaPagamentoDb = await formaPagamentoRepository.GetById(id);
                if (formaPagamentoDb is null)
                    return Results.NotFound();

                formaPagamentoDb = await formaPagamentoRepository.GetByName(formaPagamento.Nome);
                if (formaPagamentoDb is not null && formaPagamentoDb.Id != id)
                    return EndpointBase.CustomResponse(formaPagamentoDb, new List<string> { "Já existe uma forma de pagamento com esse nome" });

                formaPagamentoDb = await formaPagamentoRepository.Update(id, formaPagamento);

                return EndpointBase.CustomResponse(formaPagamentoDb);

            }).WithOpenApi();

            app.MapDelete("/formas-de-pagamento/{id}", async (FormaPagamentoRepository formaPagamentoRepository, string id) =>
            {
                var formaPagamento = await formaPagamentoRepository.GetById(id);
                if (formaPagamento is null)
                    return Results.NotFound();

                await formaPagamentoRepository.Delete(id);

                return EndpointBase.CustomResponse();

            }).WithOpenApi();
        }
    }
}
