import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@angular/localize/init';

import { Categoria } from './../../../../model/categoria';
import { CategoriaService } from './../../../../service/Categoria/categoria.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  data: Categoria[];
   

  cboPage: number = 10;
  page = 1;
  pageSize = this.cboPage; 
  contador = [10,20,50,100];

  constructor(private service: CategoriaService, private router: Router) {
    // this.data=[]; 
  }

  ngOnInit() {
    this.service.read()
      .subscribe(res => {
        this.data = res;

        // console.log( res);
      });

      this.pageSize = this.cboPage; 
  }
  Delete(categoria: Categoria) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'el registro se eliminará completamente ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Eliminado!',
          'El registro se eliminó correctamente.',
          'success'
        )
        this.service.deleteCategoria(categoria)
          .subscribe(res => {
            this.data = this.data.filter(p => p !== categoria);
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El registro no se ha eliminado',
          'error'
        )
      }
    })



  }

  Editar(categoria: Categoria): void {
    localStorage.setItem("id", categoria.id.toString());
    this.router.navigate(["categorias/edit"]);
  }

  // Delete(categoria: Categoria) {
  //   this.service.deleteCategoria(categoria)
  //     .subscribe(res => {
  //       this.data = this.data.filter(p => p !== categoria);
  //       alert("Registro  eliminado Correctamente");         
  //     })
  // }


  AddCategoria() {
    this.router.navigate(["categorias/add"]);
  }
}
