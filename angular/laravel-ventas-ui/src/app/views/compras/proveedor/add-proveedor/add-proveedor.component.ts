import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Documento } from './../../../../model/documento'; 
import { Proveedor } from './../../../../model/proveedor';
import { ProveedorService } from './../../../../service/Proveedor/proveedor.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent implements OnInit {

  proveedor:Proveedor=new Proveedor(); 
  documentos: Documento[];
  tip_docu : number = 0;

  constructor(private service: ProveedorService, private router:Router) { }

  
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
  
    this.proveedor.iddocumento = this.tip_docu.valueOf();

    this.service.createProveedores(this.proveedor)
    .subscribe(data=>{
      // alert("Se Agrego con Exito...!!!");
      Swal.fire('En buena hora!', 'Se Registro Exitosamente!', 'success');
      this.router.navigate(["proveedores"]);
    })
  }

}
