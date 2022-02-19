export interface ICategory {
    category_id: number;
    name: string;
}

export interface ICatalog {
    id: number;
    category: string;
    sku: string;
    description: string;
    price: string;
    image: string;
}

export interface IOrder {
    id: number;
    sku: string;
    description: string;
    price: string;
}
