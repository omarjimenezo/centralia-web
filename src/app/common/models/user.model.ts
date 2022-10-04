export interface IUserResponse {
    data: IUser;
}

export interface IUser {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono: number;
    avatar: string;
    rol: number;
    agente_id?: number;
    proveedor_id?: number;
}

export interface IGuestUser {
    proveedor_id: string;
    agente_id: string;
    rol: number;
}

export interface IBusiness {
    business_rfc: string;
    business_name: string;
    business_brief: string;
    address_street: string;
    address_number: string;
    address_suburb: string;
    address_zip: string;
    address_reference: string;
    address_city: string;
    address_state: string;
    address_country: string;
    img_logo: string;
}
