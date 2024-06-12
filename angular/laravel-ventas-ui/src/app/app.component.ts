import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laravel-ventas-ui';

  constructor(private router:Router){}

  ListarCategoria(){
    this.router.navigate(["categorias"]);
  } 
  DashboardAdmin(){
    this.router.navigate(["dashboard"]);
  } 

}
