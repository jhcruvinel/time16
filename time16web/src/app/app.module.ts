import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { SituacaoCreateComponent } from './situacao/create/situacao.create.component';
import { SituacaoUpdateComponent } from './situacao/update/update.component';
import { SituacaoDeleteComponent } from './situacao/delete/delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

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
    GrupoComponent,
    SituacaoCreateComponent,
    SituacaoUpdateComponent,
    SituacaoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
