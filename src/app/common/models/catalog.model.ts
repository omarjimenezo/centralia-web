export interface ICategoryResponse {
    data: ICategory[];
}

export interface ICategory {
    category_id: number;
    name: string;
}

export interface ICatalogResponse {
    data: ICatalog[]
}

export interface ICatalog {
    id: number;
    category: string;
    quantity?: number;
    sku: string;
    description: string;
    price: string;
    image: string;
    selected?: boolean;
}
