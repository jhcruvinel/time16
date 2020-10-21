import { Component, OnInit, ViewChild } from '@angular/core';
import { Processo } from './processo';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../app-settings';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-processosituacao',
  templateUrl: './processosituacao.component.html',
  styleUrls: ['./processosituacao.component.css'],
})
export class ProcessosituacaoComponent implements OnInit {
  durationInSeconds: number = 5;
  displayedColumns: string[] = [
    'nu_processo',
    'cd_processo',
    'cd_classe',
    'sg_tribunal',
    'sg_grau',
    'ds_orgao_julgador',
    'ind_presidencia',
    'dt_autuacao',
    'operacao'
  ];
  dataSource = new MatTableDataSource<Processo>();
  consistente = '';

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //this.consultaProcessoSituacao();
  }

  onChangeConsistente() {
    this.dataSource.data = [];
    this.consultaProcessoSituacao();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultaProcessoSituacao() {
    console.log(
      [AppSettings.API_ENDPOINT, 'v1.0/situacao', this.consistente].join('/')
    );
    axios
      .get(
        [AppSettings.API_ENDPOINT, 'v1.0/situacao', this.consistente].join('/')
      )
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

  refresh(
    cod_tribunal: string,
    sg_grau: string,
    cd_processo: string
    ){
    let json_data = JSON.stringify({"cod_tribunal": cod_tribunal, "sg_grau": sg_grau, "cd_processo": cd_processo});
    console.log('Fazendo a carga do processo '+json_data);
    axios
      .post(
        [AppSettings.API_ENDPOINT, 'v1.0/processo/carga'].join('/'),
        json_data
      )
      .then((response) => {
        this.dataSource.data = response.data;
        //console.log(this.dataSource.data)
        this._snackBar.open(
          'Processo '+cd_processo+' carregado com sucesso',
          'Fechar',
          AppSettings.CONF_SNACK
        );
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
