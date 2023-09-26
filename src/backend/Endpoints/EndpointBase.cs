namespace Financas.EndPoints
{
    public static class EndpointBase
    {
        public static IResult CustomResponse(object? result = null, List<string>? erros = null)
        {
            if (erros is not null && erros.Any())
                return Results.BadRequest(new CustomResult(result, erros));

            return Results.Ok(new CustomResult(result));
        }
    }
}
