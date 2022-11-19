import { ICategory } from "./catalog.model";

export interface IProviderResponse {
    data: IProvider[];
}

export interface IProvider {
    id: number,
    categoria: ICategory,
    usuarioId: number,
    nombre: string,
    direccion: string,
    telefono?: number,
    calificacion: number,
    logo: string,
}
