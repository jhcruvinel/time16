import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';
import { DialogIncluirMovimentos, DialogMovimentos } from '../evento.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-evento.create',
  templateUrl: './evento.create.component.html',
  styleUrls: ['./evento.create.component.css'],
})
export class EventoCreateComponent implements OnInit {
  eventoForm: FormGroup;

  id_evento: number = null;

  indTipoEspecial = [
    { value: 'C', viewValue: 'Decisão Colegiada' },
    { value: 'M', viewValue: 'Decisão Monocrática' },
    { value: 'P', viewValue: 'Presidência' },
    { value: 'N', viewValue: 'N/A' },
  ];

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      cd_evento: ['', Validators.required],
      ds_evento: ['', Validators.required],
      ind_tipo_especial: ['', Validators.required],
      ind_fluxo_ri: ['N'],
    });
  }

  exibirMovimentos() {
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/evento', this.id_evento, 'movimento'].join('/'))
      .then((response) => {
        console.log(response.data);
        this.dialog.open(DialogMovimentos, {
          data: response.data,
        });
      })
      .catch((error) => {
        this._snackBar.open(
          [
            'Erro ao listar os movimentos',
          ].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });
  }
  adicionarMovimentos() {
    const dialogRef = this.dialog.open(DialogIncluirMovimentos, {
      width: '250px',
      data: { id_evento: this.id_evento, cd_evento: this.eventoForm.value },
    });

    dialogRef.afterClosed().subscribe((cod_tpu_movimento) => {
      if (cod_tpu_movimento) {
        axios
          .post([AppSettings.API_ENDPOINT, 'v1.0/movimento'].join('/'), {
            cd_tpu_movimento: cod_tpu_movimento,
            id_evento: this.id_evento,
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

  salvarEvento(values) {
    console.log(values);
    if (this.eventoForm.status === 'VALID') {
      let json_data = JSON.stringify(values);
      console.log(json_data);
      try {
        axios
          .post([AppSettings.API_ENDPOINT, 'v1.0/evento'].join('/'), json_data)
          .then((response) => {
            this.id_evento = response.data['id_evento'];
            this._snackBar.open(
              'Registro Inserido com sucesso!',
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
      } catch {
        this._snackBar.open(
          ['Erro no processamento'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      }
    } else {
      this._snackBar.open(
        ['Preencha todos os campos'].join(' - '),
        'Fechar',
        AppSettings.CONF_SNACK
      );
    }
  }

  submitForm() {
    this.salvarEvento(this.eventoForm.value);
  }
}
