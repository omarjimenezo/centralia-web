export interface ILoginRequest {
    email: string;
    password: string;
    name: string;
}

export interface ILoginResponse {
    token: string;
    message: string;
    user_id: string;
}