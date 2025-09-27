import { NextRequest, NextResponse } from 'next/server'
const protectedRoutes = ['/statistics', '/books']
const publicRoutes = ['/auth']

export const config = {
    matcher: ["/books/:path*", "/statistics/:path*", "/auth"],
};

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const token = req.cookies.get("sb_access_token")?.value;

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (isPublicRoute && token) {
        console.log('Auth token ', token);
        return NextResponse.redirect(new URL("/books", req.url));
    }

    return NextResponse.next();
}
