import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../app-settings';
@Component({
  selector: 'app-update',
  templateUrl: './situacao.update.component.html',
  styleUrls: ['./situacao.update.component.css'],
})
export class SituacaoUpdateComponent implements OnInit {
  situacaoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.situacaoForm = this.fb.group({
      id_situacao: [''],
      ds_situacao: ['', Validators.required],
      sg_tribunal: ['TRT3'],
      cd_situacao: ['', Validators.required],
      sg_grau: ['G2'],
      ind_principal: ['S'],
      ind_ri: ['S'],
      fl_inicio: ['N'],
      fl_fim: ['N'],
    });

    let id_situacao: any = this.route.snapshot.paramMap.get('idSituacao');
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/situacao', id_situacao].join('/'))
      .then((response) => {
        for (let obj of response.data) {
          this.situacaoForm.setValue({
            id_situacao: obj.id_situacao,
            ds_situacao: obj.ds_situacao,
            sg_tribunal: obj.sg_tribunal,
            cd_situacao: obj.cd_situacao,
            sg_grau: obj.sg_grau,
            ind_principal: obj.ind_principal,
            ind_ri: obj.ind_ri,
            fl_inicio: obj.fl_inicio,
            fl_fim: obj.fl_fim
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this._snackBar.open(
          [
            'Erro no processamento, não foi possível localizar a situação',
            id_situacao,
          ].join(' - '),
          'Fechar',
          AppSettings.CONF_SNACK
        );
      });
  }

  salvarSituacao(values) {
    let json_data = JSON.stringify(values);
    console.log(json_data);
    try {
      axios
        .put([AppSettings.API_ENDPOINT, 'v1.0/situacao'].join('/'), json_data)
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
  }

  submitForm() {
    this.salvarSituacao(this.situacaoForm.value);
  }
}
