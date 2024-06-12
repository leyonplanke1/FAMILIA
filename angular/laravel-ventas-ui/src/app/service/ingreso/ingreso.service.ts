import { Injectable } from '@angular/core';
import { Articulo } from './../../model/articulo'
import { Proveedor } from './../../model/proveedor'
import { Ingreso } from './../../model/ingreso'
import { DetalleIngreso } from './../../model/detalle-ingreso'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor( private http: HttpClient) { }

  url='http://localhost:8000/ingresos';
  urldetallesing='http://localhost:8000/ingresos/add-detalles';
  urlcat='http://localhost:8000/articulos';
  urlprov='http://localhost:8000/proveedores';

  urldetalles='http://localhost:8000/ingresos/detalles';

  

  
  // declaramos los metodos
  read(query=''){
    return this.http.get<Ingreso[]>(this.url,{params: {buscar: query}});
  } 
  getArticulos(){
    return this.http.get<Articulo[]>(this.urlcat);
  } 
  getProveedores(){
    return this.http.get<Proveedor[]>(this.urlprov);
  } 
  getIngresoId(id:number){
    return this.http.get<Ingreso>(this.url+"/"+id);
  }
  getIngresoDetalleId(id:number){
    return this.http.get<Ingreso>(this.urldetalles+"/"+id);
  }
  createIngreso(ingreso:Ingreso ){     
    return  this.http.post<Ingreso>(this.url,ingreso);     
  }  
  updateIngreso(ingreso:Ingreso){
    return this.http.put<Ingreso>(this.url+"/"+ingreso.id,ingreso);
  } 
  deleteIngreso(ingreso:Ingreso){
    return this.http.delete<Ingreso>(this.url+"/"+ingreso.id);
  }

  //de la vista editar ingresos
  createDetalles(detalles:DetalleIngreso ){     
    return  this.http.post<DetalleIngreso>(this.urldetallesing,detalles);     
  } 
  updateDetalles(detalles:DetalleIngreso){
    return this.http.put<DetalleIngreso>(this.urldetallesing+"/"+detalles.id,detalles);
  } 
  deleteDetalles(detalles:DetalleIngreso){
    return this.http.delete<DetalleIngreso>(this.urldetallesing+"/"+detalles.id);
  }
}
