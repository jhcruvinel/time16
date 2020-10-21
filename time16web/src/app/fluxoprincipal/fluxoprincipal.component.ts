import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ParteFluxo } from './fluxo';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../app-settings';
import { MatPaginator } from '@angular/material/paginator';
import { Visual3Component } from '../visual3/visual3.component'


@Component({
  selector: 'app-fluxoprincipal',
  templateUrl: './fluxoprincipal.component.html',
  styleUrls: ['./fluxoprincipal.component.css'],
})
export class FluxoprincipalComponent implements OnInit {
  displayedColumns: string[] = [
    'situacao_origem',
    'evento',
    'situacao_destino',
    'consistente',
    'efetiva',
    'grupo',
    'operacao',
  ];
  fluxoprincipal: ParteFluxo[] = [];

  endpoint: string = [AppSettings.API_ENDPOINT, 'v1.0/fluxo'].join('/');
  dataSource = new MatTableDataSource<ParteFluxo>();
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.consultaFluxoPrincipal();
  }
  atualizar() {}

  consultaFluxoPrincipal() {
    axios
      .get(this.endpoint)
      .then((response) => {
        this.dataSource.data = response.data;
      })
      .catch((error) => {
        this._snackBar.open(
          ['Erro ao pesquisar as transições'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      })
      .finally(() => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  excluir(id_fluxo_movimento) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Confirma a exclusão do registro?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        axios
          .delete([this.endpoint, id_fluxo_movimento].join('/'))
          .then((response) => {
            this._snackBar.open(
              'Registro Excluído com sucesso!',
              'Fechar',
              AppSettings.CONF_SNACK
            );
          })
          .catch((error) => {
            this._snackBar.open(
              [
                'O registro possui informações relacionadas e por isso não pode ser excluído',
              ].join(' - '),
              'Fechar',
              AppSettings.CONF_SNACK
            );
          });
      }
    });
  }
}
