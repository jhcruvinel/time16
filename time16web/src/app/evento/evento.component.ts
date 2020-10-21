import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Evento } from './evento';
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

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  displayedColumns: string[] = [
    'cd_evento',
    'ds_evento',
    'ind_tipo_especial',
    'operacao',
  ];
  expandedElement: Evento | null;
  dataSource = new MatTableDataSource<Evento>();
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  evento: Evento;

  endpoint: string = [AppSettings.API_ENDPOINT, 'v1.0/evento'].join('/');

  ngOnInit(): void {
    this.consultaEventos();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  exibirMovimentos(id_evento) {
    axios
      .get([this.endpoint, id_evento, 'movimento'].join('/'))
      .then((response) => {
        console.log(response.data);
        this.dialog.open(DialogMovimentos, {
          data: response.data,
        });
      })
      .catch((error) => {
        this._snackBar.open(
          [
            'Erro ao listar os movimentos.',
          ].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });
  }

  adicionarMovimentos(elemento) {
    const dialogRef = this.dialog.open(DialogIncluirMovimentos, {
      width: '250px',
      data: { id_evento: elemento.id_evento, cd_evento: elemento.cd_evento },
    });

    dialogRef.afterClosed().subscribe((cod_tpu_movimento) => {
      if (cod_tpu_movimento) {
        axios
          .post([AppSettings.API_ENDPOINT, 'v1.0/movimento'].join('/'), {
            cd_tpu_movimento: cod_tpu_movimento,
            id_evento: elemento.id_evento,
          })
          .then((response) => {
            this._snackBar.open(
              'O movimento foi incluído com sucesso!',
              'Fechar',
              AppSettings.CONF_SNACK
            );
          })
          .catch((error) => {
            this._snackBar.open(
              'Erro ao vincular o movimento!',
              'Fechar',
              AppSettings.CONF_SNACK
            );
          });
      } else {
        this._snackBar.open(
          'Selecione um movimento para a inclusão',
          'Fechar',
          AppSettings.CONF_SNACK
        );
      }
    });
  }
  excluir(id_evento) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Confirma a exclusão do registro?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        axios
          .delete([this.endpoint, id_evento].join('/'))
          .then((response) => {
            this.consultaEventos();
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

  getDsTipoEspecial(indTipoEspecial: string): string {
    return indTipoEspecial == 'P'
      ? 'Presidência'
      : indTipoEspecial == 'M'
      ? 'Decisão Monocrática'
      : indTipoEspecial == 'C'
      ? 'Decisão Colegiada'
      : 'N/A';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultaEventos() {
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

@Component({
  selector: 'movimentos-dialog',
  templateUrl: 'movimentos-dialog.html',
})
export class DialogMovimentos implements OnInit {
  dataSource = new MatTableDataSource();
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
  displayedColumns: string[] = ['cd_tpu_movimento', 'operacao'];

  excluirMovimento(id_movimento) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Confirma a exclusão do registro?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        axios
          .delete(
            [AppSettings.API_ENDPOINT, 'v1.0/movimento', id_movimento].join('/')
          )
          .then((response) => {
            this._snackBar.open(
              'Registro Excluído com sucesso!',
              'Fechar',
              AppSettings.CONF_SNACK
            );
            this.dataSource.data = this.dataSource.data.filter(
              (value, index, arr) => {
                return value['id_movimento'] != id_movimento;
              }
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

@Component({
  selector: 'incluir-movimentos-dialog',
  templateUrl: 'incluir-movimentos-dialog.html',
})
export class DialogIncluirMovimentos {
  constructor(
    public dialogRef: MatDialogRef<DialogIncluirMovimentos>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
