import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documento } from './../../../../model/documento'; 
import { Cliente } from './../../../../model/cliente';
import { ClienteService } from './../../../../service/cliente/cliente.service';
 
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.css']
})
export class EditClientesComponent implements OnInit {
  clientes :Cliente=new Cliente();
  documentos: Documento[];
  // tip_docu : number = 0;
  constructor(private service: ClienteService, private router:Router){
    // this.data=[]; 
  }

  ngOnInit(): void {
    this.Editar();
    this.Combo_Documentos();
  }

  
  Combo_Documentos(){
    this.service.getDocumentos()
    .subscribe(res => {
      this.documentos = res;

      // console.log( res);
    });
  }
  Editar(){
    let id=localStorage.getItem("id");
    this.service.getClientesId(+id)
    .subscribe(data=>{
      this.clientes=data;
    })

  }
 

  Actualizar(clientes:Cliente){
    // proveedor.iddocumento = this.tip_docu.valueOf();
    this.service.updateClientes(clientes)
    .subscribe(data=>{
      this.clientes=data;
      // alert("Se Actualizo con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Actualizo Exitosamente!', 'success');
      this.router.navigate(["clientes"]);
    })
  }

}
