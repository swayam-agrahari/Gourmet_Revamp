import db from '@/app/lib/db'
import { NextApiRequest, NextApiResponse } from 'next';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { sellerId } = req.query;
    if (!sellerId) return res.status(400).json({ error: "NO seller id found" })
    try {
        const sellerProducts = await db.shopKeeper.findMany({
            where: {
                shopkeeper_id: sellerId
            },
            include: {
                shops: {
                    include: {
                        products: true
                    }
                }
            }
        })
        if (!sellerProducts) {
            return res.status(500).json({ error: "NO seller data" })
        }

    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error })
    }
}


