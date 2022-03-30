export interface IOrderList {
    id: number;
    sku: string;
    description: string;
    price?: string;
    quantity: number;
}

export interface IOrder{
    id: number;
    date?: Date;
    status: number;
    total: number;
    client_name?: string;
    client_id?: number;
    client_address?: string;
    provider_id: string;
    order_list: IOrderList[]
}

export interface IStatus {
    id: number;
    label: string;
    color: string;
}