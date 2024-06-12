import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@angular/localize/init';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { Utils } from 'src/app/utils/Utils';
import { DOCUMENT } from '@angular/common';

import { Cliente } from './../../../../model/cliente';
import { ClienteService } from './../../../../service/cliente/cliente.service'; 


@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  data: Cliente[]; 
  query : string = '';

  cboPage: number = 5;
  page = 1;
  pageSize = this.cboPage; 
  contador = [5,10,20,50,100];
  constructor( private cliente_service: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.cliente_service.ListarClientes(this.query)
      .subscribe(res => { 
        var d = res;
        this.data = d['data'];
        console.log(d);
        console.log(this.data);
        
      });

      this.pageSize = this.cboPage; 
  }


  
  Editar(clientes: Cliente): void {
    localStorage.setItem("id", clientes.id.toString());
    this.router.navigate(["clientes/edit"]);
  }
  // Delete(clientes: Cliente) {
  //   this.cliente_service.deleteClientes(clientes)
  //     .subscribe(res => {
  //       this.data = this.data.filter(p => p !== clientes); 

  //       alert("Registro  eliminado Correctamente");
         
  //     })
  // }


  Delete(clientes: Cliente) {
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
        this.cliente_service.deleteClientes(clientes)
      .subscribe(res => {
        this.data = this.data.filter(p => p !== clientes); 
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


  clientesPDF() {
    var arti = this.data; // asigamos los datos de la BD en la variable local
    var body = []; // creamos el array vacio
    var titulos = new Array('#','CLIENTE' , 'DNI', 'CORREO', 'TELEFONO'); // creamos y asignamos al array los valores de la cabecera de la tabla
    body.push(titulos); // insertamos la cabecera

    //recorremos el array y llenamos de datos el cuerpo de la tabla.
    for (let i = 0; i < arti.length; i++) { 
      var fila = new Array();
      fila.push((i + 1).toString());
      fila.push(arti[i]['nombre'].toString()); 
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
        { text: 'CLIENTES', fontSize: 20, alignment: 'center', bold: true  },
        
        {
          layout: 'lightHorizontalLines', // optional ->noBorders ->headerLineOnly ->lightHorizontalLines
          
          table: {
            headerRows: 1, //Muestra la cantidad de encabezado cuando los datos sobre pasan la hoja
            widths: ['auto', 'auto', '*', '*','*'], // define la cantidad de columnas con sus respectivos tamaños de columna

            body: body // asignamos un Array al cuerpo del documento PDF
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }






}
