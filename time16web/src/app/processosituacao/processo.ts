export class Processo {
    nu_processo: string;
    cd_classe: number;
    cd_processo: string;
    ds_situacao_origem: string;
    ds_evento: string;
    ds_situacao_destino: string;
    dt_ocorrencia: string;
    ind_consistente: string;
        constructor (
            nu_processo: string,
            cd_classe: number,
            cd_processo: string,
            ds_situacao_origem: string,
            ds_evento: string,
            ds_situacao_destino: string,
            dt_ocorrencia: string,
            ind_consistente: string) {
                this.nu_processo = nu_processo;
                this.cd_classe = cd_classe;
                this.cd_processo = cd_processo;
                this.ds_situacao_origem = ds_situacao_origem;
                this.ds_evento = ds_evento;
                this.ds_situacao_destino = ds_situacao_destino;
                this.dt_ocorrencia = dt_ocorrencia;
                this.ind_consistente = ind_consistente;
        }
    }