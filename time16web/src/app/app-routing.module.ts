import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { SituacaoCreateComponent } from './situacao/create/situacao.create.component';
import { SituacaoUpdateComponent } from './situacao/update/situacao.update.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoCreateComponent } from './grupo/create/grupo.create.component';
import { GrupoUpdateComponent } from './grupo/update/grupo.update.component';
import { EventoCreateComponent } from './evento/create/evento.create.component';
import { EventoUpdateComponent } from './evento/update/evento.update.component';
import { EventoComponent } from './evento/evento.component';
import { FluxoprincipalComponent } from './fluxoprincipal/fluxoprincipal.component';
import { D3testComponent } from './d3test/d3test.component';
import { Visual1Component } from './visual1/visual1.component';
import { Visual2Component } from './visual2/visual2.component';
import { Visual3Component } from './visual3/visual3.component';
import { ElasticComponent } from './elastic/elastic.component';
import { FluxoesperadoComponent } from './fluxoesperado/fluxoesperado.component';
import { ProcessosituacaoComponent } from './processosituacao/processosituacao.component';
import { DetalheComponent } from './processosituacao/detalhe/detalhe.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent} ,
  { path: 'situacao', component: SituacaoComponent },
  { path: 'situacao/create', component: SituacaoCreateComponent },
  { path: 'situacao/update/:idSituacao', component: SituacaoUpdateComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'grupo/create', component: GrupoCreateComponent },
  { path: 'grupo/update/:idGrupo', component: GrupoUpdateComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'evento/create', component: EventoCreateComponent },
  { path: 'evento/update/:idEvento', component: EventoUpdateComponent },  
  { path: 'fluxoprincipal', component: FluxoprincipalComponent },
  { path: 'd3test', component: D3testComponent },
  { path: 'visual1', component: Visual1Component },
  { path: 'visual2', component: Visual2Component },
  { path: 'visual3', component: Visual3Component },
  { path: 'elastic', component: ElasticComponent },
  { path: 'fluxoesperado', component: FluxoesperadoComponent },
  { path: 'processosituacao', component: ProcessosituacaoComponent },
  { path: 'processosituacao/detalhe/:cdProcesso', component: DetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

