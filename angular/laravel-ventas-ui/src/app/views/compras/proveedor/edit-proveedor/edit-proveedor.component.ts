import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Documento } from './../../../../model/documento'; 
import { Proveedor } from './../../../../model/proveedor';
import { ProveedorService } from './../../../../service/Proveedor/proveedor.service';
 


@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent implements OnInit { 
  proveedor :Proveedor=new Proveedor();
  documentos: Documento[];
  // tip_docu : number = 0;
  constructor(private service: ProveedorService, private router:Router){
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
    this.service.getProveedoresId(+id)
    .subscribe(data=>{
      this.proveedor=data;
    })

  }
 

  Actualizar(proveedor:Proveedor){
    // proveedor.iddocumento = this.tip_docu.valueOf();
    this.service.updateProveedores(proveedor)
    .subscribe(data=>{
      this.proveedor=data;
      // alert("Se Actualizo con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Actualizo Exitosamente!', 'success');
      this.router.navigate(["proveedores"]);
    })
  }
}
