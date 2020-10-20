import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';
@Component({
  selector: 'situacao-create',
  templateUrl: './situacao.create.component.html',
  styleUrls: ['./situacao.create.component.css'],
})
export class SituacaoCreateComponent implements OnInit {
  situacaoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.situacaoForm = this.fb.group({
      ds_situacao: [''],
      sg_tribunal: 'TRT3',
      cd_situacao: [''],
      sg_grau: 'G2',
      ind_principal: 'S',
      ind_ri: 'S',
      fl_inicio: 'N',
      fl_fim: 'N',
    });
  }

  salvarSituacao(values) {
    let json_data = JSON.stringify(values);
    console.log(json_data);
    try {
      axios
        .post([AppSettings.API_ENDPOINT, 'v1.0/situacao'].join('/'), json_data)
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
  }

  submitForm() {
    this.salvarSituacao(this.situacaoForm.value);
  }
}
