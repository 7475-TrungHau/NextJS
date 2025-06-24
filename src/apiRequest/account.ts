import http from "@/lib/http";
import { AccountResType } from "@/SchemaValidations/acount.schema";

const accountApi = {
    me: (sessionToken: string) => http.get<AccountResType>('/account/me', {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    }),
    meClient: () => http.get<AccountResType>('/account/me'),
}

export default accountApi;
