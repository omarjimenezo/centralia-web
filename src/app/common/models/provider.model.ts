export interface IProviderResponse {
    data: IProvider[];
}

export interface IProvider {
    _id: number,
    categoria_id: string,
    usuarioId: number,
    nombre: string,
    direccion: string,
    telefono?: number,
    calificacion: number,
    logo: string,
}
