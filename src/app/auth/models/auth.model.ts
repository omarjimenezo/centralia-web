export interface ILoginRequest {
    email: string;
    password: string;
    name: string;
}

export interface ILoginResponse {
    token: string;
    message: string;
    user_id: string;
    code?: number;
}

export interface IDependencyResponse {
    data: IDependency[]
}

export interface IDependency {
    sup_user_id: string;
    sub_user_id: string;
}

export interface IDialogData {
    returnURL: string;
  }