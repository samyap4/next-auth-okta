'use client'

import { useEffect } from "react";
import { logout } from "../actions/logout-action";
import { useRouter } from 'next/navigation'
import { signIn, signOut } from "next-auth/react"

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        async function callLogOutAction() {
            await logout();
        }
        callLogOutAction();
    }, []);

    return <p>Logging out...</p>;
}