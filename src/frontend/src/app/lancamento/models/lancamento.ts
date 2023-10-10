import { Categoria } from "src/app/categoria/models/categoria";
import { FormaPagamento } from "src/app/forma-pagamento/models/forma-pagamento";

export class Lancamento {
    id?: string = "";
    nome: string = "";
    descricao?: string = "";
    valor: number = 0.0;
    despesa: boolean = true;
    realizado: boolean = true;
    dataInclusao: Date = new Date();
    rateado: boolean = false;
    idLancamentoPrincipal?: string = "";
    categoriaId?: string = "";
    categoria?: Categoria = new Categoria();
    formaPagamentoId?: string = ""
    formaPagamento?: FormaPagamento = new FormaPagamento();
}

export class LancamentoInclusao {
    nome: string = "";
    descricao: string = "";
    valor: number = 0.0;
    despesa: string = "";
    realizado: string = "";
    dataInclusao: Date = new Date();
    rateado: string = "";
    idLancamentoPrincipal?: string = "";
    categoriaId: string = "";
    formaPagamentoId: string = ""
}