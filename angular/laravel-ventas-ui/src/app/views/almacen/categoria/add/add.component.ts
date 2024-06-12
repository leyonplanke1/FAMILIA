import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Categoria } from './../../../../model/categoria';
import { CategoriaService } from './../../../../service/Categoria/categoria.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  categoria:Categoria=new Categoria();
  constructor(private service: CategoriaService, private router:Router){
    
  }

  ngOnInit(): void {
  }

  Guardar(){

    this.categoria.condicion=1;
    this.service.createCategoria(this.categoria)
    .subscribe(data=>{
      // alert("Se Agrego con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Registro Exitosamente!', 'success');
      this.router.navigate(["categorias"]);
    })
  }

}
