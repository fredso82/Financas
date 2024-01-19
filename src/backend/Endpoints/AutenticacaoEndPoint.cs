using Financas.DTO;

namespace Financas.EndPoints;
public static class AutenticacaoEndPoint
{
    public static void MapEndpointsAutenticacao(this WebApplication app)
    {
        app.MapPost("login", (LoginDto login) =>
        {
            if (login == null)
                return Results.NotFound("Login ou senha inválidos");

            if (login.Login != "admin" || login.Senha != "admin")
                return Results.NotFound("Login ou senha inválidos");
            
            var token = TokenService.GerenateToken(login);

            return Results.Ok(token);

        }).WithOpenApi();

    }

}
