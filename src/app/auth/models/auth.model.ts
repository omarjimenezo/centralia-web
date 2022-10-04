import { IUser } from "src/app/common/models/user.model";

export interface ILoginRequest {
    email: string;
    password: string;
    name: string;
}

export interface ILoginResponse {
    message: string;
    code: number;
    data: ILoginResponseData;
}

export interface ILoginResponseData {
    token: string;
    user: IUser;
}
export interface IDependencyResponse {
    data: IDependency[]
}

export interface IDependency {
    sup_user_id: number;
    sub_user_id: number;
}

export interface IDialogData {
    returnURL: string;
  }