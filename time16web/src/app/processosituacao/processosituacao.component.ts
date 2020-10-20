import { Component, OnInit, ViewChild } from '@angular/core';
import { Processo } from './processo';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../app-settings';


@Component({
  selector: 'app-processosituacao',
  templateUrl: './processosituacao.component.html',
  styleUrls: ['./processosituacao.component.css']
})
export class ProcessosituacaoComponent implements OnInit {

  durationInSeconds: number = 5;
  displayedColumns: string[] = ['nu_processo', 'cd_classe', 'ds_situacao_origem', 'ds_evento', 'ds_situacao_destino', 'dt_ocorrencia'];
  dataSource = new MatTableDataSource<Processo>();
  consistente = '';

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //this.consultaProcessoSituacao();
  }

  onChangeConsistente(){
    this.dataSource.data = [];
    this.consultaProcessoSituacao();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  consultaProcessoSituacao() {
    console.log([AppSettings.API_ENDPOINT, 'v1.0/situacao', this.consistente].join('/'))
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/situacao', this.consistente].join('/'))
      .then((response) => {
        this.dataSource.data = response.data;
        //console.log(this.dataSource.data)
      })
      .catch((error) => {
        this._snackBar.open(
          ['Erro no processamento'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      })
      .finally(() => {});
  }


}
