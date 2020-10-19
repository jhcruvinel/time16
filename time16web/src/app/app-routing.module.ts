import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { EventoComponent } from './evento/evento.component';
import { FluxoprincipalComponent } from './fluxoprincipal/fluxoprincipal.component';
import { D3testComponent } from './d3test/d3test.component';
import { Visual1Component } from './visual1/visual1.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent} ,
  { path: 'situacao', component: SituacaoComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'fluxoprincipal', component: FluxoprincipalComponent },
  { path: 'd3test', component: D3testComponent },
  { path: 'visual1', component: Visual1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

