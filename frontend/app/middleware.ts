import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    // Fetch JWT token from the request
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const url = req.nextUrl.pathname;

    // If no token exists, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Restrict /orders and /favorites for only logged-in users
    if (url.startsWith('/api/orders') || url.startsWith('/api/favorites')) {
        if (token.role !== 'User') {
            return NextResponse.json({ message: 'Access Denied: User Role Required' }, { status: 403 });
        }
    }

    // Example: Only sellers can access shop-related routes
    // if (url.startsWith('/api/seller')) {
    //     if (token.role !== 'Seller') {
    //         return NextResponse.json({ message: 'Access Denied: Seller Role Required' }, { status: 403 });
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/orders', '/api/favorites'],
};
