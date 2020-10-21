import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-update',
  templateUrl: './grupo.update.component.html',
  styleUrls: ['./grupo.update.component.css']
})
export class GrupoUpdateComponent implements OnInit {
  grupoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let id_grupo: any = this.route.snapshot.paramMap.get('idGrupo');
    this.grupoForm = new FormGroup({
      id_grupo: new FormControl(),
      cd_grupo: new FormControl(),
      ds_grupo: new FormControl(),
      sg_tribunal: new FormControl(),
      sg_grau: new FormControl()
   });
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/grupo', id_grupo].join('/'))
      .then((response) => {
        for (let obj of response.data) {
          this.grupoForm = this.fb.group({
            id_grupo: id_grupo,
            cd_grupo: obj.cd_grupo,
            ds_grupo: obj.ds_grupo,
            sg_tribunal: obj.sg_tribunal,
            sg_grau: obj.sg_grau
          });
        }
      })
      .catch((error) => {
        this._snackBar.open(
          [
            'Erro no processamento, não foi possível localizar a situação',
            id_grupo,
          ].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });
  }

  salvarGrupo(values) {
    let id_grupo: any = this.route.snapshot.paramMap.get('idGrupo');
    let json_data = JSON.stringify(values);
    console.log(json_data);
    try {
      axios
        .put([AppSettings.API_ENDPOINT, 'v1.0/grupo', id_grupo].join('/'), json_data)
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
