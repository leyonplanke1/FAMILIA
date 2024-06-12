import { Injectable } from '@angular/core';
import { Articulo } from './../../model/articulo'
import { Cliente } from './../../model/cliente'
import { Venta } from './../../model/venta'
import { DetalleVenta } from './../../model/detalle-venta'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor( private http: HttpClient) { }

  url='http://localhost:8000/ventas';
  urlarti='http://localhost:8000/ventas-articulos'; 
  urlArticulo='http://localhost:8000/articulos';
  urlCliente='http://localhost:8000/clientes';

  urldetalles='http://localhost:8000/ventas/detalles';

    // declaramos los metodos
  read(query=''){
    return this.http.get<Venta[]>(this.url,{params: {buscar: query}});
  } 
  getArticulos(){
    return this.http.get<Articulo[]>(this.urlArticulo);
  } 
  getClientes(){
    return this.http.get<Cliente[]>(this.urlCliente);
  } 
  getVentasId(id:number){
    return this.http.get<Venta>(this.url+"/"+id);
  } 
  getArticulosId(id:number){
    return this.http.get<Venta>(this.urlarti+"/"+id);
  }
  getVentasDetalleId(id:number){
    return this.http.get<Venta>(this.urldetalles+"/"+id);
  }
  createVentas(ingreso:Venta ){     
    return  this.http.post<Venta>(this.url,ingreso);     
  }  
  
  deleteVentas(ingreso:Venta){
    return this.http.delete<Venta>(this.url+"/"+ingreso.id);
  }

 
}
