import { DetalleIngreso } from './detalle-ingreso';

export class Ingreso {

    id:number;
    idproveedor:number;
    tipo_comprobante:string;
    serie_comprobante:string;
    num_comprobante:string;
    fecha:Date;
    impuesto:number;
    estado:string;

    detalles: DetalleIngreso[];

    constructor(){
        //vacio
    }
}
