import db from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const products = await db.product.findMany({
            where: {
            },
        })

        return NextResponse.json({
            "products": products
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "msg": "No pruducts found"
        }, {
            status: 404
        })
    }


}