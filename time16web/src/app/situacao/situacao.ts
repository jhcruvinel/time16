export class Situacao {
    ind_principal: string;
    ds_situacao: string;
    sg_tribunal: string;
    ind_ri: string;
    id_situacao: number;
    cd_situacao: string;
    sg_grau: string;
        constructor (
            ind_principal: string,
            ds_situacao: string,
            sg_tribunal: string,
            ind_ri: string,
            id_situacao: number,
            cd_situacao: string,
            sg_grau: string) {
                this.ind_principal = ind_principal;
                this.ds_situacao = ds_situacao;
                this.sg_tribunal = sg_tribunal;
                this.ind_ri = ind_ri;
                this.id_situacao = id_situacao;
                this.cd_situacao = cd_situacao;
                this.sg_grau = sg_grau;
        }
    }