import { Injectable } from '@angular/core';
import { Documento } from '../../model/documento'
import { Proveedor } from '../../model/proveedor'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor( private http: HttpClient) { }
  urlProveedor='http://localhost:8000/proveedores'; 
  urlProveedordash='http://localhost:8000/proveedores-dash/1'; 
  urlDocumento='http://localhost:8000/documentos';

  //metodo para extraer los articulos
  getDocumentos(){
    return this.http.get<Documento[]>(this.urlDocumento);
  } 

  // declaramos los metodos Para los Proveedores
  ListarProveedores(query=''){
    return this.http.get<Proveedor[]>(this.urlProveedor,{params: {buscar: query}});
  }
   ListarProveedoresDash(query=''){
    return this.http.get<Proveedor[]>(this.urlProveedordash,{params: {buscar: query}});
  } 
  getProveedoresId(id:number){
    return this.http.get<Proveedor>(this.urlProveedor+"/"+id);
  } 
  createProveedores(Proveedor:Proveedor){
    return this.http.post<Proveedor>(this.urlProveedor,Proveedor);
  }   
  updateProveedores(Proveedor:Proveedor){
    return this.http.put<Proveedor>(this.urlProveedor+"/"+Proveedor.id,Proveedor);
  } 
  deleteProveedores(Proveedor:Proveedor){
    return this.http.delete<Proveedor>(this.urlProveedor+"/"+Proveedor.id);
  }

   

}
