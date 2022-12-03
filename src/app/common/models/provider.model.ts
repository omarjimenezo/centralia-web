import { ICategory } from "./product.model";

export interface IProviderResponse {
    data: IProvider[];
}

export interface IProvider {
    id: string,
    categoria: ICategory,
    usuarioId: number,
    nombre: string,
    direccion: string,
    telefono?: number,
    calificacion: number,
    logo: string,
}
