import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './../../model/categoria'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriaService {
  //creamos objeto data del tipo Categoria(clase)
  // data: Categoria[];
  constructor( private http: HttpClient) { }

  url='http://localhost:8000/categorias';

  // declaramos los metodos
  read(){
    return this.http.get<Categoria[]>(this.url);
    // return this.http.get(this.url);
  } 
  getCategoriaId(id:number){
    return this.http.get<Categoria>(this.url+"/"+id);
  } 

  createCategoria(categoria:Categoria){
    return this.http.post<Categoria>(this.url,categoria);
  } 
  
  updateCategoria(categoria:Categoria){
    return this.http.put<Categoria>(this.url+"/"+categoria.id,categoria);
  }
 
  deleteCategoria(categoria:Categoria){
    return this.http.delete<Categoria>(this.url+"/"+categoria.id);
  }


}
