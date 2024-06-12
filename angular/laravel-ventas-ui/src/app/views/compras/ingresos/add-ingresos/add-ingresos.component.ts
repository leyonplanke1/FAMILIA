import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { FormGroup, FormControl } from '@angular/forms';

import { Articulo } from './../../../../model/articulo';
import { Proveedor } from './../../../../model/proveedor';
import { Ingreso } from './../../../../model/ingreso';
import { DetalleIngreso } from './../../../../model/detalle-ingreso';

import { IngresoService } from './../../../../service/ingreso/ingreso.service';



@Component({
  selector: 'app-add-ingresos',
  templateUrl: './add-ingresos.component.html',
  styleUrls: ['./add-ingresos.component.css']
})
export class AddIngresosComponent implements OnInit {


  ingresos: Ingreso = new Ingreso();
  detalle_ingresos: DetalleIngreso = new DetalleIngreso();

  data_prove: Proveedor[];
  data_arti: Articulo[];

  cboProveedor: number = 0;
  tipo_comprobante: string = "";
  serie_comprobante: string = "";
  num_comprobante: string = "";
  impuesto: number;

  pidarticulo: number = 0;
  nom_articulo: string = "";
  pcantidad: number = 0;
  pprecio_compra: number = 0;
  pprecio_venta: number = 0;


  Didarticulo: number[] = [];
  Dcantidad: number[] = [];
  Dprecio_compra: number[] = [];
  Dprecio_venta: number[] = [];

  total: number = 0;
  msg: string = '';
  model: any = {};
  model2: any = {};
  detidarticulo: number = 0;
  subtotal: number[] = [];
  imp: number = 0;
  totaltotal: number = 0;

  detallesIngresos: any = []; 

  // mostrarocultar:string = '';


  constructor(private ingresoservice: IngresoService, private router: Router) { }

  ngOnInit() {
    this.comboProveedores();
    this.comboArticulos();
    // $("#Guardar").hide();

    console.log(this.detallesIngresos);


  }

  CambiarImpuesto() {
    if (this.tipo_comprobante == "Factura") {
      this.impuesto = 1;
    } else {
      this.impuesto = 0;
    }

    this.calcularTotal();


  }

  Guardar() {

    this.ingresos.idproveedor = this.cboProveedor;
    this.ingresos.tipo_comprobante = this.tipo_comprobante;
    this.ingresos.serie_comprobante = this.serie_comprobante;
    this.ingresos.num_comprobante = this.num_comprobante;

    if (this.impuesto == 1) {
      this.ingresos.impuesto = 18;
    } else {
      this.ingresos.impuesto = 0;
    }



    this.ingresos.detalles = this.detallesIngresos;

    this.ingresoservice.createIngreso(this.ingresos)
      .subscribe(data => {
        // alert("Se Registro los datos con Exito...!!!");
        Swal.fire('En buena hora!', 'Se Registro Exitosamente!', 'success');
        this.router.navigate(["ingresos"]);

        console.log(data);

      })

    console.log(this.ingresos.detalles);

  }

  ObtenerTextoArticulo(e){
    let index = e.target.selectedIndex;
    let texto = e.target.options[index].text;
    console.log(texto);

    this.nom_articulo = texto;
}

  addDetalle(): void {
    
    if (this.pidarticulo != 0 && this.pcantidad != 0 && this.pprecio_compra != 0 && this.pprecio_venta != 0) {


      this.model.det_idarticulo = this.pidarticulo;
      this.model.det_articulo = this.nom_articulo;
      this.model.det_cantidad = this.pcantidad;
      this.model.det_precio_compra = this.pprecio_compra;
      this.model.det_precio_venta = this.pprecio_venta;

      this.detallesIngresos.push(this.model);

      this.calcularTotal();
      this.msg = 'campo agregado';

      this.limpiarDetalle();

      this.model = {};
    } else {

      alert("Alerta: Al ingresar el detalle de ingreso, revise los datos del articulo.");

    }
    console.log(this.detallesIngresos);

  }

  deleteDetalle(i): void {
    var answer = confirm('Desea eliminar el detalle?');
    if (answer) {
      this.detallesIngresos.splice(i, 1);
      this.msg = 'campo eliminado';
    }

    this.calcularTotal();
  }

  myValue;
  editDetalles(i): void { 
    this.model2.det_idarticulo = this.detallesIngresos[i].det_idarticulo;
    this.model2.det_articulo = this.detallesIngresos[i].det_articulo;
    this.model2.det_cantidad = this.detallesIngresos[i].det_cantidad;
    this.model2.det_precio_compra = this.detallesIngresos[i].det_precio_compra;
    this.model2.det_precio_venta = this.detallesIngresos[i].det_precio_venta;
    this.myValue = i;
  }

  updateDetalles(): void {
    let i = this.myValue;
    for (let j = 0; j < this.detallesIngresos.length; j++) {
      if (i == j) {
        /* Para obtener el texto */
        var combo = document.getElementById("det_idarticulo");
        // var selected = combo.options[combo.selectedIndex].text;
        this.model2.det_articulo = this.nom_articulo;

        this.detallesIngresos[i] = this.model2;
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
    var t = 0;
    var im = 0

    if (this.impuesto == 1) {
      im = 18;

    } else {
      im = 0;
    }

    for (let i = 0; i < this.detallesIngresos.length; i++) {

      c = this.detallesIngresos[i].det_cantidad;
      pc = this.detallesIngresos[i].det_precio_compra;

      this.subtotal[i] = c * pc;
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
    this.pprecio_compra = 0;
    this.pprecio_venta = 0;

  }


  comboArticulos() {
    this.ingresoservice.getArticulos()
      .subscribe(res => {
        // this.data_arti = res;

        var d = res;
        this.data_arti = d['data'];

      });
  }


  comboProveedores() {
    this.ingresoservice.getProveedores()
      .subscribe(ress => {
        // this.data_prove = ress;
        var d = ress;
        this.data_prove = d['data'];

      });
  }
}
