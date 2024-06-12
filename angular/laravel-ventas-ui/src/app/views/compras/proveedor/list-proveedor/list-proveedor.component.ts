import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';

import '@angular/localize/init';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Proveedor } from './../../../../model/proveedor';
import { ArticuloService } from './../../../../service/Articulo/articulo.service';
import { ProveedorService } from './../../../../service/Proveedor/proveedor.service';


@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css']
})
export class ListProveedorComponent implements OnInit {
  data: Proveedor[]; 
  query : string = '';
  cboPage: number = 10;
  page = 1;
  pageSize = this.cboPage; 
  contador = [10,20,50,100];
  constructor( private prov_service: ProveedorService, private router: Router) { }

  ngOnInit() {
    this.prov_service.ListarProveedores(this.query)
      .subscribe(res => { 
        var d = res;
        this.data = d['data'];
        console.log(this.data);
        
      });
      this.pageSize = this.cboPage; 
  }

  Editar(proveedor: Proveedor): void {
    localStorage.setItem("id", proveedor.id.toString());
    this.router.navigate(["proveedores/edit"]);
  }
  // Delete(proveedor: Proveedor) {
  //   this.prov_service.deleteProveedores(proveedor)
  //     .subscribe(res => {
  //       this.data = this.data.filter(p => p !== proveedor); 

  //       alert("Registro  eliminado Correctamente");
         
  //     })
  // }


  proveedoresPDF() {
    var arti = this.data; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('#','PROVEEDOR', 'TIPO DOC', 'DOCUMENTO', 'CORREO', 'TELEFONO'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera

    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) { 
      var fila = new Array();
      fila.push((i + 1).toString());
      fila.push(arti[i]['nombre'].toString());
      fila.push(arti[i]['tipo_documento'].toString());
      fila.push(arti[i]['num_documento'].toString());
      fila.push(arti[i]['email'].toString());
      fila.push(arti[i]['telefono'].toString());
      body.push(fila);

    }


    const documentDefinition = {
      pageOrientation: 'landscape', // la orientacion del doc, comentar todo si deseas en formato PorTrait

      //footer de la pagina
      footer: function(currentPage, pageCount) {
        return { text:'Página '+ currentPage.toString() + ' de ' + pageCount, alignment: 'center' };
      },
      content: [
        { text: 'PROVEEDORES', fontSize: 20, alignment: 'center', bold: true  },
        
        {
          layout: 'lightHorizontalLines', // optional ->noBorders ->headerLineOnly ->lightHorizontalLines
          
          table: {
            headerRows: 1, //Muestra la cantidad de encabezado cuando los datos sobre pasan la hoja
            widths: ['auto', '*', 'auto', '*', '*','*'], // define la cantidad de columnas con sus respectivos tamaños de columna

            body: body // asignamos un Array al cuerpo del documento PDF
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }


  Delete(proveedor: Proveedor) {
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
        this.prov_service.deleteProveedores(proveedor)
      .subscribe(res => {
        this.data = this.data.filter(p => p !== proveedor);
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
