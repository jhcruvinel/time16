import { Component, OnInit, ViewChild } from '@angular/core';
import { Detalhe } from './detalhe';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, formatNumeroProcesso } from '../../app-settings';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  durationInSeconds: number = 5;
  cd_processo: string = '';
  displayedColumns: string[] = [
    'id_hist_situacao',
    'dt_ocorrencia',
    'ds_situacao',
    'ds_evento',
    'ds_situacao_2',
  ];
  dataSource = new MatTableDataSource<Detalhe>();
  consistente = '';

  constructor(
    private _location: Location,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cd_processo = this.route.snapshot.paramMap.get('cdProcesso');
    //console.log(this.cd_processo);
    this.consultaDetalhe();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  back() {
    this._location.back();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  formataNumeroProcesso(processo) {
    return formatNumeroProcesso(processo);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultaDetalhe() {
    axios
      .get(
        [
          AppSettings.API_ENDPOINT,
          'v1.0/situacao/processo',
          this.cd_processo,
        ].join('/')
      )
      .then((response) => {
        this.dataSource.data = response.data;
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
