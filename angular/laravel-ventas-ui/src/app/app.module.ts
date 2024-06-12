import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgSelect2Module } from 'ng-select2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './views/almacen/categoria/listar/listar.component';
import { AddComponent } from './views/almacen/categoria/add/add.component';
import { EditComponent } from './views/almacen/categoria/edit/edit.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListArticuloComponent } from './views/almacen/articulo/list-articulo/list-articulo.component';
import { AddArticuloComponent } from './views/almacen/articulo/add-articulo/add-articulo.component';
import { EditArticuloComponent } from './views/almacen/articulo/edit-articulo/edit-articulo.component';
import { EditProveedorComponent } from './views/compras/proveedor/edit-proveedor/edit-proveedor.component';
import { ListProveedorComponent } from './views/compras/proveedor/list-proveedor/list-proveedor.component';
import { AddProveedorComponent } from './views/compras/proveedor/add-proveedor/add-proveedor.component';
import { AddIngresosComponent } from './views/compras/ingresos/add-ingresos/add-ingresos.component';
import { ListIngresosComponent } from './views/compras/ingresos/list-ingresos/list-ingresos.component';
import { VerIngresosComponent } from './views/compras/ingresos/ver-ingresos/ver-ingresos.component';
import { EditIngresosComponent } from './views/compras/ingresos/edit-ingresos/edit-ingresos.component';
import { ListClientesComponent } from './views/ventas/cliente/list-clientes/list-clientes.component';
import { AddClientesComponent } from './views/ventas/cliente/add-clientes/add-clientes.component';
import { EditClientesComponent } from './views/ventas/cliente/edit-clientes/edit-clientes.component';
import { CreateVentasComponent } from './views/ventas/ventas/create-ventas/create-ventas.component';
import { DetallesVentasComponent } from './views/ventas/ventas/detalles-ventas/detalles-ventas.component';
import { EditarVentasComponent } from './views/ventas/ventas/editar-ventas/editar-ventas.component';
import { ListarVentasComponent } from './views/ventas/ventas/listar-ventas/listar-ventas.component';
import { PdfVentasComponent } from './views/ventas/ventas/pdf-ventas/pdf-ventas.component';

//importamos los servicios
import { CategoriaService } from "./service/Categoria/categoria.service";
import { ArticuloService } from "./service/Articulo/articulo.service";
import { ClienteService } from "./service/cliente/cliente.service";
import { ProveedorService } from "./service/Proveedor/proveedor.service";
import { VentaService } from "./service/venta/venta.service";
import { IngresoService } from "./service/ingreso/ingreso.service";

// importamos form module
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    ListarComponent, 
    AddComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ListArticuloComponent,
    AddArticuloComponent,
    EditArticuloComponent,
    EditProveedorComponent,
    ListProveedorComponent,
    AddProveedorComponent,
    AddIngresosComponent,
    ListIngresosComponent,
    VerIngresosComponent,
    EditIngresosComponent,
    ListClientesComponent,
    AddClientesComponent,
    EditClientesComponent,
    CreateVentasComponent,
    DetallesVentasComponent,
    EditarVentasComponent,
    ListarVentasComponent,
    PdfVentasComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module, 
    NgbModule
  ],
  providers: [
    CategoriaService,
    ArticuloService,
    ClienteService,
    VentaService,
    ProveedorService,
    IngresoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
