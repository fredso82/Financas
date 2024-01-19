using Financas.DTO;

namespace Financas.EndPoints;
public static class AutenticacaoEndPoint
{
    public static void MapEndpointsAutenticacao(this WebApplication app)
    {
        app.MapPost("login", (LoginDto login) =>
            {
                if (login.Login == "admin" && login.Senha == "admin")
                {

                }
                
                return Results.Ok(categoriaDb);

            }).WithOpenApi();

    }

}
