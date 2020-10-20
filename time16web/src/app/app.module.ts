import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessosComponent } from './processos/processos.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { HomeComponent } from './home/home.component';
import { EventoComponent } from './evento/evento.component';
import { FluxoprincipalComponent } from './fluxoprincipal/fluxoprincipal.component';
import { D3testComponent } from './d3test/d3test.component';
import { Visual1Component } from './visual1/visual1.component';
import { ElasticComponent } from './elastic/elastic.component';
import { FluxoesperadoComponent } from './fluxoesperado/fluxoesperado.component';
import { Visual2Component } from './visual2/visual2.component';
import { Visual3Component } from './visual3/visual3.component';
import { TribunalComponent } from './tribunal/tribunal.component';
import { GrauComponent } from './grau/grau.component';
import { GrupoComponent } from './grupo/grupo.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessosComponent,
    SituacaoComponent,
    HomeComponent,
    EventoComponent,
    FluxoprincipalComponent,
    D3testComponent,
    Visual1Component,
    ElasticComponent,
    FluxoesperadoComponent,
    Visual2Component,
    Visual3Component,
    TribunalComponent,
    GrauComponent,
    GrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
