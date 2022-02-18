export interface Category {
    category_id: number;
    name: string;
}

export interface Catalog {
    id: number;
    category: string;
    sku: string;
    description: string;
    price: number;
    image: string;
}
