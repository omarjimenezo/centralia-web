export interface ICategoryResponse {
    data: ICategory[];
}

export interface ICategory {
    id: number;
    nombre: string;
}

export interface ICatalogResponse {
    data: ICatalog[]
}

export interface ICatalog {
    id: number;
    categoria: ICategory;
    cantidad?: number;
    sku: string;
    descripcion: string;
    precio: number;
    img: string;
}
