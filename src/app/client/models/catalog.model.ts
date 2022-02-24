export interface ICategory {
    category_id: number;
    name: string;
}

export interface ICatalog {
    id: number;
    category: string;
    quantity?: number;
    sku: string;
    description: string;
    price: string;
    image: string;
}

export interface IOrder {
    sku: string;
    description: string;
    price: string;
    quantity: number;
}
