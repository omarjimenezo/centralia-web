export interface IOrder {
    sku: string;
    description: string;
    price: string;
    quantity: number;
}

export interface IOrderList {
    id: number;
    date: string;
    status: number;
    total: number;
    client_name?: string;
    client_id?: number;
    client_address?: string;
}
