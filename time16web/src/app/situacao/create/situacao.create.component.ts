import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'situacao-create',
  templateUrl: './situacao.create.component.html',
  styleUrls: ['./situacao.create.component.css'],
})
export class SituacaoCreateComponent implements OnInit {
  situacaoForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.situacaoForm = this.fb.group({
      ds_situacao: [''],
      sg_tribunal: [''],
      cd_situacao: [''],
      sg_grau: [''],
      ind_principal: 'S',
      ind_ri: 'S',
      fl_inicio: 'N', 
      fl_fim: 'N'
    });
  }

  salvarSituacao(values) {
    let json_data = JSON.stringify(values);
    console.log(json_data);
    axios
      .post('http://127.0.0.1:5002/api/v1.0/situacao', json_data)
      .then((response) => {
        console.log('Tribunais carregados');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  submitForm() {
    this.salvarSituacao(this.situacaoForm.value);
  }
}
