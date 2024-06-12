import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import { jsPDF } from "jspdf"; 

import { Venta } from './../../../../model/venta';
import { VentaService } from './../../../../service/venta/venta.service';

@Component({
  selector: 'app-pdf-ventas',
  templateUrl: './pdf-ventas.component.html',
  styleUrls: ['./pdf-ventas.component.css']
})
export class PdfVentasComponent implements OnInit {
  // data: Venta[];
  query: string = '';
   
  constructor(private service: VentaService, private router: Router) { }

  ngOnInit() {
    // this.service.read(this.query)
    //   .subscribe(res => {
    //     var d = res;
    //     this.data = d['data'];

    //     console.log("res :", d );
    //     console.log("data::: ",this.data );
    //   });
  }

 

  verPdf(ventas: Venta): void {
    localStorage.setItem("id", ventas.id.toString());
    this.router.navigate(["ventas/verpdf"]);
  }
}
