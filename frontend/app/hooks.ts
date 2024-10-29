"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export const useRole = (allowedRoles: string) => {
    const { data: session, status } = useSession();
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    console.log("inside hook", session)

    useEffect(() => {
        if (status === 'loading') return;

        if (!session?.user || !allowedRoles.includes(session.user.role)) {
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }, [session, status, allowedRoles, router]);

    return { authorized, status };
}
