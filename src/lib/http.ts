
import { LoginBodyType, LoginResType } from "@/SchemaValidations/auth.schema";
import evnConfig from "../config";

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined
}

class HttpError extends Error {
    status: number;
    payload: any;

    constructor(status: number, payload: any) {
        super('Http Error');
        this.status = status;
        this.payload = payload;
    }

}

class SessionToken {
    private token = '';
    private listeners: ((token: string) => void)[] = [];

    get value() {
        return this.token;
    }

    set value(token: string) {
        if (typeof window === 'undefined') {
            throw new Error('SessionToken can only be set in the browser');
        }
        this.token = token;
        this.emitChange(token);
    }

    on(listener: (token: string) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private emitChange(token: string) {
        this.listeners.forEach(listener => listener(token));
    }
}

export const clientSessionToken = new SessionToken();


const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions): Promise<{ status: number, payload: Response }> => {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${clientSessionToken.value ? clientSessionToken.value : ''}`,

    }

    const baseUrl = options?.baseUrl === undefined ? evnConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    const response = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        },
        body,
        method,
    });
    const payload: Response = await response.json();
    const data = {
        status: response.status,
        payload,
    }
    if (!response.ok) {
        throw new HttpError(response.status, payload);
    }

    if (['/auth/login', '/auth/register'].includes(url)) {
        clientSessionToken.value = (payload as LoginResType).data.token;
    }
    if (['/auth/logout'].includes(url)) {
        clientSessionToken.value = '';
    }

    return data;
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, { ...options });
    },
}

export default http;

