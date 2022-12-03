export interface ICategoryResponse {
    data: ICategory[];
}

export interface ICategory {
    id: string;
    nombre: string;
}

export interface IProductResponse {
    data: IBusinessProducts[];
}

export interface IBusinessProducts {
    precio: number;
    img: string;
    producto: IProduct;
    cantidad?: number;
}

export interface IProduct {
    id: string;
    categoria: ICategory;
    sku?: string;
    codigo?: string;
    descripcion: string;
}
