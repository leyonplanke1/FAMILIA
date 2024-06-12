import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Articulo } from './../../../../model/articulo'
import { ArticuloService } from './../../../../service/Articulo/articulo.service'
import { Categoria } from './../../../../model/categoria'; 
@Component({
  selector: 'app-edit-articulo',
  templateUrl: './edit-articulo.component.html',
  styleUrls: ['./edit-articulo.component.css']
})
export class EditArticuloComponent implements OnInit {
  data_cate: Categoria[];
  articulo :Articulo=new Articulo();
  constructor(private route: ActivatedRoute,private service: ArticuloService, private router:Router){
    // this.data=[]; 
  }
  ngOnInit() {
    this.Editar();
    this.categoraCombo();
  }

  Editar(){
    let id=localStorage.getItem("id");
    this.service.getArticuloId(+id)
    .subscribe(data=>{
      this.articulo=data;
    })

  }

  categoraCombo(){
    this.service.getCategoria()
    .subscribe(res => {
      this.data_cate = res;

      // console.log( res);
    });
  }

  Actualizar(articulo:Articulo){
    this.service.updateArticulo(articulo)
    .subscribe(data=>{
      this.articulo=data;
      // alert("Se Actualizo con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Actualizo Exitosamente!', 'success');
      this.router.navigate(["articulos"]);
    })
  }
}
