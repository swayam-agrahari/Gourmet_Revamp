import { authOptions } from '@/app/lib/auth';
import db from '@/app/lib/db'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';


export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: "You are not logged in." }, {
        status: 404
    })

    const sellerId = session?.user?.id;
    if (!sellerId) return NextResponse.json({ error: "NO seller id found" }, {
        status: 400
    })
    try {
        const shops = await db.shop.findMany({
            where: {
                Shopkeeper_id: sellerId
            },
            select: {
                products: {
                    select: {
                        pid: true,
                        name: true,
                        description: true,
                        category: true,
                        price: true,
                        image: true,
                        status: true,
                        rating: true,
                    }
                }
            }
        })
        if (!shops) {
            return NextResponse.json({ error: "NO products available" }, {
                status: 500
            })
        }
        const allProducts = shops.flatMap((shop => shop.products))
        const topProducts = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 10)
        return NextResponse.json({
            topProducts: topProducts
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, {
            status: 404
        })
    }
}


