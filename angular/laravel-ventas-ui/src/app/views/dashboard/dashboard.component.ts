import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@angular/localize/init';

import Swal from 'sweetalert2/dist/sweetalert2.js';
 

import { Cliente } from './../../model/cliente';
import { Proveedor } from './../../model/proveedor';
import { ClienteService } from './../../service/cliente/cliente.service'; 
import { ProveedorService } from './../../service/Proveedor/proveedor.service'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataclientes: Cliente[]; 
  dataproveedor: Proveedor[]; 
  query : string = '';

  constructor( private cliente_service: ClienteService,private proveedor_service: ProveedorService, private router: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarProveedores();
    
 
  }

  cargarClientes(){
    this.cliente_service.ListarClientesDash(this.query)
    .subscribe(res => { 
      var d = res;
      this.dataclientes = d['data'];
      console.log(d);
      console.log(this.dataclientes);
      
    });
  }

  cargarProveedores(){
    this.proveedor_service.ListarProveedoresDash(this.query)
    .subscribe(res => { 
      var d = res;
      this.dataproveedor = d['data'];
      console.log(d);
      console.log(this.dataproveedor);
      
    });
  }














}
