import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';

import { Venta } from './../../../../model/venta';
import { VentaService } from './../../../../service/venta/venta.service';


@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrls: ['./detalles-ventas.component.css']
})
export class DetallesVentasComponent implements OnInit {
  ventas: Venta = new Venta();
  detalles: Venta = new Venta();

  detallesIngresos: any = [];
  cabeceraIngresos: any = [];
  subtotal: number[] = [];
  imp: number = 0;
  totaltotal: number = 0;
  total: number = 0;

  logoDataUrl: string;

  impuesto_cabecera: number = 0;
  constructor(private service: VentaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCabecera();
    this.obtenerDetalle();

    Utils.getImageDataUrlFromLocalPath1('assets/imagenes/logoempresa.png').then(
      result => this.logoDataUrl = result
    )
  }

  obtenerCabecera() {
    let id = localStorage.getItem("id");
    this.service.getVentasId(+id)
      .subscribe(data => {
        this.ventas = data;
        this.cabeceraIngresos = this.ventas;

        console.log(this.ventas);
        var imp = 0;

        for (let i = 0; i < this.cabeceraIngresos.length; i++){
          imp = this.cabeceraIngresos[i].impuesto;
          this.impuesto_cabecera = imp;
          console.log("impuesto cabecera: ",this.cabeceraIngresos);
        }
        
      })

  }

  obtenerDetalle() {
    let id = localStorage.getItem("id");
    this.service.getVentasDetalleId(+id)
      .subscribe(data => {
        this.detalles = data;

        this.detallesIngresos = this.detalles;

        console.log("detallessss",this.detalles);

        var c = 0;
        var pc = 0;
        var t = 0;
        var des = 0;
        var im = 0

        if (this.impuesto_cabecera == 18) {
          im = 18;

        } else {
          im = 0;
        }

        for (let i = 0; i < this.detallesIngresos.length; i++) {

          c = this.detallesIngresos[i].cantidad;
          pc = this.detallesIngresos[i].precio;
          des = this.detallesIngresos[i].descuento;

          this.subtotal[i] = (c * pc) - des;
          t = t + this.subtotal[i];
          // console.log("total: ", t);
          this.total = t;
          this.imp = t * (im / 100);
          this.totaltotal = (this.total + this.imp);
        }




      })

  }



  detallesPDF() {

    let id = localStorage.getItem("id");
    // this.service.getIngresoId(+id)
    //   .subscribe(data => {
    //     this.ingresos = data;
    //     this.cabeceraIngresos = this.ingresos;

    //     // console.log(this.ingresos);

    //   })


      this.service.getVentasId(+id)
      .subscribe(data => {
        this.ventas = data;
        this.cabeceraIngresos = this.ventas;

        console.log(this.ventas); 
        
      })




    var arti = this.detallesIngresos; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('ARTICULO', 'CANT', 'VENTA', 'DESC', 'SUBTOTAL'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera
    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) {
      var fila = new Array();
      fila.push(arti[i]['articulo'].toString());
      fila.push(arti[i]['cantidad'].toString());
      fila.push('S/. ' + arti[i]['precio'].toString());
      fila.push('S/. ' + arti[i]['descuento'].toString());
      fila.push('S/. ' + ((arti[i]['cantidad'] * arti[i]['precio'])-arti[i]['descuento']).toString());
      body.push(fila);

    }
    var t = this.total;
    var t1 = this.imp;
    var t2 = this.totaltotal;

    var footer = new Array('', '', '', 'SUBTOTAL: \n IMPUESTO: \n TOTAL:', 'S/. ' + t.toString() + '\n' + 'S/. ' + t1.toString() + '\n' + 'S/. ' + t2.toString())
    body.push(footer); // insertamos el footer

    var documentDefinition = {
      content: [

        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              image: this.logoDataUrl
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              
              // layout: 'lightHorizontalLines', // optional ->noBorders ->headerLineOnly ->lightHorizontalLines
              table: {
                headerRows: 1, //Muestra la cantidad de encabezado cuando los datos sobre pasan la hoja
                widths: ['*'], // define la cantidad de columnas con sus respectivos tamaños de columna

                body: [
                  
                  [{ text: 'COMPROBANTE', bold: true, alignment: 'center' }],
                  [{ text: 'R.U.C: 20043698510', bold: true, alignment: 'center' }],
                  [{ text: this.ventas[0]['tipo_comprobante'], bold: true, alignment: 'center' }],
                  [{ text: this.ventas[0]['serie_comprobante'] + '-' + this.ventas[0]['num_comprobante'], bold: true, alignment: 'center' }]
                ]
              }
            },

          ],
          // optional space between columns
          columnGap: 10,
        },

        {
          columns: [
            {
              width: '*',
              text: 'Cliente: ' + this.ventas[0]['nombre']+'\n'+ 'DNI.'+this.ventas[0]['num_documento'], fontSize: 14, alignment: 'left', bold: true
            },
            {
              width: '*',
              text: ' Fecha: ' + this.ventas[0]['fecha'] , fontSize: 14, alignment: 'right', bold: true

            }

          ],

        },

        '\n',

        {






          layout: 'lightHorizontalLines', // optional ->noBorders ->headerLineOnly ->lightHorizontalLines
          table: {
            headerRows: 1, //Muestra la cantidad de encabezado cuando los datos sobre pasan la hoja
            widths: ['*', 'auto', '*', '*', 'auto'], // define la cantidad de columnas con sus respectivos tamaños de columna

            body: body // asignamos un Array al cuerpo del documento PDF
          }

        },

        // { text: 'PROVEEDOR: ' + this.ventas[0]['nombre'] + '                                     FECHA: ' + this.ingresos[0]['fecha'], fontSize: 14, alignment: 'left', bold: true },


      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }


   


}
