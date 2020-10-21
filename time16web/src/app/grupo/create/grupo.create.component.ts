import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-create',
  templateUrl: './grupo.create.component.html',
  styleUrls: ['./grupo.create.component.css']
})
export class GrupoCreateComponent implements OnInit {
  grupoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.grupoForm = this.fb.group({
      ds_grupo: [''],
      sg_tribunal: 'TRT3',
      cd_grupo: [''],
      sg_grau: 'G2'      
    });
  }

  salvarGrupo(values) {
    let json_data = JSON.stringify(values);
    console.log(json_data);
    try {
      axios
        .post([AppSettings.API_ENDPOINT, 'v1.0/grupo'].join('/'), json_data)
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
    this.salvarGrupo(this.grupoForm.value);
  }
}
