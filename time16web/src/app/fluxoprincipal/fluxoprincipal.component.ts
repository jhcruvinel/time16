import { Component, OnInit } from '@angular/core';
import { ParteFluxo } from './fluxo'
import axios from "axios";
import { Situacao } from '../situacao/situacao'
import * as d3 from 'd3';

@Component({
  selector: 'app-fluxoprincipal',
  templateUrl: './fluxoprincipal.component.html',
  styleUrls: ['./fluxoprincipal.component.css']
})
export class FluxoprincipalComponent implements OnInit {
  situacoes: Situacao[] = [];
  fluxoprincipal: ParteFluxo[] = [];
  tribunais: string[] = [];
  constructor() {
    this.consultaFluxoPrincipal();
   }

  ngOnInit(): void {
    this.consultaSituacoes()
  }

  atualizar(){}

  consultaSituacoes() {
    axios.get("http://time16-sanjus.ddns.net:5002/situacoes")
    .then(response => {
      //console.log(response);
      for (let obj of response.data) {
        //console.log(obj);
        this.situacoes.push(new Situacao(
            obj.ind_principal,
            obj.ds_situacao,
            obj.sg_tribunal,
            obj.ind_ri,
            obj.id_situacao,
            obj.cd_situacao,
            obj.sg_grau));
      }
      console.log('Situacoes carregadas')
      })
    .catch(error => {
        console.error(error);
      })
    .finally(() => {});
    }

    getDsSituacao(id_situacao_origem: number){
      
    }

  consultaFluxoPrincipal() {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/fluxo")
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
          '',
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
