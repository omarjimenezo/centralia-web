import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalConstants } from "../models/global.constants";
import { IProviderResponse } from "../models/provider.model";

@Injectable({
    providedIn: 'root',
})
export class ProviderService {

    constructor(
        private _http: HttpClient,
        private _global: GlobalConstants
    ) {

    }

    // Catalog
    public getProviders(): Observable<IProviderResponse> {
        return this._http
            .get<IProviderResponse>(
                `${this._global.ENDPOINTS.PROVIDER.GET_PROVIDERS}`
            );
    }
}
