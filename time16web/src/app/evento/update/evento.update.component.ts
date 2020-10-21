import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';
import { DialogIncluirMovimentos, DialogMovimentos } from '../evento.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-evento.update',
  templateUrl: './evento.update.component.html',
  styleUrls: ['./evento.update.component.css'],
})
export class EventoUpdateComponent implements OnInit {
  eventoForm: FormGroup = this.fb.group({
    id_evento: [''],
    cd_evento: ['', Validators.required],
    ds_evento: ['', Validators.required],
    ind_tipo_especial: ['', Validators.required],
    ind_fluxo_ri: ['N'],
  });

  id_evento: any = null;

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
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id_evento = this.route.snapshot.paramMap.get('idEvento');
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/evento', this.id_evento].join('/'))
      .then((response) => {
        for (let obj of response.data) {
          this.eventoForm.setValue({
            id_evento: obj.id_evento,
            cd_evento: obj.cd_evento,
            ds_evento: obj.ds_evento,
            ind_tipo_especial: obj.ind_tipo_especial,
            ind_fluxo_ri: obj.ind_fluxo_ri,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this._snackBar.open(
          [
            'Erro no processamento, não foi possível localizar o evento',
            this.id_evento,
          ].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });
  }

  exibirMovimentos() {
    axios
      .get(
        [
          AppSettings.API_ENDPOINT,
          'v1.0/evento',
          this.id_evento,
          'movimento',
        ].join('/')
      )
      .then((response) => {
        console.log(response.data);
        this.dialog.open(DialogMovimentos, {
          data: response.data,
        });
      })
      .catch((error) => {
        this._snackBar.open(
          ['Erro ao listar os movimentos'].join(' - '),
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
          .put([AppSettings.API_ENDPOINT, 'v1.0/evento'].join('/'), json_data)
          .then((response) => {
            this._snackBar.open(
              'Registro Alterado com sucesso!',
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
