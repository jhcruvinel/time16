import { Component, OnInit } from '@angular/core';
import { ParteFluxo } from './fluxo'
import axios from "axios";
import * as d3 from 'd3';

@Component({
  selector: 'app-fluxoprincipal',
  templateUrl: './fluxoprincipal.component.html',
  styleUrls: ['./fluxoprincipal.component.css']
})
export class FluxoprincipalComponent implements OnInit {
  private svg: any;
  fluxoprincipal: ParteFluxo[] = [];
  tribunais: string[] = [];
  constructor() {
    this.consultaFluxoPrincipal();
   }

  ngOnInit(): void {
  }

  atualizar(){}

  consultaFluxoPrincipal() {
    axios.get("http://time16-sanjus.ddns.net:5002/fluxo/principal")
    .then(response => {
      //console.log(response);
      for (let obj of response.data) {
        //console.log(obj);
        if (!this.tribunais.includes(obj.sg_tribunal)){
          console.log('adicionando '+obj.sg_tribunal)
          this.tribunais.push(obj.sg_tribunal);
        }
        this.fluxoprincipal.push(new ParteFluxo(
          obj.id_evento,
          obj.ind_consistente,
          obj.id_fluxo_movimento,
          obj.ind_fluxo_ri,
          obj.sg_tribunal,
          obj.id_situacao_destino,
          obj.id_situacao_origem,
          obj.ind_efetiva,
          obj.id_grupo,
          obj.sg_grau));
      }
      console.log('Partes do fluxo principal carregadas')
      })
    .catch(error => {
        console.error(error);
      })
    .finally(() => {});
    }

   
  

}
