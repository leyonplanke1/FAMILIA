import { DetalleVenta } from './detalle-venta';

export class Venta {

    
    id:number;
    idcliente:number;
    tipo_comprobante:string;
    serie_comprobante:string;
    num_comprobante:string;
    fecha:Date;
    impuesto:number;
    total_venta:number;
    estado:string;

    detalles: DetalleVenta[];

    constructor(){
        //vacio
    }
}
