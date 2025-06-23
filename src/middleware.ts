import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ['/me'];
const publicRoutes = ['/login', '/register'];

export default function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get('sessionToken')?.value;
    const {pathname, origin} = req.nextUrl;

    if (privateRoutes.some( router => pathname.startsWith(router))){
        if (!sessionToken){
            const loginUrl = req.nextUrl.clone();
            loginUrl.pathname = '/login';
            return NextResponse.redirect(loginUrl);
        }
    }

    if (publicRoutes.some( router => pathname.startsWith(router))){
        if (sessionToken){
            const meUrl = req.nextUrl.clone();
            meUrl.pathname = '/me';
            return NextResponse.redirect(meUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/me', '/login', '/register', '/auth/:path*'],

};
