'use client'

import { useEffect } from "react";
import { logout } from "../actions/logout-action";
import { useRouter } from 'next/navigation'
import { signIn, signOut } from "next-auth/react"

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // async function callLogOutAction() {
        //     const result = await logout();
        //     console.log(result);
        //     window.location.href = 'https://next-auth-okta-chi.vercel.app/'
        // }
        // callLogOutAction();
        signOut({redirect: false});
        router.push('/')
    }, []);

    return <p>Logging out...</p>;
}