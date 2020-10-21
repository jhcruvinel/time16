export class Processo {
    nu_processo: string;
    cd_orgao_julgador: number;
    ds_orgao_julgador: string;
    sg_tribunal: string;
    ind_presidencia: string;
    dt_autuacao: string;
    cd_classe: string;
    cd_processo: string;
    sg_grau: string;
        constructor (
            nu_processo: string,
            cd_orgao_julgador: number,
            ds_orgao_julgador: string,
            sg_tribunal: string,
            ind_presidencia: string,
            dt_autuacao: string,
            cd_classe: string,
            cd_processo: string,
            sg_grau: string) {
                this.nu_processo = nu_processo;
                this.cd_orgao_julgador = cd_orgao_julgador;
                this.ds_orgao_julgador = ds_orgao_julgador;
                this.sg_tribunal = sg_tribunal;
                this.ind_presidencia = ind_presidencia;
                this.dt_autuacao = dt_autuacao;
                this.cd_classe = cd_classe;
                this.cd_processo = cd_processo;
                this.sg_grau = sg_grau;
        }
    }
