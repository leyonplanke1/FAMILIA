import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Articulo } from './../../../../model/articulo';
import { Proveedor } from './../../../../model/proveedor';
import { Ingreso } from './../../../../model/ingreso';
import { DetalleIngreso } from './../../../../model/detalle-ingreso';

import { IngresoService } from './../../../../service/ingreso/ingreso.service';
@Component({
  selector: 'app-edit-ingresos',
  templateUrl: './edit-ingresos.component.html',
  styleUrls: ['./edit-ingresos.component.css']
})
export class EditIngresosComponent implements OnInit {
  ingresos: Ingreso = new Ingreso();
  ingresos2: Ingreso = new Ingreso();
  detalles: Ingreso = new Ingreso();
  detallesIng: DetalleIngreso = new DetalleIngreso();
  data: DetalleIngreso[];

  data_prove: Proveedor[];
  data_arti: Articulo[];


  cboProveedor: number = 0;
  tipo_comprobante: string = "";
  serie_comprobante: string = "";
  num_comprobante: string = "";
  impuesto: number = 0;

  pidarticulo: number = 0;
  nom_articulo: string = "";
  pcantidad: number = 0;
  pprecio_compra: number = 0;
  pprecio_venta: number = 0;

  model: any = {};
  model2: any = {};
  msg: string = '';

  idingreso: number = 0;
  idarticulo: number = 0;
  articulo = "";
  cantidad: number = 0;
  precio_compra: number = 0;
  precio_venta: number = 0;

  detallesIngresos: any = [];
  cabeceraIngresos: any = [];
  subtotal: number[] = [];
  imp: number = 0;
  totaltotal: number = 0;
  total: number = 0;

  impuesto_cabecera: number = 0;
  id: number;
  idproveedor: number;
  constructor(private service: IngresoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCabecera();
    this.obtenerDetalle();
    this.comboProveedores();
    this.comboArticulos();



  }
 deleteDetalle(detall: DetalleIngreso) {

    var answer = confirm('Desea eliminar el detalle?');
    if (answer) {

      this.service.deleteDetalles(detall)
        .subscribe(res => {
          // this.data = this.data.filter(p => p !== detall);
          this.detallesIngresos.splice(detall, 1);

          alert("Detalle eliminado Correctamente");
          window.location.reload();

        })

    }

  }
 
 

  GuardarDetalle() {

    this.detallesIng.idingreso = this.idingreso;
    this.detallesIng.idarticulo = this.idarticulo;
    this.detallesIng.cantidad = this.cantidad;
    this.detallesIng.precio_compra = this.precio_compra;
    this.detallesIng.precio_venta = this.precio_venta;



    this.service.createDetalles(this.detallesIng)
      .subscribe(data => {
        alert("Se Registro los datos con Exito...!!!");
        window.location.reload();
      })

    console.log("detallesing: 2 ", this.detallesIng);


  }




  obtenerCabecera() {
    let id = localStorage.getItem("id");
    this.service.getIngresoId(+id)
      .subscribe(data => {
        this.ingresos = data;
        this.cabeceraIngresos = this.ingresos;

        console.log("ing: ",this.ingresos);

        //declaramos variables
        var id_ing = 0;
        var imp = 0;
        var cboprov = 0;
        var tip_com = "";
        var ser_com = "";
        var num_com = "";

        //hacemos el bucle para leer datos del arreglo
        for (let i = 0; i < this.cabeceraIngresos.length; i++) {

          //almaceno en una variable cada columna de la BD
          id_ing = this.cabeceraIngresos[i].id;
          imp = this.cabeceraIngresos[i].impuesto;
          cboprov = this.cabeceraIngresos[i].idproveedor;
          tip_com = this.cabeceraIngresos[i].tipo_comprobante;
          ser_com = this.cabeceraIngresos[i].serie_comprobante;
          num_com = this.cabeceraIngresos[i].num_comprobante;

          //asignamos los valores  a las variables publicas
          this.id = id_ing;
          this.idingreso = id_ing;
          this.impuesto_cabecera = imp;
          this.cboProveedor = cboprov;
          this.idproveedor = cboprov;
          this.tipo_comprobante = tip_com.toString();
          this.serie_comprobante = ser_com.toString();
          this.num_comprobante = num_com.toString();

          //setamos al modelo 
          this.ingresos2.id = id_ing;
          this.ingresos2.idproveedor = cboprov;
          this.ingresos2.tipo_comprobante = tip_com;
          this.ingresos2.serie_comprobante = ser_com;
          this.ingresos2.num_comprobante = num_com;
          this.ingresos2.impuesto = imp;


          if (this.impuesto_cabecera == 18) {
            this.impuesto = 1;
          } else {
            this.impuesto = 0;
          }
        }

      })

  }

  obtenerDetalle() {
    let id = localStorage.getItem("id");
    this.service.getIngresoDetalleId(+id)
      .subscribe(data => {
        this.detalles = data;

        this.detallesIngresos = this.detalles;

        // console.log(this.detallesIngresos);

        var c = 0;
        var pc = 0;
        var t = 0;
        var im = 0

        if (this.impuesto_cabecera == 18) {
          im = 18;

        } else {
          im = 0;
        }

        for (let i = 0; i < this.detallesIngresos.length; i++) {

          c = this.detallesIngresos[i].cantidad;
          pc = this.detallesIngresos[i].precio_compra;

          this.subtotal[i] = c * pc;
          t = t + this.subtotal[i];
          // console.log("total: ", t);
          this.total = t;
          this.imp = t * (im / 100);
          this.totaltotal = (this.total + this.imp);
        }


      })

  }

  ActualizarCabecera(ingresos2:Ingreso){
    // proveedor.iddocumento = this.tip_docu.valueOf();

    // ingresos2.idproveedor = this.idproveedor;
    // ingresos2.tipo_comprobante = this.tipo_comprobante;
    // ingresos2.serie_comprobante = this.serie_comprobante;
    // ingresos2.num_comprobante = this.num_comprobante;
    // ingresos2.impuesto = this.impuesto;
    
    console.log("ing .... ", this.ingresos2 );
    

    this.service.updateIngreso(this.ingresos2)
    .subscribe(data=>{
      this.ingresos2=data;
      // alert("Se Actualizo con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Actualizo Exitosamente!', 'success');
      this.router.navigate(["ingresos"]);
    })
  }



  myValue;
  editDetalles(i): void {

    let id = localStorage.getItem("id");
    this.service.getIngresoDetalleId(+id)
      .subscribe(data => {
        this.detalles = data;

        this.detallesIngresos = this.detalles;

        this.model2.id = this.detallesIngresos[i].id;
        this.model2.idarticulo = this.detallesIngresos[i].idarticulo;
        this.model2.articulo = this.detallesIngresos[i].articulo;
        this.model2.cantidad = this.detallesIngresos[i].cantidad;
        this.model2.precio_compra = this.detallesIngresos[i].precio_compra;
        this.model2.precio_venta = this.detallesIngresos[i].precio_venta;
        this.myValue = i;

        // console.log("detalles: ", this.detallesIngresos);
        // console.log("model 2: ", this.model2);

      })


  }

  Actualizar(detalles: DetalleIngreso) {
    this.service.updateDetalles(detalles)
      .subscribe(data => {
        this.detallesIng = data;
        alert("Se Actualizo con Exito...!!!");
        
        // this.router.navigate(["proveedores"]);
        document.getElementById("exampleModal").click();
        window.location.reload();
        this.model2 = {};
      })
  }




  comboProveedores() {
    this.service.getProveedores()
      .subscribe(ress => {
        // this.data_prove = ress;
        var d = ress;
        this.data_prove = d['data'];

        // console.log(this.data_prove);


      });
  }
  comboArticulos() {
    this.service.getArticulos()
      .subscribe(res => {
        // this.data_arti = res;

        var d = res;
        this.data_arti = d['data'];

      });
  }



}
