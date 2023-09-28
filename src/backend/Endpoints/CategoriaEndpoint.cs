using Financas.Data;
using Financas.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Financas.EndPoints
{
    public static class CategoriaEndpoint
    {
        public static void MapEndpointsCategoria(this WebApplication app)
        {
            app.MapGet("categorias", async (CategoriaRepository categoriaRepository) =>
            {
                var categorias = await categoriaRepository.GetAll();
                return Results.Ok(categorias);

            }).WithOpenApi();

            app.MapGet("categorias/{id}", async (CategoriaRepository categoriaRepository, string id) =>
            {
                var categoria = await categoriaRepository.GetById(id);
                if (categoria == null)
                    return Results.NotFound();

                return Results.Ok(categoria);

            }).WithOpenApi();

            app.MapPost("categorias", async (CategoriaRepository categoriaRepository, Categoria categoria) =>
            {
                var erros = categoria.IsValid();
                if (erros is not null && erros.Any())
                    return Results.BadRequest(erros);

                var categoriaDb = await categoriaRepository.GetByName(categoria.Nome);
                if (categoriaDb is not null)
                    return Results.BadRequest(new List<string> { "Já existe uma categoria com esse nome" });

                categoriaDb = await categoriaRepository.Insert(categoria);
                return Results.Ok(categoriaDb);

            }).WithOpenApi();

            app.MapPut("/categorias/{id}", async (CategoriaRepository categoriaRepository, string id, Categoria categoria) =>
            {
                var erros = categoria.IsValid();
                if (erros is not null && erros.Any())
                    return Results.BadRequest(erros);

                var categoriaDb = await categoriaRepository.GetById(id);
                if (categoriaDb is null)
                    return Results.NotFound();

                categoriaDb = await categoriaRepository.GetByName(categoria.Nome);
                if (categoriaDb is not null && categoriaDb.Id != id)
                    return Results.BadRequest(new List<string> { "Já existe uma categoria com esse nome" });

                categoriaDb = await categoriaRepository.Update(id, categoria);

                return Results.Ok(categoriaDb);

            }).WithOpenApi();

            app.MapDelete("/categorias/{id}", async (CategoriaRepository categoriaRepository, string id) =>
            {
                var categoria = await categoriaRepository.GetById(id);
                if (categoria is null)
                    return Results.NotFound();

                await categoriaRepository.Delete(id);

                return Results.Ok();

            }).WithOpenApi();
        }
    }
}
