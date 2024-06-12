import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake'; 
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdfmake-basic-demo',
  templateUrl: './pdfmake-basic-demo.component.html',
  styleUrls: ['./pdfmake-basic-demo.component.css']
})
export class PdfmakeBasicDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
