export class ParteFluxo {
    id_evento: number;
    ind_consistente: string;
    id_fluxo_movimento: number;
    ind_fluxo_ri: string;
    sg_tribunal: string;
    id_situacao_destino: number;
    id_situacao_origem: number;
    ind_efetiva: string;
    id_grupo: number;
    sg_grau: string;
        constructor (
            id_evento: number,
            ind_consistente: string,
            id_fluxo_movimento: number,
            ind_fluxo_ri: string,
            sg_tribunal: string,
            id_situacao_destino: number,
            id_situacao_origem: number,
            ind_efetiva: string,
            id_grupo: number,
            sg_grau: string) {
                this.id_evento = id_evento;
                this.ind_consistente = ind_consistente;
                this.id_fluxo_movimento = id_fluxo_movimento;
                this.ind_fluxo_ri = ind_fluxo_ri;
                this.sg_tribunal = sg_tribunal;
                this.id_situacao_destino = id_situacao_destino;
                this.id_situacao_origem = id_situacao_origem;
                this.ind_efetiva = ind_efetiva;
                this.id_grupo = id_grupo;
                this.sg_grau = sg_grau;
        }
    }