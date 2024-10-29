"use client"
import { Appbar } from "@/components/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {

    const session = useSession();

    return (<>
        <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}  ></Appbar>

        <main>{children}</main>

    </>
    )
}