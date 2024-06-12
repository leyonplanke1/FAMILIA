import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componente para el dashboard
import { DashboardComponent } from './views/dashboard/dashboard.component';
// componente Categoria
import { ListarComponent } from './views/almacen/categoria/listar/listar.component'; //listar
import { AddComponent } from './views/almacen/categoria/add/add.component'; //Agregar
import { EditComponent } from './views/almacen/categoria/edit/edit.component'; //editar

// componente Categoria
import { ListArticuloComponent } from './views/almacen/articulo/list-articulo/list-articulo.component'; //listar
import { AddArticuloComponent } from './views/almacen/articulo/add-articulo/add-articulo.component'; //Agregar
import { EditArticuloComponent } from './views/almacen/articulo/edit-articulo/edit-articulo.component'; //editar

// componente Proveedor
import { ListProveedorComponent } from './views/compras/proveedor/list-proveedor/list-proveedor.component'; //listar
import { AddProveedorComponent } from './views/compras/proveedor/add-proveedor/add-proveedor.component'; //Agregar
import { EditProveedorComponent } from './views/compras/proveedor/edit-proveedor/edit-proveedor.component'; //editar

// componente Ingresos
import { ListIngresosComponent } from './views/compras/ingresos/list-ingresos/list-ingresos.component'; //listar
import { AddIngresosComponent } from './views/compras/ingresos/add-ingresos/add-ingresos.component'; //Agregar
import { EditIngresosComponent } from './views/compras/ingresos/edit-ingresos/edit-ingresos.component'; //editar
import { VerIngresosComponent } from './views/compras/ingresos/ver-ingresos/ver-ingresos.component'; //ver 

// componente Clientes
import { ListClientesComponent } from './views/ventas/cliente/list-clientes/list-clientes.component'; //listar
import { AddClientesComponent } from './views/ventas/cliente/add-clientes/add-clientes.component'; //Agregar
import { EditClientesComponent } from './views/ventas/cliente/edit-clientes/edit-clientes.component'; //editar

// componente ventas
import { ListarVentasComponent } from './views/ventas/ventas/listar-ventas/listar-ventas.component'; //listar
import { CreateVentasComponent } from './views/ventas/ventas/create-ventas/create-ventas.component'; //Agregar
import { EditarVentasComponent } from './views/ventas/ventas/editar-ventas/editar-ventas.component'; //editar
import { DetallesVentasComponent } from './views/ventas/ventas/detalles-ventas/detalles-ventas.component'; //ver 
import { PdfVentasComponent } from './views/ventas/ventas/pdf-ventas/pdf-ventas.component';



const routes: Routes = [
  { path:'dashboard', component:DashboardComponent },
  // ruta para categorias
  { path:'categorias', component:ListarComponent },
  { path:'categorias/add', component:AddComponent },
  { path:'categorias/edit', component:EditComponent },
  // ruta para articulos
  { path:'articulos', component:ListArticuloComponent },
  { path:'articulos/add', component:AddArticuloComponent },
  { path:'articulos/edit', component:EditArticuloComponent },
  // ruta para Proveedor
  { path:'proveedores', component:ListProveedorComponent },
  { path:'proveedores/add', component:AddProveedorComponent },
  { path:'proveedores/edit', component:EditProveedorComponent },
  // ruta para Ingresos
  { path:'ingresos', component:ListIngresosComponent },
  { path:'ingresos/add', component:AddIngresosComponent },
  { path:'ingresos/edit', component:EditIngresosComponent },
  { path:'ingresos/ver', component:VerIngresosComponent },
  // ruta para Proveedor
  { path:'clientes', component:ListClientesComponent },
  { path:'clientes/add', component:AddClientesComponent },
  { path:'clientes/edit', component:EditClientesComponent },
    // ruta para ventas 
    { path:'ventas', component:ListarVentasComponent },
    { path:'ventas/add', component:CreateVentasComponent },
    { path:'ventas/edit', component:EditarVentasComponent },
    { path:'ventas/ver', component:DetallesVentasComponent },
    { path:'ventas/pdfreporte', component:PdfVentasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
