import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';

import { Router } from '@angular/router';
import '@angular/localize/init';




import { Articulo } from './../../../../model/articulo';
import { ArticuloService } from './../../../../service/Articulo/articulo.service';
import { CategoriaService } from './../../../../service/Categoria/categoria.service';
import { Categoria } from './../../../../model/categoria';

@Component({
  selector: 'app-list-articulo',
  templateUrl: './list-articulo.component.html',
  styleUrls: ['./list-articulo.component.css']
})
export class ListArticuloComponent implements OnInit {

  data: Articulo[];
  data_cate: Categoria[];
  query: string = ''; 
  
  cboPage: number = 10;
  page = 1;
  pageSize = this.cboPage; 
  contador = [10,20,50,100];
  

  constructor(private service: ArticuloService, private artiservice: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriaCombo();

    this.service.read(this.query)
      .subscribe(res => {

        var d = res;
        this.data = d['data'];       
         
      });
      this.pageSize = this.cboPage; 
 


  }
 

  ArticulosPDF() {
    var arti = this.data; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('#','CÓDIGO', 'ARTÍCULO', 'CATEGORÍA', 'STOCK', 'ESTADO'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera

    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) { 
      var fila = new Array();
      fila.push((i + 1).toString());
      fila.push(arti[i]['codigo'].toString());
      fila.push(arti[i]['nombre'].toString());
      fila.push(arti[i]['categoria_nom'].toString());
      fila.push(arti[i]['stock'].toString());
      fila.push(arti[i]['estado'].toString());
      body.push(fila);

    }


    const documentDefinition = {
      pageOrientation: 'landscape', // la orientacion del doc, comentar todo si deseas en formato PorTrait

      //footer de la pagina
      footer: function(currentPage, pageCount) {
        return { text:'Página '+ currentPage.toString() + ' de ' + pageCount, alignment: 'center' };
      },
      content: [
        { text: 'NUESTROS ARTÍCULOS', fontSize: 20, alignment: 'center', bold: true  },
        
        {
          layout: 'lightHorizontalLines', // optional ->noBorders ->headerLineOnly ->lightHorizontalLines
          
          table: {
            headerRows: 1, //Muestra la cantidad de encabezado cuando los datos sobre pasan la hoja
            widths: ['auto', '*', '*', '*', '*','*'], // define la cantidad de columnas con sus respectivos tamaños de columna

            body: body // asignamos un Array al cuerpo del documento PDF
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }











  categoriaCombo() {
    this.artiservice.read()
      .subscribe(res => {
        this.data_cate = res;

        // console.log( res);
      });
  }

  Editar(articulo: Articulo): void {
    localStorage.setItem("id", articulo.id.toString());
    this.router.navigate(["articulos/edit"]);
  }
  // Delete(articulo: Articulo) {
  //   this.service.deleteArticulo(articulo)
  //     .subscribe(res => {
  //       this.data = this.data.filter(p => p !== articulo);

  //       alert("Registro  eliminado Correctamente");

  //     })
  // }

  Delete(articulo: Articulo) {
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
        this.service.deleteArticulo(articulo)
      .subscribe(res => {
        this.data = this.data.filter(p => p !== articulo);

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






}
