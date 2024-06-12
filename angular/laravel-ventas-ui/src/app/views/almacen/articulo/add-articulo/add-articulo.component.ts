import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Articulo } from './../../../../model/articulo';
import { ArticuloService } from './../../../../service/Articulo/articulo.service';

import { Categoria } from './../../../../model/categoria';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.css']
})
export class AddArticuloComponent implements OnInit {

  articulo: Articulo = new Articulo();
  data_cate: Categoria[];

  image: any;
  cboCategoria: number = 0;
  lastpk: number;

  constructor(private service: ArticuloService, private router: Router) { }

  ngOnInit() {
    this.categoraCombo();

  }



  Guardar() {

    this.articulo.idcategoria = this.cboCategoria;

    this.service.createArticulo(this.articulo)
      .subscribe(data => {
        // alert("Se Agrego con Exito...!!!");
        Swal.fire('En buena hora!', 'Se Registro Exitosamente!', 'success');
        this.router.navigate(["articulos"]);
      })
  }

  categoraCombo() {
    this.service.getCategoria()
      .subscribe(res => {
        this.data_cate = res;

        // console.log( res);
      });
  }

  SubirImagen(event: any): void {


    let file;
    file = event.target.files[0];

    console.log(event);

    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
      
      this.articulo.imagen = file.name;
      console.log(file);

    }




    //fin
  }





}
