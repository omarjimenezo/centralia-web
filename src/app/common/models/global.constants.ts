import { Injectable } from '@angular/core';
import { IStatus } from './order.model';

@Injectable({
    providedIn: 'root',
})
export class GlobalConstants {
    // private API_BASE = 'https://centralia.app/api';
    private API_BASE = 'http://localhost:8000/api';
    private API_VERSION = '/v1';
    // private API_VERSION = '';

    public ENDPOINTS = {
        // AUTH: {
        //     LOGIN: `${this.API_BASE}/auth`,
        // },
        AUTH: {
            LOGIN: `${this.API_BASE}${this.API_VERSION}/auth`,
        },
        PROVIDER: {
            GET_PROVIDERS: `${this.API_BASE}${this.API_VERSION}/negocios`,
        },
        DATA: {
            GET_USER: `${this.API_BASE}${this.API_VERSION}/user`,
            GET_ORDER_STATUS_CATALOG: `${this.API_BASE}${this.API_VERSION}/data/status/catalog`,
        },
        PRODUCT: {
            GET_PRODUCTS:  `${this.API_BASE}${this.API_VERSION}/productos/negocio`,
        },
        CATALOG: {
            GET_CATALOG: `${this.API_BASE}${this.API_VERSION}/catalog/provider`,
            GET_CATEGORIES: `${this.API_BASE}${this.API_VERSION}/category/provider`,
        },
        ORDER: {
            POST_ORDER: `${this.API_BASE}${this.API_VERSION}/order`,
            GET_PROVIDER_ORDERS: `${this.API_BASE}${this.API_VERSION}/provider/orders`,
            UPDATE_ORDER_STATUS: `${this.API_BASE}${this.API_VERSION}/provider/orders/status`,
            GET_BUSINESS_ORDERS: `${this.API_BASE}${this.API_VERSION}/business/orders`,

        },
        DEPENDENCY: {
            GET_SUPERIOR: `${this.API_BASE}${this.API_VERSION}/dependency/superior`,
            GET_SUBORDINATES: `${this.API_BASE}${this.API_VERSION}/dependency/subordinates`,
        },
    };

    public ROUTES = {
        LANDINGPAGE: 'invitado/info/general',
        AUTH: {
            LOGIN: 'login',
            NOT_FOUND: '404',
        },
        PROVIDER: {
            ORDERS: 'proveedor/pedidos',
        },
        BUSINESS: {
            PROVIDERS: 'negocio/proveedores',
            PRODUCTS: 'negocio/productos',
            ORDERS: 'negocio/pedidos',
        },
        COMMON: {
            PROVIDERS: 'invitado/proveedores',
            PRODUCTS: 'invitado/productos',
            INFOPROVIDERS: 'invitado/info/proveedores',
            INFOBUSINESS: 'invitado/info/negocios',
        },
    };

    public MENU_ITEMS = {
        BUSINESS: [
            { label: 'Hacer Pedido', route: 'negocio/proveedores' },
            { label: 'Mis Pedidos', route: 'negocio/pedidos' },
        ],
        GUEST: [
            { label: 'Haz tu Pedido', route: 'invitado/proveedores' },
            { label: '¿Que es Centralia?', route: 'invitado/info/general' },
        ]
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

    public ROL = {
        GUEST: 0, // User not logged in, but he can see providers and catalog pages
        PROVIDER: 1,
        BUSINESS: 2,
        AGENT: 3,
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
