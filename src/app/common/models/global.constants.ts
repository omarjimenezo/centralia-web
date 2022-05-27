import { Injectable } from '@angular/core';
import { IStatus } from './order.model';

@Injectable({
    providedIn: 'root',
})
export class GlobalConstants {
    private API_BASE = 'https://centralia.app/api';
    // private API_BASE = 'http://localhost:8000/api';
    private API_VERSION = '/v1';

    public ENDPOINTS = {
        AUTH: {
            LOGIN: `${this.API_BASE}/login`,
        },
        DATA: {
            GET_USER: `${this.API_BASE}${this.API_VERSION}/user`,
            GET_ORDER_STATUS_CATALOG: `${this.API_BASE}${this.API_VERSION}/data/status/catalog`,
        },
        CATALOG: {
            GET_CATALOG: `${this.API_BASE}${this.API_VERSION}/catalog/provider`,
            GET_CATEGORIES: `${this.API_BASE}${this.API_VERSION}/category/provider`,
        },
        ORDER: {
            POST_ORDER: `${this.API_BASE}${this.API_VERSION}/order`,
            GET_ORDERS: `${this.API_BASE}${this.API_VERSION}/provider/orders`,
            UPDATE_ORDER_STATUS: `${this.API_BASE}${this.API_VERSION}/provider/orders/status`,
            
        },
        DEPENDENCY: {
            GET_SUPERIOR: `${this.API_BASE}${this.API_VERSION}/dependency/superior`,
            GET_SUBORDINATES: `${this.API_BASE}${this.API_VERSION}/dependency/subordinates`,
        },
    };

    public ROUTES = {
        AUTH: {
            LOGIN: 'login',
            NOT_FOUND: '404',
        },
        PROVIDER: {
            ORDERS: 'vendedor/pedidos',
        },
        CLIENT: {
            PROVIDERS: 'cliente/proveedores',
            CATALOG: 'cliente/catalogo',
        },
    };

    public API_MESSAGES = {
        SUCCESS: 'Success',
        UNAUTHORIZED: 'Unauthorized',
    };

    public ERROR_MESSAGES = {
        WRONG_USER_PASS: 'Usuario y/o Contraseña incorrectos',
        USER_UNAUTHORIZED: 'Acceso no autorizado',
        CONNECTION_ERROR: 'Error en conexión al servidor',

        ORDER_ERROR: 'Ocurrio un error al procesar el pedido',
    };

    public SUCCESS_MESSAGES = {
        ORDER_SAVED: 'Pedido enviado',
    };

    public USER_TYPES = {
        PROVIDER: 1,
        AGENT: 2,
        USER: 3,
    };

    public ORDER_STATUS: {
        PENDING: 'Pending',
        CANCELLED: 'Cancelled'
    }
}

export enum ORDER_STATUS {
    PENDING,
    CANCELLED     
}