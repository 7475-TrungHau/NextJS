import http from "@/lib/http";
import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from "@/SchemaValidations/auth.schema";

const authApi = {
    login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),
    auth: (body: { sessionToken: string }) => http.post('api/auth', body, {
        baseUrl: ''
    }),

}

export default authApi;