import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@angular/localize/init';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';

import { Venta } from './../../../../model/venta';
import { VentaService } from './../../../../service/venta/venta.service';

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {
  data: Venta[];
  query: string = '';

  cboPage: number = 10;
  page = 1;
  pageSize = this.cboPage; 
  contador = [10,20,50,100];

  constructor(private service: VentaService, private router: Router) { }

  ngOnInit() {
    this.service.read(this.query)
      .subscribe(res => {
        var d = res;
        this.data = d['data'];

        console.log("res :", d );
        console.log("data::: ",this.data );
      });

      this.pageSize = this.cboPage; 
  }

  // Anular(ventas: Venta) {

  //   var answer = confirm('Desea Anular el Comprobante');

  //   if (answer) {
  //     this.service.deleteVentas(ventas)
  //       .subscribe(res => {
  //         this.data = this.data.filter(p => p !== ventas);

  //         alert("El Registro se Anuló Correctamente");

  //       })
  //   }


  // }

  Anular(ventas: Venta) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'El Comprobante se Anulará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Anular!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Anulado!',
          'El Comprobante se Anuló correctamente.',
          'success'
        )
        this.service.deleteVentas(ventas)
        .subscribe(res => {
          this.data = this.data.filter(p => p !== ventas);
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












  ver(ventas: Venta): void {
    localStorage.setItem("id", ventas.id.toString());
    this.router.navigate(["ventas/ver"]);
  }

   
  verPdf(ventas: Venta): void {
    localStorage.setItem("id", ventas.id.toString());
    this.router.navigate(["ventas/verpdf"]);
  }






















  AddVentas(){
    this.router.navigate(["ventas/add"]);
  } 
  EditVentas(){
    this.router.navigate(["ventas/edit"]);
  } 
  VerVentas(){
    this.router.navigate(["ventas/ver"]);
  } 


  VentasPDF() {
    var arti = this.data; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('#','FECHA', 'CLIENTE', 'COMPROBANTE', 'TOTAL', 'ESTADO'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera

    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) { 
      var fila = new Array();
      fila.push((i + 1).toString());
      fila.push(arti[i]['fecha'].toString());
      fila.push(arti[i]['nombre'].toString());
      fila.push(arti[i]['tipo_comprobante'].toString() + ': ' +arti[i]['serie_comprobante'].toString() +'-'+ arti[i]['num_comprobante'].toString() );
      fila.push(arti[i]['total_venta'].toString());
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
        { text: 'NUESTRAS VENTAS', fontSize: 20, alignment: 'center', bold: true  },
        
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
