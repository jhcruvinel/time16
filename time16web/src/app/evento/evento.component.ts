import { Component, OnInit } from '@angular/core';
import { Evento } from './evento'
import axios from "axios";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventos: Evento[] = [];
  constructor() { 
    this.consultaEventos();
  }

  ngOnInit(): void {
  }

  consultaEventos() {
    axios.get("http://time16-sanjus.ddns.net:5002/eventos")
    .then(response => {
      //console.log(response);
      for (let obj of response.data) {
        //console.log(obj);
        this.eventos.push(new Evento(
          obj.cd_evento,
          obj.ind_tipo_especial,
          obj.id_evento,
          obj.ind_fluxo_ri,
          obj.ds_evento));
      }
      console.log('Eventos carregados')
      })
    .catch(error => {
        console.error(error);
      })
    .finally(() => {});
    }

}
