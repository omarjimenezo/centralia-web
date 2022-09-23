export interface IUserResponse {
    data: IUser;
}

export interface IUser {
    id: string;
    provider_id: number;
    vendor_id: number;
    user_type: number;
    email: string;
    name: string;
    middlename: string;
    lastname: string;
    phone: number;
    mobile: number;
    img_profile: string;
    business: IBusiness;
}

export interface IGuestUser {
    provider_id: string;
    vendor_id: string;
    user_type: number;
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
