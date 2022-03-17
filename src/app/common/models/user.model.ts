export interface IUser {
    id: number;
    name: string;
    type: number;
    address: string;
    img: string;
}

export interface IClient {
    id?: number,
    name?: string,
    vendorId: number,
}
