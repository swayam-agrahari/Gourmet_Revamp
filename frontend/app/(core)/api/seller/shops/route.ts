import { authOptions } from "@/app/lib/auth";
import db from "@/app/lib/db"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    console.log("out here", session)

    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, {
            status: 401
        })

    }
    const sellerId = session?.user?.id;

    console.log("sid", session)
    if (!sellerId) return NextResponse.json({ error: "NO seller id found" }, {
        status: 400
    })
    try {
        const sellerShops = await db.shop.findMany({
            where: {
                Shopkeeper_id: sellerId
            }
        })
        if (!sellerShops || (sellerShops.length == 0)) {
            return NextResponse.json({ error: "NO seller shops" }, {
                status: 500
            })
        }
        return NextResponse.json({
            sellerShops: sellerShops
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ "error": error }, {
            status: 500
        })
    }
}


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, {
            status: 401
        })

    }
    const sellerId = session?.user?.id;

    console.log("sid", session)
    if (!sellerId) return NextResponse.json({ error: "NO seller id found" }, {
        status: 400
    })

    const body = await req.json();
    const { name, address, contact_info } = body;


    try {
        const sellerShops = await db.shop.create({
            data: {
                name: name,
                address: address,
                contact_info: contact_info,
                Shopkeeper_id: sellerId,
                rating: 0,
                isActive: true
            }
        })
        return NextResponse.json({
            sellerShops: sellerShops
        }, {
            status: 201
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ "error": error }, {
            status: 500
        })
    }
}

