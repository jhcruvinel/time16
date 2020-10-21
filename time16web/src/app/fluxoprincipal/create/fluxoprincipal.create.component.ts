import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-fluxoprincipal-create',
  templateUrl: './fluxoprincipal.create.component.html',
  styleUrls: ['./fluxoprincipal.create.component.css'],
})
export class FluxoPrincipalCreateComponent implements OnInit {
  /**
   *    "id_evento": 28,
        "ind_consistente": "N",
        "id_fluxo_movimento": 2,
        "ind_fluxo_ri": "N",
        "sg_tribunal": "TRT3",
        "id_situacao_origem": 61,
        "id_situacao_destino": 141,
        "ind_efetiva": "S",
        "id_grupo_2": 10,
        "sg_grau": "G2"
    },
   */
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  finalForm: FormGroup;

  ind_sim_nao = [
    { value: 'S', viewValue: 'Sim' },
    { value: 'N', viewValue: 'Não' },
  ];

  vl_eventos: any = [];
  vl_situacoes: any = [];
  vl_grupos: any = [];

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/grupo'].join('/'))
      .then((response) => {
        for (let element of response.data) {
          this.vl_grupos.push({
            value: element['id_grupo'],
            viewValue: element['ds_grupo'],
          });
        }
      })
      .catch((error) => {
        this._snackBar.open(
          ['Erro ao listar os eventos do sistema.'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });

    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/evento'].join('/'))
      .then((response) => {
        for (let element of response.data) {
          this.vl_eventos.push({
            value: element['id_evento'],
            viewValue: element['ds_evento'],
          });
        }
      })
      .catch((error) => {
        this._snackBar.open(
          ['Erro ao listar os eventos do sistema.'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });

    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/situacao'].join('/'))
      .then((response) => {
        for (let element of response.data) {
          this.vl_situacoes.push({
            value: element['id_situacao'],
            viewValue: element['ds_situacao'],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this._snackBar.open(
          ['Erro ao listar as situações do sistema.'].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });

    this.firstFormGroup = this.fb.group({
      id_situacao_origem: ['', Validators.required],
      ind_fluxo_ri: ['N'],
      sg_tribunal: ['TRT3'],
      id_grupo: [''],
      sg_grau: ['G2'],
    });
    this.secondFormGroup = this.fb.group({
      id_evento: ['', Validators.required]
    });
    this.finalForm = this.fb.group({
      ind_consistente: [''],
      id_situacao_destino: [''],
      ind_efetiva: [''],
    });
  }

  verDados() {
    return Object.assign(Object.assign(this.firstFormGroup.value, this.secondFormGroup.value),this.finalForm.value);
  }

  salvarTransicaoFluxo() {
    let values = Object.assign(
      Object.assign(this.firstFormGroup.value, this.secondFormGroup.value),
      this.finalForm.value
    );
    
    if (this.finalForm.status === 'VALID') {
      let json_data = JSON.stringify(values);
      console.log(json_data);
      try {
        axios
          .post([AppSettings.API_ENDPOINT, 'v1.0/fluxo'].join('/'), json_data)
          .then((response) => {
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
}
