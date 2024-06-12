import { Injectable } from '@angular/core';
import { Documento } from '../../model/documento'
import { Cliente } from '../../model/cliente'
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  urlClientes = 'http://localhost:8000/clientes';
  urlClientesdash = 'http://localhost:8000/clientes-dash/1';
  urlDocumento = 'http://localhost:8000/documentos';

  //metodo para extraer los documentos
  getDocumentos() {
    return this.http.get<Documento[]>(this.urlDocumento);
  }

  // declaramos los metodos Para los Proveedores
  ListarClientes(query = '') {
    return this.http.get<Cliente[]>(this.urlClientes, { params: { buscar: query } });
  }
  ListarClientesDash(query = '') {
    return this.http.get<Cliente[]>(this.urlClientesdash, { params: { buscar: query } });
  }
  getClientesId(id: number) {
    return this.http.get<Cliente>(this.urlClientes + "/" + id);
  }
  createClientes(clientes: Cliente) {
    return this.http.post<Cliente>(this.urlClientes, clientes);
  }
  updateClientes(clientes: Cliente) {
    return this.http.put<Cliente>(this.urlClientes + "/" + clientes.id, clientes);
  }
  deleteClientes(clientes: Cliente) {
    return this.http.delete<Cliente>(this.urlClientes + "/" + clientes.id);
  }

}
