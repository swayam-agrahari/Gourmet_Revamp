"use client"
import { Appbar } from "@/components/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export function Dashboard() {
    const session = useSession();
    return (
        <div>
            <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
        </div>
    )
}
