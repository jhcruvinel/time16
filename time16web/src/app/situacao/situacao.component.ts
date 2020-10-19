import { Component, OnInit } from '@angular/core';
import { Situacao } from './situacao'
import axios from "axios";

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css']
})
export class SituacaoComponent implements OnInit {

  situacoes: Situacao[] = [];
  constructor() { 
    this.consultaSituacoes();
  }

  ngOnInit(): void {
  }

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

}
