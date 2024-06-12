import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';
import '@angular/localize/init';

import { Ingreso } from './../../../../model/ingreso';
import { IngresoService } from './../../../../service/ingreso/ingreso.service';

@Component({
  selector: 'app-list-ingresos',
  templateUrl: './list-ingresos.component.html',
  styleUrls: ['./list-ingresos.component.css']
})
export class ListIngresosComponent implements OnInit {
  data: Ingreso[];
  query: string = '';

  ingresos: Ingreso = new Ingreso();
  detalles: Ingreso = new Ingreso();
  detallesIngresos: any = [];
  cabeceraIngresos: any = [];  
  impuesto_cabecera: number = 0; 

  cboPage: number = 10;
  page = 1;
  pageSize = this.cboPage; 
  contador = [10,20,50,100];

  constructor(private service: IngresoService, private router: Router) { }

  ngOnInit() {
    this.service.read(this.query)
      .subscribe(res => {
        var d = res;
        this.data = d['data'];

        // console.log("res :", res );
        // console.log("data::: ",this.data );
      });
      this.pageSize = this.cboPage; 
      
  }

  // Anular(ingreso: Ingreso) {

  //   var answer = confirm('Desea Anular el Comprobante');

  //   if (answer) {
  //     this.service.deleteIngreso(ingreso)
  //       .subscribe(res => {
  //         this.data = this.data.filter(p => p !== ingreso);

  //         alert("El Registro se Anuló Correctamente");

  //       })
  //   }


  // }

  Anular(ingreso: Ingreso) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'El Comprobante se Anulará completamente ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Anular!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Eliminado!',
          'El Comprobante se Anuló correctamente.',
          'success'
        )
        this.service.deleteIngreso(ingreso)
        .subscribe(res => {
          this.data = this.data.filter(p => p !== ingreso); 

        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El Comprobante no se ha Anulado',
          'error'
        )
      }
    })



  }

















  ver(ingresos: Ingreso): void {
    localStorage.setItem("id", ingresos.id.toString());
    this.router.navigate(["ingresos/ver"]);
  }

  editar(ingresos: Ingreso): void {
    localStorage.setItem("id", ingresos.id.toString());
    this.router.navigate(["ingresos/edit"]);
  }


  
  IngresosPDF() {
    var arti = this.data; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('#','FECHA', 'PROVEEDOR', 'COMPROBANTE', 'TOTAL', 'ESTADO'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera

    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) { 
      var fila = new Array();
      fila.push((i + 1).toString());
      fila.push(arti[i]['fecha'].toString());
      fila.push(arti[i]['nombre'].toString());
      fila.push(arti[i]['tipo_comprobante'].toString() + ': ' +arti[i]['serie_comprobante'].toString() +'-'+ arti[i]['num_comprobante'].toString() );
      fila.push(arti[i]['total'].toString());
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
        { text: 'NUESTROS INGRESOS', fontSize: 20, alignment: 'center', bold: true  },
        
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

  


}
