import { Component } from '@angular/core'; 
import '@angular/localize/init';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'pdfpruebas';
  name = 'Angular';
  page = 1;
  pageSize =10;
  items = [];
  constructor() {
   for(let i = 1; i <= 100; i++){
      this.items.push({Name: 'Shop ' + i});
   }
  }
}
