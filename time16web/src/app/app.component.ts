import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'time16web';
  imprime = (title) => {
    return 'Bem vindo à nossa ' + title;
  };
}
