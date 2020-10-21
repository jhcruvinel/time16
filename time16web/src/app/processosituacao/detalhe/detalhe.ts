export class Detalhe {
    id_hist_situacao: number;
    dt_ocorrencia: string;
    ind_consistente: string;
    id_situacao: number;
    ds_situacao: string;
    id_situacao_2: number;
    ds_situacao_2: string;
    ds_evento: string;
    id_evento: number;
    nu_processo: string;
    cd_classe: string;
    cd_processo: string;
        constructor (
            id_hist_situacao: number,
            dt_ocorrencia: string,
            ind_consistente: string,
            id_situacao: number,
            ds_situacao: string,
            id_situacao_2: number,
            ds_situacao_2: string,
            ds_evento: string,
            id_evento: number,
            cd_classe: string,
            nu_processo: string,
            cd_processo: string) {
                this.id_hist_situacao = id_hist_situacao;
                this.dt_ocorrencia = dt_ocorrencia;
                this.ind_consistente = ind_consistente;
                this.id_situacao = id_situacao;
                this.ds_situacao = ds_situacao;
                this.id_situacao_2 = id_situacao_2;
                this.ds_situacao_2 = ds_situacao_2;
                this.ds_evento = ds_evento;
                this.id_evento = id_evento;
                this.nu_processo = nu_processo;
                this.cd_classe = cd_classe;
                this.cd_processo = cd_processo;
        }
    }