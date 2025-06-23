
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

const request = async <Response>(method: 'GET'|'POST'|'PUT'|'DELETE', url: string, options?: CustomOptions): Promise<{status: number, payload: Response}>=> {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
        'Content-type': 'application/json',
    }

    const baseUrl = options?.baseUrl === undefined ? evnConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    const response = await fetch (fullUrl, {
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
    return data;
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined){
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined){
        return request<Response>('POST', url, {...options, body});
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined){
        return request<Response>('PUT', url, {...options, body});
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined){
        return request<Response>('DELETE', url, {...options});
    },  
}

export default http;

    