import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent} ,
  { path: 'situacao', component: SituacaoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
