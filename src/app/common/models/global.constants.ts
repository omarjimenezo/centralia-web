import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalConstants {
    private API_BASE = 'https://centralia.app/api';
    private API_VERSION = '/v1';

    public ENDPOINTS = {
        AUTH: {
            LOGIN: `${this.API_BASE}/login`,
            GET_USER: `${this.API_BASE}${this.API_VERSION}/user`,
        },
        CATALOG: {
            GET_CATALOG: `${this.API_BASE}${this.API_VERSION}/catalog/provider`,
            GET_CATEGORIES: `${this.API_BASE}${this.API_VERSION}/categories/provider`,
        },
        ORDER: {}
    }

    public API_MESSAGES = {
        SUCCESS: 'Success',
        UNAUTHORIZED: 'Unauthorized'
    }
    
    public ERROR_MESSAGES = {
        WRONG_USER_PASS: 'Usuario y/o Contraseña incorrectos',
        CONNECTION_ERROR: 'Error en conexión al servidor'
    }

    public USER_TYPES = {
        PROVIDER: 'provider',
        USER: 'USER'
    }
 }