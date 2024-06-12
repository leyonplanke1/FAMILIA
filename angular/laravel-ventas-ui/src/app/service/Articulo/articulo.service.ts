import { Injectable } from '@angular/core';
import { Articulo } from './../../model/articulo'
import { Categoria } from './../../model/categoria'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticuloService {

  constructor( private http: HttpClient) { }

  url='http://localhost:8000/articulos';
  urlcat='http://localhost:8000/categorias';

  
  // declaramos los metodos
  read(query=''){
    return this.http.get<Articulo[]>(this.url,{params: {buscar: query}});
  } 
  getCategoria(){
    return this.http.get<Categoria[]>(this.urlcat);
  } 
  getArticuloId(id:number){
    return this.http.get<Articulo>(this.url+"/"+id);
  } 

  createArticulo(articulo:Articulo){
    return this.http.post<Articulo>(this.url,articulo);
  } 
  
  updateArticulo(articulo:Articulo){
    return this.http.put<Articulo>(this.url+"/"+articulo.id,articulo);
  }
 
  deleteArticulo(articulo:Articulo){
    return this.http.delete<Articulo>(this.url+"/"+articulo.id);
  }

}
