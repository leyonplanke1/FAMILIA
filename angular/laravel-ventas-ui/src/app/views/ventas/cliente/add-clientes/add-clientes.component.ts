import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documento } from './../../../../model/documento'; 
import { Cliente } from './../../../../model/cliente';
import { ClienteService } from './../../../../service/cliente/cliente.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
 
@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.css']
})
export class AddClientesComponent implements OnInit {

 
  clientes:Cliente=new Cliente(); 
  documentos: Documento[];
  tip_docu : number = 0;

  constructor(private service: ClienteService, private router:Router) { }


  ngOnInit() {
    this.Combo_Documentos();
  }

  Combo_Documentos(){
    this.service.getDocumentos()
    .subscribe(res => {
      this.documentos = res;

      // console.log( res);
    });
  }
  Guardar(){
  
    this.clientes.iddocumento = this.tip_docu.valueOf();

    this.service.createClientes(this.clientes)
    .subscribe(data=>{
      // alert("Se Agrego con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Registro Exitosamente!', 'success');
      this.router.navigate(["clientes"]);
    })
  }

}
