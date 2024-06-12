import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Categoria } from './../../../../model/categoria'
import { CategoriaService } from './../../../../service/Categoria/categoria.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  
  categoria :Categoria=new Categoria();
  constructor(private route: ActivatedRoute,private service: CategoriaService, private router:Router){
    // this.data=[]; 
  }


  ngOnInit() {
    this.Editar();
  }

  Editar(){
    let id=localStorage.getItem("id");
    this.service.getCategoriaId(+id)
    .subscribe(data=>{
      this.categoria=data;
    })

  }

  Actualizar(categoria:Categoria){
    this.service.updateCategoria(categoria)
    .subscribe(data=>{
      this.categoria=data;
      // alert("Se Actualizo con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Actualizo Exitosamente!', 'success');
      this.router.navigate(["categorias"]);
    })
  }

}
