import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from './grupo';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  durationInSeconds: number = 5;
  displayedColumns: string[] = ['cd_grupo', 'ds_grupo','operacao'];
  dataSource = new MatTableDataSource<Grupo>();

  endpoint: string = [AppSettings.API_ENDPOINT, 'v1.0/grupo'].join('/');

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.consultaGrupo();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  excluir(id_grupo) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Confirma a exclusão do registro?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        axios
          .delete([this.endpoint, id_grupo].join('/'))
          .then((response) => {
            this.consultaGrupo();
            this._snackBar.open(
              'Registro Excluído com sucesso!',
              'Fechar',
              AppSettings.CONF_SNACK
            );
          })
          .catch((error) => {
            this._snackBar.open(
              ['O registro possui informações relacionadas e por isso não pode ser excluído'].join(' - '),
              'Fechar',
              AppSettings.CONF_SNACK
            );
          });
      }
    });
  }

  consultaGrupo() {
    axios
      .get(this.endpoint)
      .then((response) => {
        console.log(response.data);
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