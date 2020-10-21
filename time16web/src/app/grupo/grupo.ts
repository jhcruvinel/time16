export class Grupo {
    cd_grupo: string;
    sg_tribunal: string;
    id_grupo: number;
    ds_grupo: string;
    sg_grau: string;
        constructor (
            cd_grupo: string,
            sg_tribunal: string,
            id_grupo: number,
            ds_grupo: string,
            sg_grau: string) {
                this.cd_grupo = cd_grupo;
                this.sg_tribunal = sg_tribunal;
                this.id_grupo = id_grupo;
                this.ds_grupo = ds_grupo;
                this.sg_grau = sg_grau;
        }
    }