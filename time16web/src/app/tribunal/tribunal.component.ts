import { Component, OnInit } from '@angular/core';
import { Tribunal } from './tribunal'
import axios from "axios";

@Component({
  selector: 'app-tribunal',
  templateUrl: './tribunal.component.html',
  styleUrls: ['./tribunal.component.css']
})
export class TribunalComponent implements OnInit {
  tribunais: Tribunal[] = [];
  constructor() { }

  ngOnInit(): void {
    this.consultaTribunal();
  }

  consultaTribunal() {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/tribunal")
    .then(response => {
      //console.log(response);
      for (let obj of response.data) {
        //console.log(obj);
        this.tribunais.push(new Tribunal(
            obj.sg_tribunal));
      }
      console.log('Tribunais carregados')
      })
    .catch(error => {
        console.error(error);
      })
    .finally(() => {});
    }

}
