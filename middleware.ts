import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const {pathname} = req.nextUrl;

    if(pathname.includes('/api/auth') || token){
        return NextResponse.next();
    }

    if(!token && pathname !== '/auth/login'){
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/dash/:path*'],
};