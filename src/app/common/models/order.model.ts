export interface IOrderResponse {
    data: IOrder[]
}

export interface IOrderStatusCatalogResponse {
    data: IOrderStatusCatalog[]
}

export interface IOrder {
    id?: string;
    date?: Date;
    status?: number;
    // total: number;
    // client_name?: string;
    // client_id?: number;
    // client_address?: string;
    // provider_id: string;
    // order_list: IOrderList[]
    provider_id: string;
    user_id?: string;
    description: IOrderList[];
    amount: number;
}

export interface IOrderList {
    // id: number;
    // sku: string;
    // description: string;
    // price?: string;
    // quantity: number;
    product: IProduct;
    quantity: number;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
}

export interface IStatus {
    id: number;
    label: string;
    color: string;
}

export interface IOrderStatusRequest {
    order_id: string;
    status: number;
}

export interface IOrderStatusCatalog {
    id: number;
    description: string;
    color: string;
}

