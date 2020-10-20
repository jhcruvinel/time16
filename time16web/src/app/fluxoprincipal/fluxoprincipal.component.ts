import { Component, OnInit } from '@angular/core';
import { ParteFluxo } from './fluxo'
import axios from "axios";
import { Tribunal } from '../tribunal/tribunal';
import { Grau } from '../grau/grau';
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
  tribunais: Tribunal[] = [];
  tribunal: string;
  grau: string;
  graus: Grau[] = [];
  onstructor() {
    this.consultaFluxoPrincipal();
   }

  ngOnInit(): void {
    this.consultaTribunal();
    this.consultaSituacoes();
  }

  onChangeTribunal(tribunal) {
    console.log('Selecionou '+tribunal);
    this.consultaGraus(tribunal);    
  }

  onChangeGrau(grau) {
    console.log('Selecionou '+grau);
  }

  consultaTribunal() {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/tribunal")
    .then(response => {
      for (let obj of response.data) {
        this.tribunais.push(new Tribunal(obj.sg_tribunal));
      } 
      console.log('Tribunais carregados')
      if (this.tribunais.length == 1){
        this.tribunal = this.tribunais[0].sg_tribunal;
        this.consultaGraus(this.tribunal);
      }
      })
    .catch(error => { console.error(error); })
    .finally(() => {});
    }

  atualizar(){}


  consultaGraus(tribunal: string) {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/grau/"+tribunal)
    .then(response => {
      for (let obj of response.data) {
        this.graus.push(new Grau(obj.sg_grau));
      } 
      console.log('Graus carregados')
      if (this.graus.length == 1){
        this.grau = this.graus[0].sg_grau;
        this.consultaFluxoPrincipal();
      }
      })
    .catch(error => { console.error(error); })
    .finally(() => {});
    }


  consultaSituacoes() {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/situacao")
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

    getDsSituacao(id_situacao: number){
      if (this.situacoes){
        return this.situacoes.find(x => x.id_situacao == id_situacao).ds_situacao;
      }
      return "";
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
