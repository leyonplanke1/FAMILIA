import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { FormGroup, FormControl } from '@angular/forms';

import { Articulo } from './../../../../model/articulo';
import { Cliente } from './../../../../model/cliente';
import { Venta } from './../../../../model/venta';
import { DetalleVenta } from './../../../../model/detalle-venta';

import { VentaService } from './../../../../service/venta/venta.service';


@Component({
  selector: 'app-create-ventas',
  templateUrl: './create-ventas.component.html',
  styleUrls: ['./create-ventas.component.css']
})
export class CreateVentasComponent implements OnInit {

  ventas: Venta = new Venta();
  detalle_ventas: DetalleVenta = new DetalleVenta();

  data_prove: Cliente[];
  data_arti: Articulo[];

  cboCliente: number = 0;
  tipo_comprobante: string = "";
  serie_comprobante: string = "";
  num_comprobante: string = "";
  impuesto: number;

  pidarticulo: number = 0;
  nom_articulo: string = "";
  pcantidad: number = 0;
  pstock: number = 0;
  pprecio_venta: number = 0;
  pdescuento: number = 0;
 

  total: number = 0;
  msg: string = '';
  model: any = {};
  model2: any = {};
  detidarticulo: number = 0;
  subtotal: number[] = [];
  imp: number = 0;
  totaltotal: number = 0;

  detallesVentas: any = []; 
  is_edit: boolean;
  constructor(private ventaservice: VentaService, private router: Router) { }

  ngOnInit() {
    this.comboProveedores();
    this.comboArticulos();
 
    this.is_edit = true;
 
  }


  Guardar() {

    this.ventas.idcliente = this.cboCliente;
    this.ventas.tipo_comprobante = this.tipo_comprobante;
    this.ventas.serie_comprobante = this.serie_comprobante;
    this.ventas.num_comprobante = this.num_comprobante;
    this.ventas.total_venta = this.totaltotal

    if (this.impuesto == 1) {
      this.ventas.impuesto = 18;
    } else {
      this.ventas.impuesto = 0;
    }



    this.ventas.detalles = this.detallesVentas;

    this.ventaservice.createVentas(this.ventas)
      .subscribe(data => {
        // alert("Se Registro los datos con Exito...!!!");
        Swal.fire('En buena hora!', 'La Venta Se Registró Exitosamente!', 'success');
        this.router.navigate(["ventas"]);

        console.log(data);

      })

    console.log(this.ventas.detalles);

  }




  addDetalle(): void {
    
    if (this.pidarticulo != 0 && this.pcantidad != 0 && this.pstock != 0 && this.pprecio_venta != 0 ) {


      this.model.det_idarticulo = this.pidarticulo;
      this.model.det_articulo = this.nom_articulo;
      this.model.det_cantidad = this.pcantidad;
      this.model.det_stock = this.pstock;
      this.model.det_descuento = this.pdescuento;
      this.model.det_precio_venta = this.pprecio_venta;

      this.detallesVentas.push(this.model);

      this.calcularTotal();
      this.msg = 'campo agregado';

      this.limpiarDetalle();

      this.model = {};
    } else {

      alert("Error: Al ingresar el detalle de Venta, revise los campos.");

    }
    console.log(this.detallesVentas);

  }
  deleteDetalle(i): void {
    var answer = confirm('Desea eliminar el Detalle?');
    if (answer) {
      this.detallesVentas.splice(i, 1);
      this.msg = 'campo eliminado';
    }

    this.calcularTotal();
  }
  myValue;
  editDetalles(i): void { 
    this.model2.det_idarticulo = this.detallesVentas[i].det_idarticulo;
    this.model2.det_articulo = this.detallesVentas[i].det_articulo;
    this.model2.det_cantidad = this.detallesVentas[i].det_cantidad;
    this.model2.det_stock = this.detallesVentas[i].det_stock;
    this.model2.det_descuento = this.detallesVentas[i].det_descuento;
    this.model2.det_precio_venta = this.detallesVentas[i].det_precio_venta;
    this.myValue = i;
  }
  updateDetalles(): void {
    let i = this.myValue;
    for (let j = 0; j < this.detallesVentas.length; j++) {
      if (i == j) {
        this.model2.det_articulo = this.nom_articulo;

        this.detallesVentas[i] = this.model2;
        this.msg = 'campo actualizado';
        this.model2 = {};
      }
    }
    this.calcularTotal(); 
    // quitamos el modal 
    document.getElementById("exampleModal").click();
  }
  calcularTotal() {
    var c = 0;
    var pc = 0;
    var des = 0;
    var t = 0;
    var im = 0

    if (this.impuesto == 1) {
      im = 18;

    } else {
      im = 0;
    }

    for (let i = 0; i < this.detallesVentas.length; i++) {

      c = this.detallesVentas[i].det_cantidad;
      pc = this.detallesVentas[i].det_precio_venta;
      des = this.detallesVentas[i].det_descuento;

      this.subtotal[i] = (c * pc) - des;
      t = t + this.subtotal[i];
      // console.log("total: ", t);
      this.total = t;
      this.imp = t * (im / 100);
      this.totaltotal = (this.total + this.imp);
    }
  }
  limpiarDetalle() {
    this.pidarticulo = 0;
    this.pcantidad = 0;
    this.pstock = 0;
    this.pdescuento = 0;
    this.pprecio_venta = 0;

  }
  ObtenerTextoArticulo(e){
    let index = e.target.selectedIndex;
    let texto = e.target.options[index].text;
    this.nom_articulo = texto;

    //asiganmos el id del articulo seleccionado a la variable "id"
    let id = this.pidarticulo;
    
    // invocamos a la funcion para traer los datos 
    this.ventaservice.getArticulosId(+id)
    .subscribe(data => {
      let d = data;

      //asignamos los valores correspondientes al modelo para mostrar en nuestero formulario
      this.pstock = d[0]['stock'];
      this.pprecio_venta = d[0]['precio_promedio'];
       
    })
}
  ObtenerTextoArticulo2(e){
    let index = e.target.selectedIndex;
    let texto = e.target.options[index].text;
    this.nom_articulo = texto;

    //asiganmos el id del articulo seleccionado a la variable "id"
    let id = this.model2.det_idarticulo;    
    // invocamos a la funcion para traer los datos 
    this.ventaservice.getArticulosId(+id)
    .subscribe(data => {
      let d = data;
      //asignamos los valores correspondientes al modelo para mostrar en nuestero formulario      
      this.model2.det_precio_venta = d[0]['precio_promedio'];;
 
       
    })
}
  CambiarImpuesto() {
    if (this.tipo_comprobante == "Factura") {
      this.impuesto = 1;
      this.is_edit = false;
    } else {
      this.impuesto = 0;
      this.is_edit = true;
    }
    
    this.calcularTotal();


  }
  comboArticulos() {
    this.ventaservice.getArticulos()
      .subscribe(res => {
        // this.data_arti = res;

        var d = res;
        this.data_arti = d['data'];

      });
  }
  comboProveedores() {
    this.ventaservice.getClientes()
      .subscribe(ress => {
        // this.data_prove = ress;
        var d = ress;
        this.data_prove = d['data'];

      });
  }

}
