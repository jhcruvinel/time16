import { Component, OnInit, ViewChild } from '@angular/core';
import { Situacao } from './situacao';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css'],
})
export class SituacaoComponent implements OnInit {
  durationInSeconds: number = 5;
  displayedColumns: string[] = ['cd_situacao', 'ds_situacao', 'operacao'];
  dataSource = new MatTableDataSource<Situacao>();

  endpoint: string = [AppSettings.API_ENDPOINT, 'v1.0/situacao'].join('/');

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.consultaSituacao();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  excluir(id_situacao) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Confirma a exclusão do registro?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        axios
          .delete([this.endpoint, id_situacao].join('/'))
          .then((response) => {
            this.consultaSituacao();
            this._snackBar.open(
              'Registro Excluído com sucesso!',
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
          });
      }
    });
  }

  consultaSituacao() {
    axios
      .get(this.endpoint)
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
