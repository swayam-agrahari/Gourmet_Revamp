"use client"
import { Appbar } from "@/components/Appbar";
import SellerSidebar from "@/components/SellerSidebar";
import { ChartNoAxesCombined, Package, ShoppingBag, Store, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {

    const session = useSession();

    const Links = [
        {
            icon: <Store />,
            label: "Store",
            path: "/seller/shops"
        }, {
            icon: <Package />,
            label: "Products",
            path: "/seller/products"
        },
        {
            icon: <ShoppingBag />,
            label: "Orders",
            path: "/seller/orders"
        }, {
            icon: <ChartNoAxesCombined />,
            label: "StAnalyticsore",
            path: "/seller/Analytics"
        }, {
            icon: <User />,
            label: "Accounts",
            path: "/seller/Accounts"
        }
    ]


    return (<>
        <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
        <div className="w-screen h-screen flex ">
            <SellerSidebar links={Links} />

            <div className="w-4/5 h-fit bg-gray-50 rounded-lg   p-8">{children}</div>
        </div>

    </>
    )


}