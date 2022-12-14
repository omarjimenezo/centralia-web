import { IProduct } from "./product.model";

export interface IOrderResponse {
    data: IOrder[]
}

export interface IOrderStatusCatalogResponse {
    data: IOrderStatusCatalog[]
}

export interface IOrder {
    id?: string;
    proveedor_id: string;
    estatus?: IStatus;
    productos: IOrderProduct[];
    total: number;
}

export interface IOrderProduct {
    producto: IProduct;
    cantidad: number;
    precio: number;
}

export interface IStatus {
    id: number;
    nombre?: string;
}

export interface IOrderStatusRequest {
    orden_id: string;
    estatus: number;
}

export interface IOrderStatusCatalog {
    id: number;
    description: string;
    color: string;
}

