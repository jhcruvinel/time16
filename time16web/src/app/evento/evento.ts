export class Evento {
    cd_evento: string;
    ind_tipo_especial: string;
    id_evento: number;
    ind_fluxo_ri: string;
    ds_evento: string;
        constructor (
            cd_evento: string,
            ind_tipo_especial: string,
            id_evento: number,
            ind_fluxo_ri: string,
            ds_evento: string) {
                this.cd_evento = cd_evento;
                this.ind_tipo_especial = ind_tipo_especial;
                this.id_evento = id_evento;
                this.ind_fluxo_ri = ind_fluxo_ri;
                this.ds_evento = ds_evento;
        }
    }