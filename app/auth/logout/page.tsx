'use client'

import { useEffect } from "react";
import { logout } from "../actions/logout-action";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        async function callLogOutAction() {
            await logout();
        }
        callLogOutAction();
        setInterval(() => console.log('//HACK: waiting for server side logout to complete', 300)); 
        window.location.href = 'https://next-auth-okta-chi.vercel.app/'
    }, []);

    return <p>Logging out...</p>;
}