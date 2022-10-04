export interface IProviderResponse {
    data: IProvider[];
}

export interface IProvider {
    id: number,
    tipo?: string,
    usuarioId?: number,
    nombre?: string,
    calle?: string,
    numero?: number,
    interior?: string,
    local?: string,
    colonia?: string,
    codigoPostal?: string,
    telefono?: number,
    calificacion?: number,
    logo?: string,
}