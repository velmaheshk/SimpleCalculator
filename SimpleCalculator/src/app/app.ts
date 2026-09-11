import { Component, signal } from '@angular/core';
import { RouterOutlet ,} from '@angular/router';
import { Calculator } from './calculator/calculator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Calculator],
  template:  `
<router-outlet></router-outlet>
 <app-calculator></app-calculator>
 `
}) 

 export class App {}
