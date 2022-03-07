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
    vendor_id: number;
    order_list: IOrderList[]
}
