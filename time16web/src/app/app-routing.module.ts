import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { EventoComponent } from './evento/evento.component';
import { FluxoprincipalComponent } from './fluxoprincipal/fluxoprincipal.component';
import { D3testComponent } from './d3test/d3test.component';
import { Visual1Component } from './visual1/visual1.component';
import { Visual2Component } from './visual2/visual2.component';
import { Visual3Component } from './visual3/visual3.component';
import { ElasticComponent } from './elastic/elastic.component';
import { FluxoesperadoComponent } from './fluxoesperado/fluxoesperado.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent} ,
  { path: 'situacao', component: SituacaoComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'fluxoprincipal', component: FluxoprincipalComponent },
  { path: 'd3test', component: D3testComponent },
  { path: 'visual1', component: Visual1Component },
  { path: 'visual2', component: Visual2Component },
  { path: 'visual3', component: Visual3Component },
  { path: 'elastic', component: ElasticComponent },
  { path: 'fluxoesperado', component: FluxoesperadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

