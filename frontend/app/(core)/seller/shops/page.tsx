import Link from "next/link";
import db from "@/app/lib/db"
import React from "react";
import StarReview from "@/components/StarReview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { headers } from "next/headers"
import { NextResponse } from "next/server";

interface Shop {
    id: string;
    name: string;
    address?: string;
    rating?: number;
}
async function getShopDetails(sellerId: string) {
    try {
        const shopDetails = await db.shop.findMany({
            where: {
                Shopkeeper_id: sellerId
            }
        })
        if (!shopDetails || (shopDetails.length == 0)) {
            return []
        }
        return shopDetails || [];
    } catch (e) {
        console.error("Failed to fetch shop details:", e);
        return [];
    }
}


export default async function Shop() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>Please log in to view your shops.</div>;
    }

    const sellerId = session.user.id;
    let shopDetails: Shop[] = [];

    try {
        shopDetails = await getShopDetails(sellerId);
    } catch (error) {
        console.error("Error fetching shop details:", error);
        return <div>Error loading shop details. Please try again later.</div>;
    }

    if (shopDetails.length === 0) {
        return <div>No shops found. Please add a shop.</div>;
    }

    return (
        <>
            <div className="px-4 border border-red-500">Your Shops</div>
            {shopDetails.map((shop) => (
                <div key={shop.id} className="bg-white p-8">
                    <div className="flex w-full items-center">
                        <div className="w-40 mr-8">
                            <img
                                src={shop.image || "https://upload.wikimedia.org/wikipedia/sco/b/bf/KFC_logo.svg"} // Add fallback
                                alt="Shop Placeholder"
                                className="bg-green-200 w-40 h-40 aspect-auto rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3">
                            <div className="text-4xl font-extrabold">{shop.name || "Unnamed Shop"}</div>
                            <div>{shop.address || "Address not available"}</div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="text-2xl font-semibold">Ratings</div>
                        <div>{shop.rating || "Not rated"}</div>
                        <div><StarReview /></div>
                    </div>
                    <div>
                        <Link className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href="/seller/products">View Products</Link>
                        <Link className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href="/seller/shops/contact">Contact</Link>
                    </div>
                </div>
            ))}
        </>
    );
}
