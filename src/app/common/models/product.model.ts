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
}

export interface IProduct {
    id: string;
    categoria: ICategory;
    cantidad?: number;
    sku: string;
    descripcion: string;
}
