"use client";

import { Appbar } from "@/components/Appbar";
import { Product } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <article className="flex flex-col items-center p-6 rounded-lg overflow-hidden bg-blue-100 relative">
            <div className="w-44 h-44 p-8 transition-transform duration-500">
                <Image src={product.image} alt={product.name} className="max-w-full h-auto mix-blend-multiply" width={176} height={176} />
            </div>
            <div className="absolute left-[-25%] top-0 w-14 h-full writing-mode-vertical-rl transform rotate-180 bg-gray-900 text-white font-bold text-center">
                {product.name}
            </div>
            <div className="flex justify-between items-end w-full mt-4">
                <a href="#" className="text-2xl text-gray-900 hover:text-red-500">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                </a>
                <div className="text-center">
                    <span className="text-sm text-red-500 line-through">{product.price}</span>
                    <span className="text-lg font-bold">{product.price}</span>
                </div>
                <a href="#" className="text-2xl text-gray-900 hover:text-red-500">
                    {/* <ion-icon name="cart-outline"></ion-icon> */}
                </a>
            </div>
        </article>
    );
};

export function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]); // Correctly initialized as an array
    const session = useSession();
    useEffect(() => {
        // fetch('/api/products')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data); // Log the response
        //         setProducts(data.products || []); // Fallback to empty array
        //     })
        //     .catch(error => {
        //         console.error("Error fetching products:", error);
        //         setProducts([]); // Set to empty array on error
        //     });

        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data); // Log the response
                setProducts(data || []); // Fallback to empty array
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]); // Set to empty array on error
            })
    }, []);

    return (
        <div>
            <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-5 py-8">
                {
                    products.map(product => (
                        <ProductCard key={product.pid} product={product} />
                    )

                    )}
            </div>
        </div>
    );
}
